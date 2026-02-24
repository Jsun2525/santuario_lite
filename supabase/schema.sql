-- Schema para Fase 3: Santuario de Bienestar App

-- 1. EXTENSIÓN DE USUARIOS (Perfiles)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  total_meditation_minutes INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  max_streak INTEGER DEFAULT 0,
  last_practice_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger para automatizar la inserción en perfiles cuando un usuario se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. CATÁLOGO DE AUDIOS (Multi-Track)
CREATE TYPE public.audio_category AS ENUM ('voice', 'music', 'sfx');

CREATE TABLE IF NOT EXISTS public.audio_assets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  category public.audio_category NOT NULL,
  file_url TEXT NOT NULL, -- URL apuntando a Supabase Storage (meditaciones)
  image_url TEXT,
  duration_seconds INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. RETO DE GRATITUD / MANTRAS (21 Días)
CREATE TABLE IF NOT EXISTS public.mantras (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- El texto del mantra o decreto
  type TEXT CHECK (type IN ('mantra', 'decreto')),
  audio_url TEXT, -- Opcional, si tiene audio asociado
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_mantra_challenges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  active_mantra_id UUID REFERENCES public.mantras(id) ON DELETE SET NULL,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  current_day INTEGER DEFAULT 1,
  last_logged_date TIMESTAMP WITH TIME ZONE,
  completed BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'failed', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. LOGS DE PRÁCTICAS DIARIAS
CREATE TABLE IF NOT EXISTS public.practice_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  practice_type TEXT NOT NULL, -- 'japa_mala', 'binaural', 'mantra', 'meditacion'
  duration_minutes INTEGER DEFAULT 0,
  asset_id UUID REFERENCES public.audio_assets(id) ON DELETE SET NULL, -- Si es una práctica guiada
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. AJUSTES DEL USUARIO (Atmósfera Favorita)
CREATE TABLE IF NOT EXISTS public.user_settings (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  favorite_atmosphere JSONB DEFAULT '{"voice_volume": 1.0, "music_volume": 0.5, "sfx_volume": 0.3, "active_sfx": null, "active_music": null}',
  theme TEXT DEFAULT 'dark',
  notifications_enabled BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. ENTRADAS DE DIARIO
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  mood TEXT,
  insight_received TEXT, -- Respuesta del Oráculo de n8n
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Políticas de Seguridad (RLS)
-- Habilitar RLS en todas las tablas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audio_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mantras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_mantra_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

-- Crear políticas básicas para que el usuario solo vea y edite sus propios datos
-- y pueda leer el catálogo público asumiendo que está logueado.
CREATE POLICY "Public profiles are viewable by users." ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Assets are viewable by everyone." ON public.audio_assets FOR SELECT USING (true);
CREATE POLICY "Mantras are viewable by everyone." ON public.mantras FOR SELECT USING (true);

CREATE POLICY "Users can manage their own challenges." ON public.user_mantra_challenges FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own logs." ON public.practice_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own settings." ON public.user_settings FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own journal." ON public.journal_entries FOR ALL USING (auth.uid() = user_id);

-- Opcional: Trigger para actualizar `last_practice_date` y `total_meditation_minutes` al insertar en `practice_logs`
CREATE OR REPLACE FUNCTION public.update_profile_stats_on_log()
RETURNS trigger AS $$
BEGIN
  UPDATE public.profiles
  SET 
    total_meditation_minutes = total_meditation_minutes + NEW.duration_minutes,
    last_practice_date = NEW.created_at
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_practice_logged
  AFTER INSERT ON public.practice_logs
  FOR EACH ROW EXECUTE PROCEDURE public.update_profile_stats_on_log();

-- Inserts de Ejemplo (Mantras/Decretos iniciales)
INSERT INTO public.mantras (title, content, type)
VALUES 
  ('Mantra de la Paz', 'Om Shanti Shanti Shanti', 'mantra'),
  ('Mantra de Creación', 'Om Namah Shivaya', 'mantra'),
  ('Mantra de Abundancia', 'Om Shrim Maha Lakshmiyei Swaha', 'mantra'),
  ('Decreto de Luz', 'Yo Soy la Luz que ilumina mi camino', 'decreto'),
  ('Decreto de Salud', 'Mi cuerpo se regenera en perfecta armonía', 'decreto'),
  ('Decreto de Prosperidad', 'Yo Soy el flujo de la abundancia infinita', 'decreto')
ON CONFLICT DO NOTHING;

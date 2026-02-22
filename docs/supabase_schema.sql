-- Create custom types for Japa Mala emotions
CREATE TYPE emotion_type AS ENUM ('Rabia', 'Tristeza', 'Estres_Ansiedad', 'Apatia');

-- Users extension (Since we use Supabase Auth, auth.users exists)
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  skool_id TEXT,
  current_streak INTEGER DEFAULT 0,
  max_streak INTEGER DEFAULT 0,
  last_gratitude_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Japa Mala Logs
CREATE TABLE public.japa_mala_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  emotion emotion_type,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gratitude Notes
CREATE TABLE public.gratitude_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  note_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.japa_mala_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gratitude_notes ENABLE ROW LEVEL SECURITY;

-- Create Policies (user can only see/insert their own data)
CREATE POLICY "Users can view own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own japa logs" ON public.japa_mala_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own japa logs" ON public.japa_mala_logs FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own gratitude notes" ON public.gratitude_notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own gratitude notes" ON public.gratitude_notes FOR SELECT USING (auth.uid() = user_id);

# Configuración de Supabase para Inner Path

Para conectar la aplicación con Supabase, sigue estos pasos:

1. Crea un proyecto en [Supabase](https://supabase.com).
2. Ve a **Settings > API** y copia la `Project URL` y la `anon public key`.
3. En la raíz de este proyecto (`/Users/juansebastianmoralesjurado/Desktop/Antigravity/Santuario de Bienestar App`), crea un archivo llamado `.env.local`.
4. Añade las siguientes variables al archivo:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_project_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

5. Ve a **SQL Editor** en tu panel de Supabase y pega el contenido completo del archivo `docs/supabase_schema.sql` para crear las tablas y las políticas de seguridad (RLS).
6. ¡Listo! El cliente en `src/lib/supabase/client.ts` se conectará automáticamente.

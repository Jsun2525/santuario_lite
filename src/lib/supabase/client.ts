import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key';

if (supabaseUrl === 'https://mock.supabase.co' || supabaseAnonKey === 'mock-key') {
    console.warn("Supabase URL or Anon Key is missing. Using mock values for build.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bjwcgmhzffsngvnebcwh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_H9xMIwh7D8L1K6TpjQBRNQ_9aASOTUW';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

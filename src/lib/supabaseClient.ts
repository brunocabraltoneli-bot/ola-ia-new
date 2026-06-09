import { createClient } from '@supabase/supabase-js';

// Hardcoded values provided by the user
const SUPABASE_URL = 'https://xztditfpppbmzjxfwlhv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_oUlkxHOFos_YhEAP6Otfwg_Ui6ljkzi';

console.log('[supabaseClient] Cliente Supabase inicializado com valores fixos', {
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
  anonKeyLength: SUPABASE_ANON_KEY.length,
  anonKeyPrefix: SUPABASE_ANON_KEY.slice(0, 16),
  anonKeySuffix: SUPABASE_ANON_KEY.slice(-8),
});

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
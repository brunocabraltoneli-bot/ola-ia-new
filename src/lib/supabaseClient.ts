import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://xztditfpppbmzjxfwlhv.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_oUlkxH0Fos_YhEAP60tfwg_U16ljkzi';

const configuredUrl = (import.meta.env.VITE_SUPABASE_URL ?? DEFAULT_SUPABASE_URL)
  .toString()
  .trim()
  .replace(/\s+/g, '')
  .replace(/\/rest\/v1\/?$/i, '');

const configuredAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? DEFAULT_SUPABASE_ANON_KEY)
  .toString()
  .trim();

console.log('[supabaseClient] Cliente Supabase inicializado', {
  url: configuredUrl,
  anonKeyConfigured: Boolean(configuredAnonKey),
  anonKeyLength: configuredAnonKey.length,
  anonKeyPrefix: configuredAnonKey.slice(0, 16),
  anonKeySuffix: configuredAnonKey.slice(-8),
});

export const supabase = createClient(configuredUrl, configuredAnonKey);
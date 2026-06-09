import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xztditfpppbmzjxfwlhv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_oUlkxH0Fos_YhEAP60tfwg_U16ljkzi';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xztditfpppbmzjxfwlhv.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6dGRpdGZwcHBibXpqeGZ3bGh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMDI4MDYsImV4cCI6MjA5MzY3ODgwNn0.jvZ7dUfPlNMaDED8McvpPnTICdzJo1JwHuel2-nQh4I";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
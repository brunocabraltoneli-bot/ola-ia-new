# Backend Guidelines

- **Database**: Supabase Postgres with strict Row Level Security (RLS) on all tables.  
- **Schema**: Create tables in `public` schema; use UUID primary keys (`gen_random_uuid()`).  
- **RLS Policies**:  
  - `SELECT` policies restrict data to the authenticated user (`auth.uid() = user_id`) unless public read is explicitly required.  
  - `INSERT/UPDATE/DELETE` policies use `WITH CHECK` to ensure rows belong to the user.  
- **Triggers**: Use Supabase triggers (e.g., `handle_new_user`) to auto‑populate profile tables on sign‑up.  
- **RPC/Views**: Expose only necessary RPCs; keep them thin and secure.  
- **Migrations**: Never edit existing migration files; create new migration scripts via Supabase CLI.  
- **Service Role**: Grant full CRUD to `service_role` for server‑side logic; never use it in client code.  
- **Anon Access**: Grant read‑only `SELECT` to `anon` only when public data is required.  
- **Security Checklist**: Verify RLS enabled, grants present, least‑privilege policies, and no exposed `service_role` keys.
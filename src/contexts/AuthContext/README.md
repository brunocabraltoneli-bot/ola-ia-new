# AuthContext

## Purpose
Manages authentication state for the application using Supabase's `auth` API. Provides the current user, loading status, and a `signOut` function.

## Structure
- **File**: `src/contexts/AuthContext/AuthContext.tsx` (client component).  
- **Exports**: `AuthProvider`, `useAuthContext`.  
- **State**:  
  - `user`: Current Supabase user object or `null`.  
  - `loading`: Boolean indicating auth state initialization.  
  - `signOut`: Async function that signs out and redirects to `/`.  

## Integration
- Wraps the app in `src/App.tsx` to make auth available throughout.  
- Listens to `supabase.auth.onAuthStateChange` to update state and trigger redirects.  
- Uses the Supabase client from `src/lib/supabaseClient.ts`.  

## Security
- Only the `anon` key is exposed; `service_role` key is never used in the client.  
- Sensitive operations (e.g., password reset) are handled by Supabase UI components.  

## Updates
After any change to authentication logic or UI, update this `README.md` to reflect the new architecture and decisions.
# Frontend Guidelines

- **Stack**: React + TypeScript + Vite + Supabase.  
- **UI Library**: shadcn/ui components only; create wrappers for custom styling.  
- **Styling**: Tailwind CSS with `cn()` utility for conditional classes.  
- **Pages**: Max 120 lines, pure composition, default export.  
- **Hooks**: Max 120 lines, JSDoc required, extract sub‑components when >150 lines.  
- **Components**: Max 150 lines; split into hooks, sub‑components, or types if larger.  
- **Imports**: Use absolute aliases (`@/`) for src‑relative paths.  
- **Notifications**: Use `sonner` for toast messages.  
- **Data Fetching**: TanStack Query; avoid `useEffect` for data fetching.  
- **Forms**: React Hook Form + Zod validation.  
- **Routing**: React Router; all routes declared in `src/App.tsx`.  
- **Contexts**: Defined under `src/contexts/<name>/` with `README.md`, `components/`, `hooks/`, `services/`, and `<name>.types.ts`.  
- **Security**: Only `anon` Supabase key in front‑end; `service_role` never exposed.  
- **Versioning**: Follow SemVer in `package.json`, git tags, and `CHANGELOG.md`.
# Azure Learning Auth — Phase 1 setup

## 1. Create a Supabase project
1. Go to https://supabase.com and create a project.
2. Open **Project Settings → API** and copy:
   - Project URL
   - `anon` `public` key
3. Copy `.env.example` to `.env` in the repo root and fill:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## 2. Create the database
1. Open Supabase → **SQL Editor**.
2. Paste and run [`supabase/schema.sql`](supabase/schema.sql).

## 3. Create the two admin logins
In **Authentication → Users → Add user** (email + password), create:
- `chetan421301@gmail.com`
- `rahul.kondhalkar77@gmail.com`

Confirm in **Table Editor → profiles** that both rows exist with:
- `role = admin`
- `is_active = true`

If a profile row is missing, insert it manually matching the Auth user `id`.

## 4. Deploy the admin Edge Function
Install Supabase CLI, then from the repo root:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase functions deploy admin-users
```

The function uses `SUPABASE_SERVICE_ROLE_KEY` automatically in Supabase hosted functions.
Keep the **service role key** secret — never put it in Vite/`VITE_*` env.

## 5. Auth URL settings
In Supabase → **Authentication → URL Configuration**, add:
- Site URL: your production origin (e.g. `https://vedx-ai.com`)
- Redirect URLs:
  - `https://vedx-ai.com/azure-learning/login`
  - `http://localhost:5173/azure-learning/login`

## 6. Vercel (Supabase integration)
In the **Install Integration** dialog:
1. Select project **`azure-class`** (or your Vercel project).
2. Environments: **Production** + **Preview** (Development optional).
3. **Clear Custom Prefix** — leave it empty (do **not** use `STORAGE`; that creates useless `STORAGE_URL` vars).
4. Leave **Sensitive** on.
5. Click **Connect**.

The integration usually injects `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` (or `SUPABASE_*`). This app’s Vite config maps those into the client build. You can also set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` manually. Redeploy after connecting.

## 7. Local run
```bash
npm run dev:learning
```
Open `/azure-learning/login`.

## Admin features
- `/azure-learning/admin/users` — add / edit / activate / deactivate / remove learners; reset password
- `/azure-learning/account` — change your own password
- Inactive learners are blocked from the portal

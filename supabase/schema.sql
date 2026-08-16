-- Azure Learning Phase 1 schema
-- Run this in Supabase Dashboard → SQL Editor

-- Profiles linked 1:1 with auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text not null default '',
  phone text not null default '',
  role text not null default 'learner' check (role in ('admin', 'learner')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid null references public.profiles (id) on delete set null
);

create index if not exists profiles_role_idx on public.profiles (role);
create index if not exists profiles_is_active_idx on public.profiles (is_active);

create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_profiles_updated_at();

-- Auto-create profile when a user signs up via Auth (optional safety net)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_emails text[] := array[
    'chetan421301@gmail.com',
    'rahul.kondhalkar77@gmail.com'
  ];
  next_role text;
begin
  next_role := case
    when lower(new.email) = any (admin_emails) then 'admin'
    else 'learner'
  end;

  insert into public.profiles (id, email, full_name, phone, role, is_active)
  values (
    new.id,
    lower(new.email),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    next_role,
    true
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Helpers for RLS
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
      and p.is_active = true
      and lower(p.email) in (
        'chetan421301@gmail.com',
        'rahul.kondhalkar77@gmail.com'
      )
  );
$$;

create or replace function public.is_active_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.is_active = true
  );
$$;

alter table public.profiles enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Admins can read all profiles" on public.profiles;
create policy "Admins can read all profiles"
on public.profiles for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can insert profiles" on public.profiles;
create policy "Admins can insert profiles"
on public.profiles for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update profiles" on public.profiles;
create policy "Admins can update profiles"
on public.profiles for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete learner profiles" on public.profiles;
create policy "Admins can delete learner profiles"
on public.profiles for delete
to authenticated
using (
  public.is_admin()
  and role = 'learner'
);

-- Bootstrap note:
-- 1) In Authentication → Users, create the two admin accounts (email/password).
-- 2) The trigger will insert profiles with role=admin for those emails.
-- 3) Confirm both rows exist with is_active=true and role=admin.

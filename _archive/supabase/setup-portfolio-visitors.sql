-- Portfolio unique visitor tracking (mirrors Regrade setup-visitors.sql)
-- Run once in Supabase SQL Editor if not applied via migration.

create table if not exists public.portfolio_visitors (
  visitor_id uuid primary key,
  first_seen_at timestamptz not null default timezone('utc', now()),
  landing_path text not null default '/'
);

alter table public.portfolio_visitors enable row level security;

revoke all on table public.portfolio_visitors from anon, authenticated;
grant select, insert on table public.portfolio_visitors to service_role;

create or replace function public.register_portfolio_visitor(p_visitor_id uuid, p_path text default '/'::text)
returns json
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  row_count integer;
  total_count bigint;
begin
  if p_visitor_id is null then
    raise exception 'visitor_id required';
  end if;

  insert into public.portfolio_visitors (visitor_id, landing_path)
  values (
    p_visitor_id,
    coalesce(nullif(trim(p_path), ''), '/')
  )
  on conflict (visitor_id) do nothing;

  get diagnostics row_count = row_count;

  select count(*)::bigint into total_count from public.portfolio_visitors;

  return json_build_object(
    'registered', row_count > 0,
    'total', total_count
  );
end;
$$;

create or replace function public.get_portfolio_visitor_stats()
returns json
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  return json_build_object(
    'total', (select count(*)::bigint from public.portfolio_visitors),
    'today', (
      select count(*)::bigint
      from public.portfolio_visitors
      where first_seen_at >= date_trunc('day', timezone('utc', now()))
    ),
    'week', (
      select count(*)::bigint
      from public.portfolio_visitors
      where first_seen_at >= date_trunc('day', timezone('utc', now())) - interval '7 days'
    ),
    'updated_at', timezone('utc', now())
  );
end;
$$;

revoke all on function public.register_portfolio_visitor(uuid, text) from public;
revoke all on function public.get_portfolio_visitor_stats() from public;

grant execute on function public.register_portfolio_visitor(uuid, text) to anon, authenticated, service_role;
grant execute on function public.get_portfolio_visitor_stats() to anon, authenticated, service_role;

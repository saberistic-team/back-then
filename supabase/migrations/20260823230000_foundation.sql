create schema if not exists foundation;

comment on schema foundation is
  'Non-product scaffolding used to verify migrations, seeds, and fictional demo fixtures.';

revoke all on schema foundation from public, anon, authenticated;

create table foundation.schema_metadata (
  key text primary key,
  value text not null,
  created_at timestamptz not null default now()
);

create table foundation.seed_runs (
  seed_name text primary key,
  fixture_version integer not null check (fixture_version > 0),
  loaded_at timestamptz not null default now()
);

create table foundation.demo_archives (
  id text primary key,
  fixture_version integer not null check (fixture_version > 0),
  payload jsonb not null,
  loaded_at timestamptz not null default now(),
  constraint demo_archives_payload_is_object check (jsonb_typeof(payload) = 'object')
);

alter table foundation.schema_metadata enable row level security;
alter table foundation.seed_runs enable row level security;
alter table foundation.demo_archives enable row level security;

revoke all on all tables in schema foundation from public, anon, authenticated;

insert into foundation.schema_metadata (key, value)
values ('foundation_schema_version', '1')
on conflict (key) do update set value = excluded.value;

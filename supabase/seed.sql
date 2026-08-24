insert into foundation.seed_runs (seed_name, fixture_version, loaded_at)
values ('foundation-base', 1, now())
on conflict (seed_name) do update
set fixture_version = excluded.fixture_version,
    loaded_at = excluded.loaded_at;

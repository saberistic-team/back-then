insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values
  (
    'recordings',
    'recordings',
    false,
    52428800,
    array['audio/webm', 'audio/mp4', 'audio/aac']::text[]
  ),
  (
    'photos',
    'photos',
    false,
    15728640,
    array['image/jpeg', 'image/png', 'image/webp']::text[]
  )
on conflict (id) do update
set
  name = excluded.name,
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;


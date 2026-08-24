export type StorageBucketRow = {
  allowed_mime_types: string[] | null;
  file_size_limit: string | null;
  id: string;
  name: string;
  public: boolean;
};

const expectedStorageBuckets: StorageBucketRow[] = [
  {
    allowed_mime_types: ["image/jpeg", "image/png", "image/webp"],
    file_size_limit: "15728640",
    id: "photos",
    name: "photos",
    public: false,
  },
  {
    allowed_mime_types: ["audio/webm", "audio/mp4", "audio/aac"],
    file_size_limit: "52428800",
    id: "recordings",
    name: "recordings",
    public: false,
  },
];

export function assertStorageBucketContract(rows: StorageBucketRow[]): void {
  const normalizedRows = rows.map(
    ({ allowed_mime_types, file_size_limit, id, name, public: isPublic }) => ({
      allowed_mime_types,
      file_size_limit,
      id,
      name,
      public: isPublic,
    }),
  );

  if (
    JSON.stringify(normalizedRows) !== JSON.stringify(expectedStorageBuckets)
  ) {
    throw new Error(
      `Storage bucket verification failed: ${JSON.stringify(rows)}`,
    );
  }
}

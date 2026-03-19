export interface StorageProvider {
  generateUploadUrl(params: {
    key: string;
    contentType: string;
  }): Promise<string>;

  deleteObject(key: string): Promise<void>;

  headObject(key: string): Promise<{
    ContentLength?: number;
    ContentType?: string;
    ETag?: string;
  } | null>;

  generateDownloadUrl(params: { key: string }): Promise<string>;
}

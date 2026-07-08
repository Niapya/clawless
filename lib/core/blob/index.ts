import type {
  DeleteCommandOptions,
  GetCommandOptions,
  ListCommandOptions,
  PutCommandOptions,
} from '@vercel/blob';

type VercelBlobModule = typeof import('@vercel/blob');

let blobModule: Promise<VercelBlobModule> | null = null;

async function loadBlob(): Promise<VercelBlobModule> {
  blobModule ??= import('@vercel/blob');
  return await blobModule;
}

export async function del(
  ...args: Parameters<VercelBlobModule['del']>
): ReturnType<VercelBlobModule['del']> {
  const blob = await loadBlob();
  return await blob.del(...args);
}

export async function get(
  urlOrPathname: string,
  options: GetCommandOptions,
): ReturnType<VercelBlobModule['get']> {
  const blob = await loadBlob();
  return await blob.get(urlOrPathname, options);
}

export async function getDownloadUrl(
  ...args: Parameters<VercelBlobModule['getDownloadUrl']>
): Promise<ReturnType<VercelBlobModule['getDownloadUrl']>> {
  const blob = await loadBlob();
  return blob.getDownloadUrl(...args);
}

export async function list<
  M extends 'expanded' | 'folded' | undefined = undefined,
>(options?: ListCommandOptions<M>) {
  const blob = await loadBlob();
  return await blob.list(options);
}

export async function put(
  ...args: Parameters<VercelBlobModule['put']>
): ReturnType<VercelBlobModule['put']> {
  const blob = await loadBlob();
  return await blob.put(...args);
}

export type {
  DeleteCommandOptions,
  GetCommandOptions,
  ListCommandOptions,
  PutCommandOptions,
};

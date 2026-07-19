import { strapiConfig } from '@/lib/strapi';
import { sanitizeStrapiRichText } from '@/lib/strapiMappers';

// Strapi HTTP client. Talks to whatever VITE_STRAPI_URL points at — local
// dev, staging, or production — so switching environments later is an env
// var change, not a code change.
//
// Public role permissions are enabled on the Strapi side for all read
// endpoints, so no auth header is sent by default. If a project later needs
// gated content, `strapiConfig.apiToken` is already read from
// VITE_STRAPI_API_TOKEN and can be added as a Bearer header below — but note
// this is a client-side SPA with no server-side rendering/proxy, so any
// token shipped this way is visible to anyone inspecting network requests
// or the built JS bundle. It's fine for a low-sensitivity read-only token,
// not for anything that must stay secret.

export interface FetchAPIParams {
  [key: string]: string | number | boolean | undefined;
}

export class StrapiFetchError extends Error {
  constructor(
    message: string,
    public status: number,
    public path: string,
  ) {
    super(message);
    this.name = 'StrapiFetchError';
  }
}

function buildUrl(path: string, params?: FetchAPIParams): string {
  const url = new URL(`${strapiConfig.baseUrl}${path}`);
  url.searchParams.set('populate', '*');
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export async function fetchAPI<T>(path: string, params?: FetchAPIParams): Promise<T> {
  const url = buildUrl(path, params);
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (strapiConfig.apiToken) {
    headers.Authorization = `Bearer ${strapiConfig.apiToken}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new StrapiFetchError(
      `Strapi request failed: ${response.status} ${response.statusText} (${path})`,
      response.status,
      path,
    );
  }

  const json = await response.json();
  return sanitizeStrapiRichText(json) as T;
}

// Strapi connection config — read but not used anywhere yet.
// Once the CMS project is ready, src/api/client.ts's fetchAPI() will use
// these to build requests.

export const strapiConfig = {
  baseUrl: import.meta.env.VITE_STRAPI_URL ?? '',
  apiToken: import.meta.env.VITE_STRAPI_API_TOKEN ?? '',
};

export function isStrapiConfigured(): boolean {
  return Boolean(strapiConfig.baseUrl);
}

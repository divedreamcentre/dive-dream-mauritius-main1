// Raw Strapi v5 response shapes. These describe what actually comes back
// over the wire — used only inside services/*.service.ts to parse
// responses before mapping into this app's domain types (Course, DiveSite,
// etc. in types/*.ts). Components and hooks never see these directly.
//
// Strapi v5 flattens entries (no `.attributes` wrapper, unlike v4) and
// exposes a stable `documentId` string alongside the numeric `id`.

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  url: string;
  formats?: {
    large?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    thumbnail?: StrapiMediaFormat;
  };
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: { pagination: StrapiPagination };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, never>;
}

// Base fields every Strapi entry has, regardless of content type.
export interface StrapiEntryBase {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

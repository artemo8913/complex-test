export enum SearchParamField {
  PAGE = "page",
  PAGE_SIZE = "page_size",
}

export type SearchParams = {
  [key in SearchParamField]: number;
};

export function createURLSearchParams(searchParams?: SearchParams): string {
  if (!searchParams) {
    return "";
  }
  return new URLSearchParams(Object.entries(searchParams).map(([key, value]) => [key, String(value)])).toString();
}

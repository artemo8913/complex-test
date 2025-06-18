export interface SearchParams {
  page: string;
  page_size: string;
}

export function createURLSearchParams(searchParams?: SearchParams): string {
  if (!searchParams) {
    return "";
  }
  return new URLSearchParams(Object.entries(searchParams)).toString();
}

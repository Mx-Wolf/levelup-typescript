const stringComparer = (left: string, right: string) => {
  if (left < right) {
    return -1;
  }
  if (right < left) {
    return 1;
  }
  return 0;
}

export const keyFromQueryString = (query: string): string => [
  ...(new URLSearchParams(query)).keys(),
]
  .sort(stringComparer)
  .join('&');

export const getPlainObject = (query: string): Record<string, string> => {
  const qs = new URLSearchParams(query);
  return [
    ...qs.keys(),
  ].reduce((a, b) => {
    a[b] = qs.get(b);
    return a;
  }, {} as Record<string, string>);
}
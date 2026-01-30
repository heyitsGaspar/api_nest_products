export function paginate<T>(
  items: T[],
  page: number = 1,
  limit: number = 10,
): T[] {
  const start = (page - 1) * limit;
  return items.slice(start, start + limit);
}

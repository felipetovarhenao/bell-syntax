export default function uniqueBy<T, K>(array: T[], keyFn: (item: T) => K = (item) => item as unknown as K): T[] {
  const seen = new Set<K>();
  const result: T[] = [];

  for (const item of array) {
    const key = keyFn(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
}

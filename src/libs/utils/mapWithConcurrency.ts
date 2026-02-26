export async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  if (items.length === 0) {
    return []
  }

  const maxConcurrency = Math.max(1, Math.floor(concurrency))
  const workerCount = Math.min(maxConcurrency, items.length)
  const results = new Array<R>(items.length)
  let currentIndex = 0

  const workers = Array.from({ length: workerCount }, async () => {
    while (currentIndex < items.length) {
      const targetIndex = currentIndex
      currentIndex += 1
      results[targetIndex] = await mapper(items[targetIndex], targetIndex)
    }
  })

  await Promise.all(workers)
  return results
}

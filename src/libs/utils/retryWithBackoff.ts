type RetryOptions = {
  retries?: number
  baseDelayMs?: number
  maxDelayMs?: number
}

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { retries = 3, baseDelayMs = 500, maxDelayMs = 4000 } = options

  let attempt = 0
  while (true) {
    try {
      return await fn()
    } catch (error) {
      if (attempt >= retries) {
        throw error
      }

      const delay = Math.min(baseDelayMs * 2 ** attempt, maxDelayMs)
      await sleep(delay)
      attempt += 1
    }
  }
}

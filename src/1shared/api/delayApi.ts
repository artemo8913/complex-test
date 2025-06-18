const DEFAULT_DELAY_MS = 1000;

export function delayApi<T>(promise: Promise<T>, delay_ms: number = DEFAULT_DELAY_MS): Promise<T> {
  return new Promise((resolve,) => {
    setTimeout(() => {
      resolve(promise);
    }, delay_ms);
  });
}

type Callback = (entry: IntersectionObserverEntry) => void;

const pools = new Map<
  string,
  { observer: IntersectionObserver; callbacks: Map<Element, Callback> }
>();

export function observe(
  element: Element,
  callback: Callback,
  options: { rootMargin?: string; threshold?: number } = {},
) {
  const rootMargin = options.rootMargin ?? "0px";
  const threshold = options.threshold ?? 0;
  const key = `${rootMargin}|${threshold}`;
  let pool = pools.get(key);
  if (!pool) {
    const callbacks = new Map<Element, Callback>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) callbacks.get(entry.target)?.(entry);
      },
      { rootMargin, threshold },
    );
    pool = { observer, callbacks };
    pools.set(key, pool);
  }
  pool.callbacks.set(element, callback);
  pool.observer.observe(element);
  const current = pool;
  return () => {
    current.callbacks.delete(element);
    current.observer.unobserve(element);
  };
}

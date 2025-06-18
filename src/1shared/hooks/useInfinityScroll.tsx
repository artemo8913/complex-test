import { useCallback, useEffect, useRef, useTransition } from "react";

export function useInfinityScroll(callback: () => void) {
  const observerElem = useRef(null);

  const [isLoading, startLoad] = useTransition();

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const [target] = entries;

      if (target.isIntersecting && !isLoading) {
        startLoad(callback);
      }
    },
    [isLoading, callback]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      return;
    }
    const element = observerElem.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [handleObserver]);

  return { observerElem, isLoading };
}

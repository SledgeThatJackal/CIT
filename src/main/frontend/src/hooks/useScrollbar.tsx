import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useEffect } from "react";

export default function useScrollbar<
  T extends HTMLElement,
  S extends HTMLElement,
>(scrollRef: React.RefObject<T>, viewRef: React.RefObject<S>) {
  const [initialize, instance] = useOverlayScrollbars({
    defer: true,
    options: {
      scrollbars: { theme: "os-theme-light" },
    },
  });

  useEffect(() => {
    if (scrollRef.current && viewRef.current)
      initialize({
        target: viewRef.current,
        elements: { viewport: scrollRef.current },
      });

    return () => instance()?.destroy();
  }, [initialize, instance, scrollRef, viewRef]);
}

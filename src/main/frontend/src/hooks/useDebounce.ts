import { useEffect, useMemo, useRef } from "react";
import debounce from "lodash.debounce";

export const useDebounce = (callback: any, delay: number = 500) => {
  const ref = useRef<Function>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const funct = () => {
      ref.current?.();
    };

    return debounce(funct, delay);
  }, []);

  return debouncedCallback;
};

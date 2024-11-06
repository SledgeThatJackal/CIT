import { useEffect, useMemo, useRef } from "react";
import debounce from 'lodash.debounce';

export const useDebounce = (callback: any) => {
    const ref = useRef<Function>();

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    const debouncedCallback = useMemo(() => {
        const funct = () => {
            ref.current?.();
        };

        return debounce(funct, 500);
    }, []);

    return debouncedCallback;
};
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef } from "react";

const useUpdateSearchParams = () => {
  const _searchParams = useSearchParams();
  const updateSearchParamsRef = useRef<(key: string, value: any) => void>(
    () => {}
  );

  const baseSearchParams = useMemo(() => {
    return new URLSearchParams(_searchParams);
  }, []);

  const updateSearchParams = (key: string, value: any) => {
    // if (value === "" || value === undefined) {
    //   baseSearchParams.delete(key);
    // } else {
    //   baseSearchParams.set(key, value);
    // }
    baseSearchParams.set(key, value);

    // router.replace(pathname + '?' + createQueryString('sort', 'asc'))
    // router.replace(`${pathname}?${baseSearchParams.toString()}`, {
    //   locale: _locale,
    // });

    window.history.replaceState(
      null,
      "",
      `${location.pathname}?${baseSearchParams.toString()}`
    );
  };

  updateSearchParamsRef.current = updateSearchParams;

  return useCallback((key: string, value: any) => {
    updateSearchParamsRef.current(key, value);
  }, []);
};

export default useUpdateSearchParams;

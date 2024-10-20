import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef } from "react";

const useUpdateSearchParams = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const _searchParams = useSearchParams();
  const updateSearchParamsRef = useRef<(key: string, value: any) => void>(
    () => {}
  );

  const baseSearchParams = useMemo(() => {
    return new URLSearchParams(_searchParams);
  }, [])

  const updateSearchParams = (key: string, value: any) => {
   
    baseSearchParams.set(key, value);
    if (key === "code") {
      console.log("new Code:", value);
    }
    console.log(baseSearchParams.get("code"));

    replace(`${pathname}?${baseSearchParams.toString()}`);
  };

  updateSearchParamsRef.current = updateSearchParams;

  return useCallback((key: string, value: any) => {
    updateSearchParamsRef.current(key, value);
  }, []);
};

export default useUpdateSearchParams;

// appendPrettierPlugin

import {
  appendPrettier,
  appendPrettierPlugin,
} from "@/app/[locale]/code-line/format";
import { lngList } from "@/app/[locale]/config";
import { useEffect, useMemo } from "react";

export default function usePrettier(lang: string) {
  const plugins = useMemo(
    () => lngList.find((lng) => lng.value === lang)?.prettier?.plugins || [],
    [lang]
  );
  useEffect(() => {
    appendPrettier();
  }, []);

  useEffect(() => {
    if (plugins.length) {
      ["estree", ...plugins].forEach((plu) => {
        appendPrettierPlugin(plu);
      });
    }
  }, [lang, plugins, plugins.length]);
}

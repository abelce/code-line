import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { HeaderProps } from "./interface";
import { lngList } from "../../config";

const FormatCode = (props: HeaderProps) => {
  const t = useTranslations("code-line.header");
  const lngPrettier = useMemo(() => {
    return lngList.find((lng) => lng.value === props.lang)?.prettier;
  }, [props.lang]);

  const onClick = async () => {
    try {
      // @ts-ignore
      const formatted = await prettier.format(props.code, {
        parser: lngPrettier?.parser,
        // @ts-ignore
        plugins: prettierPlugins,
      });
      props.updateCode(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  if (!lngPrettier) {
    return null;
  }

  return (
    <Button variant={"outline"} onClick={onClick}>
      {t("format")}
    </Button>
  );
};

export default FormatCode;

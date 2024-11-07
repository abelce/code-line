import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const exampleCode = `function main() {
    console.log("Hello world);
}`;

export const frameMinWidth = 480;

const useGetInitState = () => {
  const searchParams = useSearchParams();
  const ddefaultStates = useMemo(() => {
    const obj = {
      code:
        Buffer.from(searchParams.get("code") || "", "base64").toString(
          "utf-8"
        ) || exampleCode,
      lang: searchParams.get("lang") || "javascript",
      theme: searchParams.get("theme") || "dark-plus",
      padding:
        (searchParams.has("padding") && Number(searchParams.get("padding"))) ||
        24,
      title: searchParams.get("title") || "",
      width: Math.max(Number(searchParams.get("width")) || 0, frameMinWidth),
      backdropType: searchParams.get("backdropType") || "",
      backdrop: searchParams.get("backdrop") || "",
      copyBtn: searchParams.get("copyBtn") === "true",
      lineNum: searchParams.get("lineNum") === "true",
    };

    if (!obj.backdropType) {
      obj.backdropType = "image";
      obj.backdrop =
        "https://images.unsplash.com/photo-1730908706088-df9aabe913ba?ixid=M3w2Njg2NTJ8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczMDk2NjY4N3w&ixlib=rb-4.0.3&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";
    }

    return obj;
  }, [searchParams]);

  return ddefaultStates;
};

export default useGetInitState;

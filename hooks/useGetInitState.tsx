import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const exampleCode = `import { createHighlighter } from 'shiki'

async function main() {
  const highlighter = await createHighlighter({
    themes: ['vitesse-dark'],
    langs: ['javascript'],
  })

  const code = highlighter.codeToHtml('const a = 1', {
    theme: 'vitesse-dark',
    lang: 'javascript',
  })
}
`;

export const frameMinWidth = 480;

const useGetInitState = () => {
  const searchParams = useSearchParams();
  const ddefaultStates = useMemo(() => {
    return {
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
      width: Number(searchParams.get("width")) || frameMinWidth,
      backdrop: searchParams.get("backdrop") || "linear-gradient(to right, rgb(239, 68, 68), rgb(249, 115, 22))",
      copyBtn: searchParams.get("copyBtn") === "true"
    };
  }, []);

  return ddefaultStates;
};

export default useGetInitState;

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const exampleCode = `
// ESM
import { createHighlighter } from 'shiki'

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

const useGetInitState = () => {
  const searchParams = useSearchParams();
  const ddefaultStates = useMemo(() => {
    
    return {
      code: Buffer.from(searchParams.get("code") || "", "base64").toString("utf-8") || exampleCode,
      lang: searchParams.get("lang") || "javascript",
      theme: searchParams.get("theme") || "dark-plus",
      padding:
        (searchParams.has("padding") && Number(searchParams.get("padding"))) ||
        24,
    };
  }, []);

  return ddefaultStates;
};

export default useGetInitState;

"use client";
import { useState } from "react";
import Editor from "./Editor/inde";
import Setting from "./Setting";
import Frame from "./Frame";

const testCode = `
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

const CodeLine = () => {
  const [code, setCode] = useState(testCode);
  const [lang, setLang] = useState("javascript");
  const [theme, setTheme] = useState("dark-plus");
  const [padding, setPadding] = useState(24);
  return (
    <div className="h-screen w-screen relative p-8">
      <div className="ml-[324px]">
        <Frame
          padding={padding}
          background="linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))"
        >
          <Editor
            code={code}
            onChange={(newCode) => {
              setCode(newCode);
            }}
            lang={lang}
            theme={theme}
          ></Editor>
        </Frame>
      </div>
      <Setting
        lang={lang}
        updateLng={setLang}
        padding={padding}
        updatePadding={setPadding}
        theme={theme}
        updateTheme={setTheme}
      />
    </div>
  );
};

export default CodeLine;

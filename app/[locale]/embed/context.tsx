"use client";
import { Mode } from "../code-line/Editor/inde";
import Frame from "../code-line/Frame";
import useGetInitState from "@/hooks/useGetInitState";

const Content = () => {
  const { code, padding, lang, theme, title, backdrop, copyBtn } =
    useGetInitState();

  return (
    <div className="w-screen h-screen">
      <Frame
        padding={padding}
        code={code}
        lang={lang}
        theme={theme}
        title={title}
        backdrop={backdrop}
        copyBtn={copyBtn}
        mode={Mode.View}
      ></Frame>
    </div>
  );
};

export default Content;

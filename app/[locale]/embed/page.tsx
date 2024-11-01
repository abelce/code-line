"use client";
import { Mode } from "../code-line/Editor/inde";
import Frame from "../code-line/Frame";
import useGetInitState from "@/hooks/useGetInitState";
import { BgType } from "../code-line/Setting/Backdrop";
import { useEffect } from "react";

const Content = () => {
  const { code, padding, lang, theme, title, backdropType, backdrop, copyBtn, lineNum } =
    useGetInitState();

    useEffect(() => {
      const body = document.querySelector("body");
      if (body) {
        body.style.background = "transparent";
      }
    }, [])

  return (
    <div className="w-screen h-screen">
      <Frame
        padding={padding}
        code={code}
        lang={lang}
        theme={theme}
        title={title}
        backdropType={backdropType as BgType}
        backdrop={backdrop}
        copyBtn={copyBtn}
        lineNum={lineNum}
        mode={Mode.View}
      ></Frame>
    </div>
  );
};

export default Content;

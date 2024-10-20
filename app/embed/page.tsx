"use client";
import { Mode } from "../code-line/Editor/inde";
import Frame from "../code-line/Frame";
import useGetInitState from "@/hooks/useGetInitState";

const Embed = () => {
  const { code, padding, lang, theme, title, backdrop } = useGetInitState();

  return (
    <div className="w-screen h-screen">
      <Frame
        padding={padding}
        code={code}
        lang={lang}
        theme={theme}
        title={title}
        backdrop={backdrop}
        mode={Mode.View}
      ></Frame>
    </div>
  );
};

export default Embed;

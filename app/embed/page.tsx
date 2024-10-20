"use client";
import Frame from "../code-line/Frame";
import useGetInitState from "@/hooks/useGetInitState";

const Embed = () => {
  const { code, padding, lang, theme } = useGetInitState();

  return (
    <div className="w-screen h-screen">
      <Frame
        padding={padding}
        code={code}
        lang={lang}
        theme={theme}
        background="linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))"
      ></Frame>
    </div>
  );
};

export default Embed;

"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Setting from "./Setting";
import Frame from "./Frame";
import useGetInitState from "@/hooks/useGetInitState";
import { CodeLineEvent, event_calc_frame_height } from "./event";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";

const CodeLine = () => {
  const defaultStates = useGetInitState();
  const [code, setCode] = useState(defaultStates.code);
  const [lang, setLang] = useState(defaultStates.lang);
  const [theme, setTheme] = useState(defaultStates.theme);
  const [padding, setPadding] = useState(defaultStates.padding);
  const _frameRef = useRef<HTMLDivElement>(null);

  const updateSearchParams = useUpdateSearchParams();

  const updateCode = useCallback(
    (code: string) => {
      setCode(code);
      const buf = Buffer.from(code, "utf-8");
      updateSearchParams("code", buf.toString("base64"));
    },
    [updateSearchParams]
  );

  const updateLng = useCallback(
    (lang: string) => {
      setLang(lang);
      updateSearchParams("lang", lang);
    },
    [updateSearchParams]
  );

  const updatePadding = useCallback(
    (padding: number) => {
      setPadding(padding);
      updateSearchParams("padding", padding);
    },
    [updateSearchParams]
  );

  const updateTheme = useCallback(
    (theme: string) => {
      setTheme(theme);
      updateSearchParams("theme", theme);
    },
    [updateSearchParams]
  );

  useEffect(() => {
    const calc = () => {
      // 每次更新都需要计算内容的高度
      const height = _frameRef.current?.getBoundingClientRect().height;
      updateSearchParams("height", height);
    };
    CodeLineEvent.on(event_calc_frame_height, calc);
    return () => {
      CodeLineEvent.off(event_calc_frame_height, calc);
    };
  }, [updateSearchParams]);

  return (
    <div className="h-screen w-screen relative p-8">
      <div className="ml-[324px]">
        <div ref={_frameRef}>
          <Frame
            padding={padding}
            code={code}
            onChange={updateCode}
            lang={lang}
            theme={theme}
            background="linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))"
          ></Frame>
        </div>
      </div>
      <Setting
        lang={lang}
        updateLng={updateLng}
        padding={padding}
        updatePadding={updatePadding}
        theme={theme}
        updateTheme={updateTheme}
      />
    </div>
  );
};

export default CodeLine;

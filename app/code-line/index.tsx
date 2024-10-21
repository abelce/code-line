"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Setting from "./Setting";
import Frame from "./Frame";
import useGetInitState, { frameMinWidth } from "@/hooks/useGetInitState";
import { CodeLineEvent, event_calc_frame_height } from "./event";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import Resizeable from "./Resizeable";
import { Mode } from "./Editor/inde";
import Header from "./Header";

const format_code = (code: string) => {
  const buf = Buffer.from(code, "utf-8");
  return buf.toString("base64");
};

const CodeLine = () => {
  const defaultStates = useGetInitState();
  const [code, setCode] = useState(defaultStates.code);
  const [lang, setLang] = useState(defaultStates.lang);
  const [theme, setTheme] = useState(defaultStates.theme);
  const [padding, setPadding] = useState(defaultStates.padding);
  const [title, setTitle] = useState(defaultStates.title);
  const [width, setWidth] = useState(defaultStates.width);
  const [backdrop, setBackdrop] = useState(defaultStates.backdrop);
  const _frameContainerRef = useRef<HTMLDivElement>(null);
  const _frameRef = useRef<HTMLDivElement>(null);

  const updateSearchParams = useUpdateSearchParams();

  const updateCode = useCallback(
    (code: string) => {
      setCode(code);
      updateSearchParams("code", format_code(code));
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
  const updateTitle = useCallback(
    (title: string) => {
      setTitle(title);
      updateSearchParams("title", title);
    },
    [updateSearchParams]
  );
  const updateWidth = useCallback(
    (width: number) => {
      const containerWidth =
        _frameContainerRef.current?.getBoundingClientRect().width;
      if (containerWidth) {
        const _width = Math.max(Math.min(containerWidth, width), frameMinWidth);
        setWidth(_width);
        updateSearchParams("width", _width);
      }
    },
    [updateSearchParams]
  );
  const updateBackdrop = useCallback(
    (backdrop: string) => {
      setBackdrop(backdrop);
      updateSearchParams("backdrop", backdrop);
    },
    [updateSearchParams]
  );

  useEffect(() => {
    updateSearchParams("code", format_code(code));
  }, []);

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
    <>
      <Header></Header>
      <div className="relative h-full">
        <div className="relative ml-[324px] h-full">
          <div className="h-full overflow-y-auto">
            <div className="m-8" ref={_frameContainerRef}>
              <div className="flex justify-center">
                <Resizeable width={width} onWidthChange={updateWidth}>
                  <div ref={_frameRef}>
                    <Frame
                      padding={padding}
                      code={code}
                      onChange={updateCode}
                      lang={lang}
                      theme={theme}
                      title={title}
                      updateTitle={updateTitle}
                      backdrop={backdrop}
                      mode={Mode.Edit}
                      copyBtn={false}
                    ></Frame>
                  </div>
                </Resizeable>
              </div>
            </div>
          </div>
        </div>
        <Setting
          lang={lang}
          updateLng={updateLng}
          padding={padding}
          updatePadding={updatePadding}
          theme={theme}
          updateTheme={updateTheme}
          backdrop={backdrop}
          updateBackdrop={updateBackdrop}
        />
      </div>
    </>
  );
};

export default CodeLine;

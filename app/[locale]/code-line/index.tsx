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
import { BgType } from "./Setting/Backdrop";

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
  const [backdropType, setBackdropType] = useState(defaultStates.backdropType);
  const [lineNum, setLineNum] = useState(defaultStates.lineNum);
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
      console.log("theme:", theme)
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
        const _width = Math.max(
          Math.min(containerWidth - 64, width),
          frameMinWidth
        );
        setWidth(_width);
        updateSearchParams("width", _width);
      }
    },
    [updateSearchParams]
  );

  const updateBackdrop = useCallback(
    (type: BgType, backdrop: string) => {
      setBackdrop(backdrop);
      setBackdropType(type);
      updateSearchParams("backdropType", type);
      updateSearchParams("backdrop", backdrop);
    },
    [updateSearchParams]
  );

  const updateLineNum = useCallback(
    (lineNum: boolean) => {
      setLineNum(lineNum);
      updateSearchParams("lineNum", lineNum);
    },
    [updateSearchParams]
  );

  useEffect(() => {
    updateSearchParams("code", format_code(code));
    updateSearchParams("backdropType", backdropType);
    updateSearchParams("backdrop", backdrop);
    updateSearchParams("padding", String(padding));
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

  useEffect(() => {
    const handleResize = () => {
      const containerWidth =
        _frameContainerRef.current?.getBoundingClientRect().width || 0;
      if (width > containerWidth) {
        const _newWidth = Math.max(frameMinWidth, containerWidth);
        setWidth(_newWidth);
        updateSearchParams("width", _newWidth);
      }
    };
    addEventListener("resize", handleResize);
    return () => {
      removeEventListener("resize", handleResize);
    };
  }, [updateSearchParams, width]);

  return (
    <div className="h-full flex flex-col">
      <Header></Header>
      <div className="flex-1 relative overflow-hidden flex flex-row">
      <Setting
          lang={lang}
          updateLng={updateLng}
          padding={padding}
          updatePadding={updatePadding}
          theme={theme}
          updateTheme={updateTheme}
          backdropType={backdropType as BgType}
          backdrop={backdrop}
          updateBackdrop={updateBackdrop}
          lineNum={lineNum}
          updateLineNum={updateLineNum}
        />
        <div className="flex-1 relative h-full border border-t-0 border-r-0 border-b-0">
          <div className="h-full overflow-y-auto">
            <div className="p-8" ref={_frameContainerRef}>
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
                      backdropType={backdropType as BgType}
                      backdrop={backdrop}
                      mode={Mode.Edit}
                      copyBtn={false}
                      lineNum={lineNum}
                    ></Frame>
                  </div>
                </Resizeable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeLine;

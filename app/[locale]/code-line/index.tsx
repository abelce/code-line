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
import usePrettier from "@/hooks/usePrettier";
import { useCounterStore } from "../stores/codeStore";

const CodeLine = () => {
  const {
    update: updateStore,
    fontSize,
    width,
    lang,
    code,
    backdrop,
    backdropType,
    padding,
    lineNum,
    theme,
    title,
  } = useCounterStore();

  const defaultStates = useGetInitState();
  const _frameContainerRef = useRef<HTMLDivElement>(null);
  const _frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateStore(defaultStates as any);
  }, []);

  const updateSearchParams = useUpdateSearchParams();

  const updateCode = useCallback(
    (code: string) => {
      updateStore({ code });
    },
    [updateStore]
  );

  const updateLng = useCallback(
    (lang: string) => {
      updateStore({ lang });
    },
    [updateStore]
  );

  const updatePadding = useCallback(
    (padding: number) => {
      updateStore({ padding });
    },
    [updateStore]
  );

  const updateTheme = useCallback(
    (theme: string) => {
      updateStore({ theme });
    },
    [updateStore]
  );
  const updateTitle = useCallback(
    (title: string) => {
      updateStore({ title });
    },
    [updateStore]
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
        updateStore({ width: _width });
      }
    },
    [updateStore]
  );

  const updateBackdrop = useCallback(
    (backdropType: BgType, backdrop: string) => {
      updateStore({ backdrop, backdropType });
    },
    [updateStore]
  );

  const updateLineNum = useCallback(
    (lineNum: boolean) => {
      updateStore({ lineNum });
    },
    [updateStore]
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

  useEffect(() => {
    const handleResize = () => {
      const containerWidth =
        _frameContainerRef.current?.getBoundingClientRect().width || 0;
      if (width > containerWidth) {
        const _newWidth = Math.max(frameMinWidth, containerWidth);
        updateStore({ width: _newWidth });
      }
    };
    addEventListener("resize", handleResize);
    return () => {
      removeEventListener("resize", handleResize);
    };
  }, [updateSearchParams, updateStore, width]);

  usePrettier(lang);

  return (
    <div className="h-full flex flex-col">
      <Header lang={lang} code={code} updateCode={updateCode}></Header>
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

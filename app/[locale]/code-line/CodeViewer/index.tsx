import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";
import styles from "./style.module.scss";
import { CodeLineEvent, event_calc_frame_height } from "../event";
import _throttle, { throttle } from "lodash";
import { getCodeLine, lineNumberTransformer } from "./lineNumberTransformer";

export interface CodeViewerProps {
  code: string;
  className?: string;
  lang: string;
  theme: string;
  lineNum: boolean;
}
export const commonStyle = cn("text-base tracking-[0.1px]", styles.formatted);

const CodeViewer = ({
  code = "",
  theme = "vitesse-dark",
  lang = "javascript",
  lineNum = false,
  className,
}: CodeViewerProps) => {
  const [html, setHtml] = useState("");
  const caleRef = useRef(() => {});

  useMemo(() => {
    caleRef.current = throttle(() => {
      CodeLineEvent.emit(event_calc_frame_height);
    }, 100);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const transformers = [];
        if (lineNum) {
          transformers.push(lineNumberTransformer);
        }
        const html = await codeToHtml(code, {
          lang: lang,
          theme,
          transformers,
        });
        console.log("code:", code.length, " html:", html.length);
        setHtml(html);
        //  设置样式
        if (!lineNum) {
          document.documentElement.style.setProperty(
            "--line-number-width",
            `0px`
          );
        } else {
          const codeLine = getCodeLine();
          const charNums = `${codeLine}`.split("").length;
          document.documentElement.style.setProperty(
            "--line-number-width",
            `calc(${charNums}ch + 20px)`
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [code, lang, lineNum, theme]);

  useLayoutEffect(() => {
    // caleRef.current();
  }, [html]);

  return (
    <div
      id="code-viewer"
      tabIndex={0}
      dangerouslySetInnerHTML={{ __html: html }}
      className={cn("p-4", commonStyle, className)}
    ></div>
  );
};

export default CodeViewer;

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";
import styles from "./style.module.scss";
import { CodeLineEvent, event_calc_frame_height } from "../event";
import _throttle from "lodash";

export interface CodeViewerProps {
  code: string;
  className?: string;
  lang: string;
  theme: string;
}
export const commonStyle = cn(
  "p-4 text-base tracking-[0.1px]",
  styles.formatted
);

const CodeViewer = ({
  code = "",
  theme = "vitesse-dark",
  lang = "javascript",
  className,
}: CodeViewerProps) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const load = async () => {
      const html = await codeToHtml(code, {
        lang: lang,
        theme,
      });
      setHtml(html);
    };

    load();
  }, [code, lang, theme]);

  useEffect(() => {
    setTimeout(() => {
      CodeLineEvent.emit(event_calc_frame_height)
    });
  }, [html]);

  // useEffect(() => {
  //   const resize = _throttle(() => {
  //     // CodeLineEvent.emit(event_calc_frame_height);
  //   }, 500);

  //   addEventListener("resize", resize);

  //   return () => {
  //     removeEventListener("resize", resize);
  //   };
  // }, []);

  return (
    <div
      tabIndex={0}
      dangerouslySetInnerHTML={{ __html: html }}
      className={cn(commonStyle, className)}
    ></div>
  );
};

export default CodeViewer;

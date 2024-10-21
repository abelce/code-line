import { CSSProperties, useMemo } from "react";
import styles from "./style.module.scss";
import { cn } from "@/lib/utils";
import Editor, { EditorProps, Mode } from "../Editor/inde";
import { getTheme } from "@/app/config";
import CopyCode from "./CopyCode";

interface Props extends EditorProps {
  padding: number;
  title: string;
  updateTitle?: (title: string) => void;
  backdrop: string;
  copyBtn: boolean;
  mode: Mode;
}

const Frame = (props: Props) => {
  const {
    padding,
    code,
    lang,
    theme,
    title,
    updateTitle,
    backdrop,
    copyBtn,
    mode = Mode.View,
  } = props;

  const containerStyles = useMemo((): CSSProperties => {
    return {
      padding: `${padding}px`,
      background: backdrop,
    };
  }, [padding, backdrop]);

  const contentStyles = useMemo((): CSSProperties => {
    return {
      background: getTheme(theme)?.background,
    };
  }, [theme]);



  return (
    <div id="frame" className="relative">
      <div
        className={cn("rounded transition-all duration-200")}
        style={containerStyles}
      >
        <div className="rounded pt-1 relative group" style={contentStyles}>
          <div className={cn("px-4", styles.header)}>
            <div className="flex gap-1 items-center">
              <div className="h-3 w-3 rounded-full bg-gray-400"></div>
              <div className="h-3 w-3 rounded-full bg-gray-400"></div>
              <div className="h-3 w-3 rounded-full bg-gray-400"></div>
            </div>
            <div>
              <input
                className="w-full bg-transparent text-center text-sm outline-0"
                value={title}
                placeholder="Untitiled"
                onChange={(e) => updateTitle?.(e.target.value || "")}
                disabled={mode === Mode.View}
              />
            </div>
            <div className="hidden group-hover:block">
              {copyBtn ? <CopyCode code={code}></CopyCode> : null}
            </div>
          </div>
            <Editor
              code={code}
              lang={lang}
              theme={theme}
              onChange={props.onChange}
              mode={props.mode}
            ></Editor>
        </div>
      </div>
    </div>
  );
};

export default Frame;

import {
  CSSProperties,
  useMemo,
} from "react";
import styles from "./style.module.scss";
import { cn } from "@/lib/utils";
import Editor, { EditorProps, Mode } from "../Editor/inde";
import CopyCode from "./CopyCode";
import { getTheme } from "../../config";

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

  const inputStyles = useMemo((): CSSProperties => {
    const caretColor = getTheme(theme)?.caretColor;
    return {
      caretColor: caretColor,
      // caretColor 有值表示主题为日间色，修改input的color为黑色
      color: caretColor ? "rgb(2, 6, 23)" : "inherit",
      // 查看模式下如果没有值就不显示
      display: mode === Mode.View && !title ? "none" : "",
    };
  }, [theme, mode, title]);

  return (
    <div id="frame" className="relative h-full flex">
      <div
        className={cn("flex-1 flex rounded transition-all duration-200")}
        style={containerStyles}
      >
        <div className="flex-1 flex flex-col rounded pt-1 relative group" style={contentStyles}>
          <div className={cn("px-4", styles.header)}>
            <div className="flex gap-1 items-center">
              <div className="h-3 w-3 rounded-full bg-gray-400"></div>
              <div className="h-3 w-3 rounded-full bg-gray-400"></div>
              <div className="h-3 w-3 rounded-full bg-gray-400"></div>
            </div>
            <div className="text-center">
              <input
                id="editorTitle"
                className="w-full bg-transparent text-center text-sm outline-0"
                style={inputStyles}
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

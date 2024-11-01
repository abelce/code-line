import {
  ChangeEvent,
  CSSProperties,
  KeyboardEvent,
  useCallback,
  useMemo,
  useRef,
} from "react";
import CodeViewer, { CodeViewerProps, commonStyle } from "../CodeViewer";
import { cn } from "@/lib/utils";
import styles from "./style.module.scss";
import { getTheme } from "../../config";

export enum Mode {
  Edit = "edit",
  View = "view",
}
export interface EditorProps extends CodeViewerProps {
  onChange?: (code: string) => void;
  mode: Mode;
}

const Editor = (props: EditorProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      props.onChange?.(e.target.value);
    },
    [props]
  );

  const onFocus = useCallback(() => {
    ref.current?.select();
  }, []);

  const caretColor = useMemo((): CSSProperties => {
    const caretColor = getTheme(props.theme)?.caretColor;
    if (caretColor) {
      return {
        caretColor: caretColor,
      };
    }
    return {};
  }, [props.theme]);

  const handleInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (ref.current && e.code === "Tab") {
        e.preventDefault();
        var start = ref.current.selectionStart;
        var end = ref.current.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        ref.current.value =
          ref.current.value.substring(0, start) +
          "\t" +
          ref.current.value.substring(end);

        // put caret at right position again
        ref.current.selectionStart = ref.current.selectionEnd = start + 1;
        props.onChange?.(ref.current.value);
        return false;
      }
    },
    [props]
  );

  return (
    <div
      className={cn("h-full w-full relative overflow-x-hidden overflow-y-auto", styles.editor)}
      id="code-editor"
    >
      <CodeViewer
        code={props.code}
        lang={props.lang}
        theme={props.theme}
        lineNum={props.lineNum}
        className="flex-1"
      />
      {props.mode === Mode.Edit ? (
        <textarea
          id="editorInput"
          tabIndex={-1}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          autoCapitalize="off"
          style={caretColor}
          className={cn(
            "bg-transparent resize-none  whitespace-pre-wrap absolute inset-0",
            commonStyle,
            styles.textarea
          )}
          ref={ref}
          value={props.code}
          onChange={handleChange}
          onFocus={onFocus}
          //@ts-ignore
          onKeyDown={handleInputKeyDown}
        />
      ) : null}
    </div>
  );
};

export default Editor;

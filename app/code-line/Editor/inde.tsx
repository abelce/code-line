import { ChangeEvent, useCallback, useRef } from "react";
import CodeViewer, { CodeViewerProps, commonStyle } from "../CodeViewer";
import { cn } from "@/lib/utils";
import styles from "./style.module.scss";

export enum Mode {
  Edit = "edit",
  View = "view",
}
export interface EditorProps extends CodeViewerProps {
  onChange?: (code: string) => void;
  mode: Mode
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

  return (
    <div className={cn("w-full grid grid-rows-1 grid-cols-1")}>
      <CodeViewer
        code={props.code}
        lang={props.lang}
        theme={props.theme}
        className="row-start-1 row-end-2 col-start-1 col-end-2"
      />
      {props.mode === Mode.Edit ? (
        <textarea
          tabIndex={-1}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          autoCapitalize="off"
          className={cn(
            "bg-transparent resize-none row-start-1 row-end-2 col-start-1 col-end-2 whitespace-pre-wrap",
            commonStyle,
            styles.editor
          )}
          ref={ref}
          value={props.code}
          onChange={handleChange}
          onFocus={onFocus}
        />
      ) : null}
    </div>
  );
};

export default Editor;

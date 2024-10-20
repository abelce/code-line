import { CSSProperties, useMemo } from "react";
import styles from "./style.module.scss";
import { cn } from "@/lib/utils";
import Editor, { EditorProps } from "../Editor/inde";

interface Props extends EditorProps {
  padding: number;
  background: string; 
}

const Frame = (props: Props) => {
  const { padding, background, code, lang, theme } = props;
 
  const contentStyles = useMemo((): CSSProperties => {
    return {
      padding: `${padding}px`,
      background: background,
    };
  }, [background, padding]);

  return (
    <div className="relative">
      <div className={cn("rounded")} style={contentStyles}>
        <div>
          <div className={styles.header}>
            <div className="flex gap-1">
              <div className="h-3 w-3 rounded-full bg-gray-400"></div>
              <div className="h-3 w-3 rounded-full bg-gray-400"></div>
              <div className="h-3 w-3 rounded-full bg-gray-400"></div>
            </div>
            <div>
              <input className="w-full bg-transparent text-center text-sm outline-0" />
            </div>
          </div>
          <Editor code={code} lang={lang} theme={theme} onChange={props.onChange}></Editor>
        </div>
      </div>
    </div>
  );
};

export default Frame;

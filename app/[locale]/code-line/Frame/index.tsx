import { CSSProperties, useMemo } from "react";
import { cn } from "@/lib/utils";
import Editor, { EditorProps, Mode } from "../Editor/inde";
import CopyCode from "./CopyCode";
import { getTheme } from "../../config";
import { BgType } from "../Setting/Backdrop";
import styles from "./style.module.scss";
import EditBtn from "./EditBtn";
import { usePathname } from "@/i18n/routing";

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

interface Props extends EditorProps {
  padding: number;
  title: string;
  updateTitle?: (title: string) => void;
  backdropType: BgType;
  backdrop: string;
  copyBtn: boolean;
  mode: Mode;
}

let currentBaackdrop = "";

const Frame = (props: Props) => {
  const {
    padding,
    code,
    lang,
    theme,
    title,
    updateTitle,
    backdropType,
    backdrop,
    copyBtn,
    mode = Mode.View,
  } = props;

  const pathname = usePathname();
  console.log(pathname);
  const isEmbedPage = pathname === "/embed";

  const containerStyles = useMemo((): CSSProperties => {
    const obj: CSSProperties = {
      padding: `${padding}px`,
    };
    if (backdropType === BgType.Image && backdrop) {
      obj.backgroundImage = `url(${backdrop})`;
      obj.backgroundSize = "cover";
    } else {
      obj.background = backdrop;
    }
    return obj;
  }, [padding, backdropType, backdrop]);

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

  const renderTitle = () => {
    if (isEmbedPage) {
      return null;
    }
    return (
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
    );
  };

  const renderActions = () => {
    if (!isEmbedPage) {
      return null;
    }

    return (
      <>
        {copyBtn ? <CopyCode code={code}></CopyCode> : null}
        <EditBtn />
      </>
    );
  };

  return (
    <div
      id="frame"
      className={cn(
        "relative h-full flex max-w-full",
        styles.frame,
        "font-jetBrainsMono"
      )}
    >
      <div
        className={cn(
          "flex-1 flex rounded transition-all duration-200 max-w-full",
          styles["bg-transparent"]
        )}
        style={containerStyles}
      >
        <div
          className="flex-1 flex flex-col rounded pt-1 relative group max-w-full"
          style={contentStyles}
        >
          <div
            className={cn("px-4", styles.header, {
              [styles["header-embed"]]: isEmbedPage,
            })}
          >
            <div className="flex gap-1 items-center">
              <div className="h-3 w-3 rounded-full bg-gray-400"></div>
              <div className="h-3 w-3 rounded-full bg-gray-400"></div>
              <div className="h-3 w-3 rounded-full bg-gray-400"></div>
            </div>
            {renderTitle()}
            <div className="hidden group-hover:flex flex-row justify-end gap-[2px]">
              {renderActions()}
            </div>
          </div>
          <Editor
            code={code}
            lang={lang}
            theme={theme}
            onChange={props.onChange}
            mode={props.mode}
            lineNum={props.lineNum}
          ></Editor>
        </div>
      </div>
    </div>
  );
};

export default Frame;

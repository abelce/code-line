import { CSSProperties, ReactNode, useMemo } from "react";
import styles from "./style.module.scss";
import { cn } from "@/lib/utils";

interface Props {
  padding: number;
  background: string;
  children: ReactNode;
}

const Frame = (props: Props) => {
  const { padding, background, children } = props;
  const contentStyles = useMemo((): CSSProperties => {
    return {
      padding: `${padding}px`,
      background: background,
    };
  }, [padding]);

  return (
    <div className="relative">
      <div className={cn("rounded")} style={contentStyles}>
        <div className="rounded">
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default Frame;

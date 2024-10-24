import {
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { CodeLineEvent, event_calc_frame_height } from "../event";

interface Props {
  children: ReactNode;
  width: number;
  onWidthChange?: (width: number) => void;
}

const Resizeable = (props: Props) => {
  const width = props.width;
  const [oldWidth, setOldWidth] = useState(0);
  const [point, setPoint] = useState<{ x: number; y: number }>();
  const [pressed, setPressed] = useState(false);
  const [resizeType, setResizeType] = useState<number>(0);

  const handleLeftClick = useCallback((e: any) => {
    setOldWidth(width)
    setPressed(true);
    setPoint({ x: e.pageX, y: e.pageY });
    setResizeType(1);
  }, [width]);

  const handleRightClick = useCallback((e: any) => {
    setOldWidth(width)
    setPressed(true);
    setPoint({ x: e.pageX, y: e.pageY });
    setResizeType(2);
  }, [width]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (pressed && point) {
        if (resizeType === 1) {
          props.onWidthChange?.(oldWidth + (point.x - e.pageX) * 2);
        } else if (resizeType === 2) {
          props.onWidthChange?.(oldWidth + (e.pageX - point.x) * 2);
        }
      }
    },
    [pressed, point, oldWidth, resizeType, props]
  );

  const handleMouseUp = useCallback((e: MouseEvent) => {
    setOldWidth(0)
    setPressed(false);
    setPoint(undefined);
    setResizeType(0);
    CodeLineEvent.emit(event_calc_frame_height)
  }, []);

  useEffect(() => {
    if (pressed) {
      addEventListener("mousemove", handleMouseMove);
      addEventListener("mouseup", handleMouseUp);
    } else {
      removeEventListener("mousemove", handleMouseMove);
      removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      removeEventListener("mousemove", handleMouseMove);
      removeEventListener("mouseup", handleMouseUp);
    };
  }, [pressed, handleMouseMove, handleMouseUp]);

  return (
    <div className="relative">
      {/* 标尺 */}
      <div className="h-[16px] absolute mb-4 top-[-20px]" style={{display: pressed ? "block" : "none", width: `${width}px`}}>
        <div className="absolute bg-gray-500 w-full h-[1px] top-[7px] text-[12px] flex justify-center items-center">
          <div
            className="p-1 text-gray-500"
            style={{ background: "hsl(var(--background))" }}
          >
            {width}px
          </div>
        </div>
        <div className="absolute bg-gray-500 w-[1px] h-full"></div>
        <div className="absolute bg-gray-500 w-[1px] h-full right-0"></div>
      </div>
      {/* 拖动条 */}
      <div
        className="absolute z-10 flex justify-center items-center w-[16px] h-full translate-x-[-50%] cursor-col-resize select-none"
        onMouseDown={handleLeftClick}
      >
        <div className="w-[6px] h-[6px] rounded-full bg-white"></div>
      </div>
      <div
        className="absolute z-10 flex justify-center items-center w-[16px] h-full right-0 translate-x-[50%] cursor-col-resize select-none"
        onMouseDown={handleRightClick}
      >
        <div className="w-[6px] h-[6px] rounded-full bg-white"></div>
      </div>
      {/* 内容 */}
      <div
        style={{ width: width + "px", userSelect: pressed ? "none" : "auto" }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Resizeable;

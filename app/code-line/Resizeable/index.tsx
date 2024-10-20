import {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

interface Props {
  children: ReactNode;
  width: number;
  onWidthChange?: (width: number) => void;
}

const Resizeable = (props: Props) => {
  const width = props.width;
  const [point, setPoint] = useState<{ x: number; y: number }>();
  const [pressed, setPressed] = useState(false);
  const [resizeType, setResizeType] = useState<number>(0);

  const handleLeftClick = useCallback((e: any) => {
    setPressed(true);
    setPoint({ x: e.pageX, y: e.pageY });
    setResizeType(1);
  }, []);
  const handleRightClick = useCallback((e: any) => {
    setPressed(true);
    setPoint({ x: e.pageX, y: e.pageY });
    setResizeType(2);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      console.log(pressed, point);
      if (pressed && point) {
        if (resizeType === 1) {
          props.onWidthChange?.(width + (point.x - e.pageX));
        } else if (resizeType === 2) {
          props.onWidthChange?.(width + (e.pageX - point.x));
        }
      }
    },
    [pressed, point, resizeType]
  );

  const handleMouseUp = useCallback((e: MouseEvent) => {
    setPressed(false);
    setPoint(undefined);
    setResizeType(0);
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
      <div className="h-[16px] relative mb-4">
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
      <div
        className="absolute z-10 flex justify-center items-center w-[16px] h-[16px] top-[50%] translate-x-[-50%] translate-y-[-50%] cursor-col-resize select-none"
        onMouseDown={handleLeftClick}
      >
        <div className="w-[6px] h-[6px] rounded-full bg-white"></div>
      </div>
      <div
        className="absolute z-10 flex justify-center items-center w-[16px] h-[16px] right-0 top-[50%] translate-x-[50%] translate-y-[-50%] cursor-col-resize select-none"
        onMouseDown={handleRightClick}
      >
        <div className="w-[6px] h-[6px] rounded-full bg-white"></div>
      </div>
      <div
        style={{ width: width + "px", userSelect: pressed ? "none" : "auto" }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Resizeable;

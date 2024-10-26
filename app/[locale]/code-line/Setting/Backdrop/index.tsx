import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorList from "./ColorList";
import ImageList from "./ImageList";
import { useTranslations } from "next-intl";
import styles from "./style.module.scss";
import { cn } from "@/lib/utils";

export enum BgType {
  Color = "color",
  Image = "image",
}

interface Props {
  type: BgType;
  value: string;
  onChange: (type: BgType, value: string) => void;
}
const Backdrop = (props: Props) => {
  const t = useTranslations("code-line.main.setting.backdrop-content");
  const getButton = () => {
    if (props.type === BgType.Image) {
      return props.value ? (
        <img src={props.value} className="h-full w-full object-contain"></img>
      ) : (
        <div className={cn(styles["bg-transparent"], "h-full")}></div>
      );
    }
    return props.value ? (
      <div style={{ background: props.value }} className="h-full"></div>
    ) : (
      <div className={cn(styles["bg-transparent"], "h-full")}></div>
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="rounded h-[40px] w-[160px] overflow-hidden cursor bg-transparent border">
          {getButton()}
        </div>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" className="w-[338px]">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="flex">
            <TabsTrigger className="flex-1" value={BgType.Color}>
              {t("color")}
            </TabsTrigger>
            <TabsTrigger className="flex-1" value={BgType.Image}>
              {t("image")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value={BgType.Color} className="w-full">
            <ColorList
              type={props.type}
              value={props.value}
              onChange={props.onChange}
            />
          </TabsContent>
          <TabsContent value={BgType.Image}>
            <ImageList
              type={props.type}
              value={props.value}
              onChange={props.onChange}
            />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default Backdrop;

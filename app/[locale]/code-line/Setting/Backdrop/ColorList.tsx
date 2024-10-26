import { backgroundList } from "@/app/[locale]/config";
import { BgType } from ".";
import { Input } from "@/components/ui/input";
import validateColor from "validate-color";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Props {
  type: BgType;
  value: string;
  onChange: (type: BgType, value: string) => void;
}

const ColorList = (props: Props) => {
  const t = useTranslations("code-line.main.setting.backdrop-content");
  return (
    <div className="flex gap-1 flex-wrap">
      <Input
        value={props.type === BgType.Color ? props.value : undefined}
        onChange={(e) => {
          const newColor = e.target.value;
          if (newColor && validateColor(newColor)) {
            props.onChange(BgType.Color, newColor);
          } else {
            props.onChange(BgType.Color, newColor);
          }
        }}
        placeholder={t("color-input")}
        className="my-1"
      ></Input>
      {backgroundList.map((option) => (
        <div
          key={option.value}
          className={cn(
            "cursor-pointer rounded-full w-[40px] h-[40px] flex border border-2 border-slate-100 p-[3px]",
            {
              "border-transparent": props.value !== option.value,
            }
          )}
          onClick={() => props.onChange(BgType.Color, option.value)}
        >
          <div style={{ background: option.value }} className="flex-1 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};

export default ColorList;

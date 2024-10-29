import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { lngList, paddingList, themeList } from "../../config";
import { SearchSelect } from "@/components/SearchSelect";
import { useTranslations } from "next-intl";
import Backdrop, { BgType } from "./Backdrop";
import { Switch } from "@/components/ui/switch";

interface SettingProps {
  lang: string;
  updateLng: (lang: string) => void;
  padding: number;
  updatePadding: (padding: number) => void;
  theme: string;
  updateTheme: (theme: string) => void;
  backdrop: string;
  backdropType: BgType;
  updateBackdrop: (type: BgType, backdrop: string) => void;
  lineNum: boolean;
  updateLineNum: (lineNum: boolean) => void; 
}

const Item = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <div className="flex justify-between items-center text-sm my-4">
      <label>{label}</label>
      {children}
    </div>
  );
};

const Setting = (props: SettingProps) => {
  const t = useTranslations("code-line.main.setting")
  return (
    <div className="w-[324px] h-full p-4 rounded overflow-x-auto">
      <Item label={t("backdrop")}>
        <Backdrop type={props.backdropType} value={props.backdrop} onChange={props.updateBackdrop}></Backdrop>
      </Item>
      <Item label={t("theme")}>
        <SearchSelect
          text={t("theme")}
          btnClassName="w-[160px]"
          value={String(props.theme)}
          onChange={props.updateTheme}
          options={themeList}
        ></SearchSelect>
      </Item>
      <Item label={t("padding")}>
        <Select
          value={String(props.padding)}
          onValueChange={(pad: string | number) => props.updatePadding(+pad)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={t("padding")} />
          </SelectTrigger>
          <SelectContent>
            {paddingList.map((pad) => (
              <SelectItem key={pad} value={String(pad)}>
                {pad}px
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Item>
      <Item label={t("language")}>
        <SearchSelect
          text={t("language")}
          btnClassName="w-[160px]"
          value={String(props.lang)}
          onChange={props.updateLng}
          options={lngList}
        ></SearchSelect>
      </Item>
      <Item label={t("line-number")}>
        <Switch checked={props.lineNum} onCheckedChange={props.updateLineNum}></Switch>
      </Item>
    </div>
  );
};

export default Setting;

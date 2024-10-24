import { ReactNode, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { backgroundList, lngList, paddingList, themeList } from "../../config";
import { SearchSelect } from "@/components/SearchSelect";
import { useTranslations } from "next-intl";

interface SettingProps {
  lang: string;
  updateLng: (lang: string) => void;
  padding: number;
  updatePadding: (padding: number) => void;
  theme: string;
  updateTheme: (theme: string) => void;
  backdrop: string;
  updateBackdrop: (backdrop: string) => void;
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
    <div className="absolute top-8 left-0 border w-[300px] p-4 rounded">
      <Item label={t("backdrop")}>
        <SearchSelect
          text={t("backdrop")}
          btnClassName="w-[160px]"
          value={props.backdrop}
          onChange={props.updateBackdrop}
          options={backgroundList}
          optionRender={(option) => (
            <>
              <div
                style={{ background: option.value }}
                className="rounded-full w-[16px] h-[16px] mr-[4px]"
              ></div>
              {option.label}
            </>
          )}
        ></SearchSelect>
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
    </div>
  );
};

export default Setting;

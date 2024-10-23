import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";

const LocalSwitcher = () => {
  const t = useTranslations();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = (params.locale || "en") as string;

  const handleOnChange = (newLocale: string) => {
    const prefix = `/${currentLocale}`;
    debugger;
    const _newPathname = pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname
    router.push({
        pathname: `/${_newPathname}?${searchParams.toString()}`,
    }, {locale: newLocale});
  };
  
  return (
    <Select value={currentLocale} onValueChange={handleOnChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t("header.lng.en")}</SelectItem>
        <SelectItem value="zh">{t("header.lng.zh")}</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LocalSwitcher;

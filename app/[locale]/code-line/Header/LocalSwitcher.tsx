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
  const t = useTranslations("code-line.header");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();

  const handleOnChange = (newLocale: string) => {
    // const prefix = `/${currentLocale}`;
    // const _newPathname = pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname
    router.push(
      {
        pathname: `/${pathname}?${searchParams.toString()}`,
      },
      { locale: newLocale }
    );
  };

  return (
    <Select value={currentLocale} onValueChange={handleOnChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t("lng.en")}</SelectItem>
        <SelectItem value="zh">{t("lng.zh")}</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LocalSwitcher;

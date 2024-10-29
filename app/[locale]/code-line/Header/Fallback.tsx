import { Button } from "@/components/ui/button";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

const Fallback = () => {
  const t = useTranslations("code-line.header");

  return (
    <Button
    variant="ghost"
      onClick={() =>
        window.open("https://github.com/abelce/codepic/issues/new", "_blank")
      }
    >
        <QuestionMarkCircledIcon/>
      {t("fallback")}
    </Button>
  );
};

export default Fallback;

import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { useCallback } from "react";

const EditBtn = () => {
  const locale = useLocale();
  const handleOpenCodePic = useCallback(() => {
    window.open(`/${locale}${location.search}`);
  }, [locale]);

  return (
    <Button
      variant={"outline"}
      size="sm"
      className="px-3 h-6"
      onMouseOut={handleOpenCodePic}
    >
      CodePic
    </Button>
  );
};

export default EditBtn;

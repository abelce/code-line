"use client";
import { Button } from "@/components/ui/button";
import { CheckIcon, LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const CopyLink = () => {
  const t = useTranslations("code-line.header");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const type = "text/plain";
    const blob = new Blob([location.href], {
      type,
    });
    navigator.clipboard.write([new ClipboardItem({ [type]: blob })]);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 500);
    }
  }, [copied]);

  return (
    <Button variant="outline" onClick={handleCopy}>
      {copied ? <CheckIcon /> : <LinkIcon />}
      {t("copy-link")}
    </Button>
  );
};

export default CopyLink;

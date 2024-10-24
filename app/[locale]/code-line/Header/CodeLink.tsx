"use client";
import { Button } from "@/components/ui/button";
import { CheckIcon, LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const CopyLink = () => {
  const t = useTranslations("code-line.header");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 500);
    }
  }, [copied]);

  return (
    <CopyToClipboard text={location.href} onCopy={() => setCopied(true)}>
      <Button variant="outline">
        {copied ? <CheckIcon /> : <LinkIcon />}
        {t("copy-link")}
      </Button>
    </CopyToClipboard>
  );
};

export default CopyLink;

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { CheckIcon, CodeIcon } from "@radix-ui/react-icons";
import {useTranslations} from 'next-intl';

const Embed = () => {
  const t = useTranslations("code-line.header");
  const searchParams = useSearchParams();
  const [embedLink, setEmbedLink] = useState("");
  const [copyBtn, setCoptBtn] = useState(false);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const height = searchParams.get("height");

  const handleCopyEmbedCode = useCallback(() => {
    if (iframeRef.current) {
      const type = "text/plain";
      const blob = new Blob([iframeRef.current.outerHTML], {
        type,
      });
      navigator.clipboard.write([new ClipboardItem({ [type]: blob })]);
      setCopied(true);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("copyBtn", copyBtn + "");
    const embedLink = `${location.origin}/embed?${params.toString()}`;

    setEmbedLink(embedLink);
  }, [copyBtn, height, searchParams]);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 500);
    }
  }, [copied]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CodeIcon />
          {t("embed.text")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] max-h-[90%] min-h-[50%] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{t("embed.text")}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex gap-4 overflow-hidden">
            <div className="w-64 pr-2">
              <DialogDescription>
                <p>{t('embed.desc')}</p>
                <p className="mt-2">{t("embed.notice")}</p>
              </DialogDescription>
              <Separator className="my-4" />
              <div className="flex justify-between items-center gap-4">
                <label className="text-sm">{t("embed.show-copy-btn")}</label>
                <Switch checked={copyBtn} onCheckedChange={setCoptBtn} />
              </div>
              <Separator className="my-4" />
              <Button
                variant={"outline"}
                className="mt-2 w-full"
                onClick={handleCopyEmbedCode}
              >
                {copied ? <CheckIcon /> : <CodeIcon />}
                {t("embed.copy-embed-code")}
              </Button>
            </div>
            <div className="flex-1 overflow-x-auto">
              <iframe
                ref={iframeRef}
                className="codepic_cc"
                src={embedLink}
                loading="lazy"
                allowTransparency
                allowFullScreen
                height={Number(height)}
                width="100%"
                style={{ widows: "100%", border: "none" }}
              ></iframe>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Embed;

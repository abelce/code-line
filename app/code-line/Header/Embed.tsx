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
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import CopyToClipboard from "react-copy-to-clipboard";
import { CheckIcon, CodeIcon } from "@radix-ui/react-icons";

const Embed = () => {
  const searchParams = useSearchParams();
  const [embedLink, setEmbedLink] = useState("");
  const [copyBtn, setCoptBtn] = useState(false);
  const [copied, setCopied] = useState(false);

  const height = searchParams.get("height");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("copyBtn", copyBtn + "");
    const embedLink = `${location.origin}/embed?${params.toString()}`;

    setEmbedLink(embedLink);
  }, [copyBtn, height]);

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
        <Button variant="outline">嵌入</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] max-h-[90%] min-h-[50%] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>嵌入</DialogTitle>
        </DialogHeader>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex gap-4 overflow-hidden">
            <div className="w-64 pr-2">
              <DialogDescription>
                <p>通过iframe直接嵌入您的网站、博客或文档，可自定义内容。</p>
                <p className="mt-1">注意：嵌入时设置的宽度不会生效。</p>
              </DialogDescription>
              <Separator className="my-4" />
              <div className="flex justify-between items-center gap-4">
                <label className="text-sm">显示复制按钮</label>
                <Switch checked={copyBtn} onCheckedChange={setCoptBtn} />
              </div>
              {/* <div className="flex justify-between items-center gap-4">
                <label className="text-sm">固定宽度</label>
                <Switch checked={copyBtn} onCheckedChange={setCoptBtn} />
              </div> */}
              <Separator className="my-4" />
              <CopyToClipboard text={embedLink} onCopy={() => setCopied(true)}>
                <Button variant={"outline"} className="mt-2 w-full">
                  {copied ? <CheckIcon /> : <CodeIcon />}
                  复制嵌入代码
                </Button>
              </CopyToClipboard>
            </div>
            <div className="flex-1 overflow-x-auto">
              <iframe
                id="code"
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

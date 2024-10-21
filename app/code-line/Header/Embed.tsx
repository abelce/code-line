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


const Embed = () => {
  const searchParams = useSearchParams();
  const [embedLink, setEmbedLink] = useState("");
  const [copyBtn, setCoptBtn] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("copyBtn", copyBtn + "");
    const src = `${location.origin}/embed?${params.toString()}`;

    const embedLink = `
         <iframe
        src="${src}"
        height="${params.get(
          "height"
        )}" width="100%" style="width:100%;border:none;" scrolling="no" frameborder="no" loading="lazy"
        allowtransparency="true" allowfullscreen="true"></iframe>
        `;
    setEmbedLink(embedLink);
  }, [copyBtn]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">嵌入</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] max-h-[90%] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>嵌入</DialogTitle>
        </DialogHeader>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex gap-4 overflow-hidden">
            <div className="w-64 pr-2">
              <DialogDescription>
                通过iframe直接嵌入您的网站、博客或文档，可自定义内容。
              </DialogDescription>
              <Separator className="my-4" />
              <div className="flex justify-between items-center gap-4">
                <label className="text-sm">显示复制按钮</label>
                <Switch checked={copyBtn} onCheckedChange={setCoptBtn} />
              </div>
              <Separator className="my-4" />
              <Button variant={"outline"} className="mt-2 w-full">
                复制嵌入代码
              </Button>
            </div>
            <div className="flex-1 overflow-x-auto">
              <div dangerouslySetInnerHTML={{ __html: embedLink }}></div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Embed;

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback } from "react";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

function simulateDownloadImageClick(uri: string, filename: string) {
  const link = document.createElement("a");
  if (typeof link.download !== "string") {
    window.open(uri);
  } else {
    link.href = uri;
    link.download = filename;
    accountForFirefox(clickLink, link);
  }
}

function clickLink(link: HTMLElement) {
  link.click();
}

function accountForFirefox(click: any, link: HTMLAnchorElement) {
  // wrapper function
  document.body.appendChild(link);
  click(link);
  document.body.removeChild(link);
}

const getImageCanvas = async () => {
  const editorInput = document.getElementById("editorInput");
  if (!editorInput) {
    return;
  }
  try {
    editorInput.style.display = "none"; // 先隐藏输入框，否则图片上会显示输入框的内容
    return await new Promise((resolve) => {
      setTimeout(async () => {
        const frame = document.getElementById("frame");
        if (frame) {
          const canvas = await html2canvas(frame, { allowTaint: true });

          resolve(canvas);
        }
      });
    });
  } catch (err) {
    console.error(err);
  } finally {
    editorInput.style.display = "";
  }
};

const Exports = () => {
  const { toast } = useToast();
  const handleExportPNG = useCallback(async () => {
    const canvas = await getImageCanvas();
    if (canvas instanceof HTMLCanvasElement) {
      simulateDownloadImageClick(canvas.toDataURL(), "file-name");
    }
  }, []);

  const handleCopyImage = useCallback(async () => {
    const canvas = await getImageCanvas();
    if (canvas instanceof HTMLCanvasElement) {
      try {
        canvas.toBlob((blob) => {
          blob &&
            navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob }),
            ]);
        }, "image/png");

        toast({
          title: "已复制",
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">导出</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleExportPNG}>导出PNG</DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyImage}>复制图片</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Exports;

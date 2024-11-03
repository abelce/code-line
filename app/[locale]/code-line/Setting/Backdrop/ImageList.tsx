import { useCallback, useEffect, useState } from "react";
import { BgType } from ".";
import { Input } from "@/components/ui/input";
import Loading from "@/app/[locale]/loading";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Props {
  type: BgType;
  value: string;
  onChange: (type: BgType, value: string) => void;
}
const ImageList = (props: Props) => {
  const t = useTranslations("code-line.main.setting.backdrop-content");
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<any>([]);

  const getImages = useCallback(async () => {
    setLoading(true);
    const response = await fetch("/api/unsplash/topics");
    const result = (await response.json()) as any;
    if (result?.data && result.data.type === "success") {
      const _images = (result.data.response.results || []).map(
        (image: any) => ({
          id: image.id,
          urls: {
            small:
              image.urls.raw +
              "&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100",
            regular:
              image.urls.raw +
              "&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
          },
        })
      );

      setImages(_images);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getImages();
  }, [getImages]);

  return (
    <div className="w-full flex gap-2 flex-wrap">
      <Input
        value={props.type === BgType.Image ? props.value : undefined}
        onChange={(e) => {
          props.onChange(BgType.Image, e.target.value);
        }}
        placeholder={t("image-input")}
        className="my-1"
      ></Input>
      {loading ? (
        <Loading></Loading>
      ) : (
        images.map((image: any) => (
          <div
            key={image.id}
            className={cn(
              "rounded w-[96px] h-[64px] cursor-pointer overflow-hidden border border-2 border-slate-100 p-[4px] flex",
              {
                "border-transparent": props.value !== image.urls.regular,
              }
            )}
            onClick={() => props.onChange(BgType.Image, image.urls.regular)}
          >
            <img src={image.urls.small} className="flex-1"></img>
          </div>
        ))
      )}
    </div>
  );
};

export default ImageList;

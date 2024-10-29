export async function imgToBase64(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      img.crossOrigin = "anonymous";

      ctx && ctx.drawImage(img, 0, 0);
      const base64 = canvas.toDataURL()
      console.log(src, base64.length);

      resolve(base64);
      img.onload = null;
    };

    img.onerror = (err) => {
        reject(err);
    }

    img.src = src;
  });
}

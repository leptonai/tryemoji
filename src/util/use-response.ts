import useSWR from "swr";

const dimension = 512;
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

function convertEmojiToDataToDataURL(emoji: string): string {
  const element = document.createElement("canvas");
  const ctx = element.getContext("2d")!;
  element.height = dimension;
  element.width = dimension;
  ctx.fillStyle = "rgb(24 24 27)";
  ctx.fillRect(0, 0, element.width, element.height);
  ctx.textAlign = `center`;
  ctx.font = `${dimension - 32}px serf`;
  const textMetrics = ctx.measureText(emoji);

  const textHeight =
    textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
  const y =
    dimension / 2 + (textMetrics.actualBoundingBoxAscent - textHeight / 2);

  ctx.fillText(emoji, dimension / 2, y);
  return element.toDataURL("image/jpeg", 0.5);
}
export const useResponse = (
  revalidateOnMount: boolean,
  emoji: string,
  name: string,
  style: string,
  strength: number,
  seed: number,
) => {
  const { data, isLoading } = useSWR(
    [emoji, name, style, strength, seed],
    async ([base64, name, style, strength, seed]) => {
      const response = await fetch("/api/run", {
        headers: {
          accept: "image/jpeg",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          input_image: convertEmojiToDataToDataURL(emoji).replace(
            /^data:image\/(png|jpeg);base64,/,
            "",
          ),
          prompt: `${name}, emoji ${emoji}, ${style}`,
          guidance_scale: 8,
          lcm_steps: 50,
          seed,
          steps: 4,
          strength,
          width: dimension,
          height: dimension,
        }),
        method: "POST",
      });
      if (response.status !== 200) return "";
      const blob = await response.blob();
      return await blobToBase64(blob);
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount,
      refreshWhenOffline: false,
      refreshInterval: 0,
    },
  );
  return { image: data as string, loading: isLoading };
};

export const IMG_ORIGIN = import.meta.env.VITE_IMG_ORIGIN as string;

export function imgUrl(key: string) {
  // key like "gallery/sunrise.jpg" (no leading slash)
  return `${IMG_ORIGIN}/${encodeURI(key)}`;
}
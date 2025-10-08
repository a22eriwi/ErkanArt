// client/src/types/upload.ts
export type Upload = {
  _id: string;
  title: string;
  description?: string;
  type: "painting" | "photograph";
  url: string;
  sizes?: {
    thumbnail?: string | null;
    medium?: string | null;
  };
  owner: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  isPublic: boolean;
  isFavorited: boolean;
};
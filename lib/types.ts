export type Collection = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  sort_order: number;
  created_at: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  image_url: string;
  short_description: string;
  collection_id: string;
  created_at: string;
  updated_at: string;
};

export type ProductWithCollection = Product & {
  collections: Pick<Collection, "id" | "name" | "slug"> | null;
};

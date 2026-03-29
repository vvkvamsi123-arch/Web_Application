export type Category = "Electronics" | "Home" | "Lifestyle" | "Fitness";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  rating: number;
  imageUrl: string;
  shortDescription: string;
  description: string;
  specs: string[];
};

export type CartItem = {
  productId: string;
  quantity: number;
};

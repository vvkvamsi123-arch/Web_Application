export type CategoryDef = {
  id: string;
  name: string;
  slug: string;
};

export type SubcategoryDef = {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
};

export const categories: CategoryDef[] = [
  { id: "cat-1", name: "Electronics", slug: "electronics" },
  { id: "cat-2", name: "Fashion", slug: "fashion" },
  { id: "cat-3", name: "Home & Kitchen", slug: "home-kitchen" },
  { id: "cat-4", name: "Beauty & Personal Care", slug: "beauty-personal-care" },
  { id: "cat-5", name: "Grocery", slug: "grocery" },
  { id: "cat-6", name: "Sports & Fitness", slug: "sports-fitness" },
  { id: "cat-7", name: "Books", slug: "books" },
  { id: "cat-8", name: "Toys & Games", slug: "toys-games" },
  { id: "cat-9", name: "Automotive", slug: "automotive" },
  { id: "cat-10", name: "Health", slug: "health" },
];

export const subcategories: SubcategoryDef[] = [
  // Electronics
  { id: "sub-1-1", name: "Mobiles", slug: "mobiles", categoryId: "cat-1" },
  { id: "sub-1-2", name: "Laptops", slug: "laptops", categoryId: "cat-1" },
  { id: "sub-1-3", name: "Headphones", slug: "headphones", categoryId: "cat-1" },
  { id: "sub-1-4", name: "Cameras", slug: "cameras", categoryId: "cat-1" },
  { id: "sub-1-5", name: "Smartwatches", slug: "smartwatches", categoryId: "cat-1" },

  // Fashion
  { id: "sub-2-1", name: "Men", slug: "men", categoryId: "cat-2" },
  { id: "sub-2-2", name: "Women", slug: "women", categoryId: "cat-2" },
  { id: "sub-2-3", name: "Kids", slug: "kids", categoryId: "cat-2" },
  { id: "sub-2-4", name: "Footwear", slug: "footwear", categoryId: "cat-2" },
  { id: "sub-2-5", name: "Accessories", slug: "accessories", categoryId: "cat-2" },

  // Home & Kitchen
  { id: "sub-3-1", name: "Furniture", slug: "furniture", categoryId: "cat-3" },
  { id: "sub-3-2", name: "Cookware", slug: "cookware", categoryId: "cat-3" },
  { id: "sub-3-3", name: "Bedding", slug: "bedding", categoryId: "cat-3" },
  { id: "sub-3-4", name: "Home Decor", slug: "home-decor", categoryId: "cat-3" },
  { id: "sub-3-5", name: "Storage", slug: "storage", categoryId: "cat-3" },

  // Beauty & Personal Care
  { id: "sub-4-1", name: "Skincare", slug: "skincare", categoryId: "cat-4" },
  { id: "sub-4-2", name: "Haircare", slug: "haircare", categoryId: "cat-4" },
  { id: "sub-4-3", name: "Makeup", slug: "makeup", categoryId: "cat-4" },
  { id: "sub-4-4", name: "Fragrances", slug: "fragrances", categoryId: "cat-4" },
  { id: "sub-4-5", name: "Grooming", slug: "grooming", categoryId: "cat-4" },

  // Grocery
  { id: "sub-5-1", name: "Snacks", slug: "snacks", categoryId: "cat-5" },
  { id: "sub-5-2", name: "Beverages", slug: "beverages", categoryId: "cat-5" },
  { id: "sub-5-3", name: "Staples", slug: "staples", categoryId: "cat-5" },
  { id: "sub-5-4", name: "Breakfast", slug: "breakfast", categoryId: "cat-5" },
  { id: "sub-5-5", name: "Organic", slug: "organic", categoryId: "cat-5" },

  // Sports & Fitness
  { id: "sub-6-1", name: "Gym Equipment", slug: "gym-equipment", categoryId: "cat-6" },
  { id: "sub-6-2", name: "Outdoor Sports", slug: "outdoor-sports", categoryId: "cat-6" },
  { id: "sub-6-3", name: "Sportswear", slug: "sportswear", categoryId: "cat-6" },
  { id: "sub-6-4", name: "Cycling", slug: "cycling", categoryId: "cat-6" },
  { id: "sub-6-5", name: "Yoga", slug: "yoga", categoryId: "cat-6" },

  // Books
  { id: "sub-7-1", name: "Fiction", slug: "fiction", categoryId: "cat-7" },
  { id: "sub-7-2", name: "Non-fiction", slug: "non-fiction", categoryId: "cat-7" },
  { id: "sub-7-3", name: "Children", slug: "children", categoryId: "cat-7" },
  { id: "sub-7-4", name: "Academic", slug: "academic", categoryId: "cat-7" },
  { id: "sub-7-5", name: "Self-help", slug: "self-help", categoryId: "cat-7" },

  // Toys & Games
  { id: "sub-8-1", name: "Action Figures", slug: "action-figures", categoryId: "cat-8" },
  { id: "sub-8-2", name: "Board Games", slug: "board-games", categoryId: "cat-8" },
  { id: "sub-8-3", name: "Puzzles", slug: "puzzles", categoryId: "cat-8" },
  { id: "sub-8-4", name: "Educational Toys", slug: "educational-toys", categoryId: "cat-8" },
  { id: "sub-8-5", name: "Remote Control", slug: "remote-control", categoryId: "cat-8" },

  // Automotive
  { id: "sub-9-1", name: "Car Accessories", slug: "car-accessories", categoryId: "cat-9" },
  { id: "sub-9-2", name: "Bike Accessories", slug: "bike-accessories", categoryId: "cat-9" },
  { id: "sub-9-3", name: "Tools", slug: "tools", categoryId: "cat-9" },
  { id: "sub-9-4", name: "Oils & Fluids", slug: "oils-fluids", categoryId: "cat-9" },
  { id: "sub-9-5", name: "Safety", slug: "safety", categoryId: "cat-9" },

  // Health
  { id: "sub-10-1", name: "Supplements", slug: "supplements", categoryId: "cat-10" },
  { id: "sub-10-2", name: "Medical Devices", slug: "medical-devices", categoryId: "cat-10" },
  { id: "sub-10-3", name: "Wellness", slug: "wellness", categoryId: "cat-10" },
  { id: "sub-10-4", name: "Personal Safety", slug: "personal-safety", categoryId: "cat-10" },
  { id: "sub-10-5", name: "First Aid", slug: "first-aid", categoryId: "cat-10" },
];

export function getCategoryBySlug(slug: string): CategoryDef | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): CategoryDef | undefined {
  return categories.find((c) => c.id === id);
}

export function getSubcategoryBySlug(slug: string, categoryId?: string): SubcategoryDef | undefined {
  return subcategories.find(
    (s) => s.slug === slug && (categoryId ? s.categoryId === categoryId : true)
  );
}

export function getSubcategoryById(id: string): SubcategoryDef | undefined {
  return subcategories.find((s) => s.id === id);
}

export function getSubcategoriesForCategory(categoryId: string): SubcategoryDef[] {
  return subcategories.filter((s) => s.categoryId === categoryId);
}

export type CategoryLevel = 1 | 2 | 3 | 4;

export type CategoryNode = {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  level: CategoryLevel;
};

export type CategoryDef = CategoryNode & {
  level: 1;
};

export type SubcategoryDef = CategoryNode & {
  level: 2;
  parentId: string;
  categoryId: string;
};

type SeedNode = {
  name: string;
  slug: string;
  children?: SeedNode[];
};

const categorySeeds: SeedNode[] = [
  {
    name: "Electronics",
    slug: "electronics",
    children: [
      {
        name: "Mobiles",
        slug: "mobiles",
        children: [
          {
            name: "Smartphones",
            slug: "smartphones",
            children: [
              { name: "Android Phones", slug: "android-phones" },
              { name: "iPhones", slug: "iphones" },
            ],
          },
          { name: "Feature Phones", slug: "feature-phones" },
          { name: "Budget Phones", slug: "budget-phones" },
        ],
      },
      {
        name: "Laptops",
        slug: "laptops",
        children: [
          { name: "Ultrabooks", slug: "ultrabooks" },
          {
            name: "Gaming Laptops",
            slug: "gaming-laptops",
            children: [
              { name: "Budget Gaming", slug: "budget-gaming" },
              { name: "High-End Gaming", slug: "high-end-gaming" },
            ],
          },
          { name: "Workstations", slug: "workstations" },
        ],
      },
      {
        name: "Headphones",
        slug: "headphones",
        children: [
          { name: "Over-Ear", slug: "over-ear" },
          { name: "True Wireless", slug: "true-wireless" },
          { name: "Gaming Headsets", slug: "gaming-headsets" },
        ],
      },
      {
        name: "Cameras",
        slug: "cameras",
        children: [
          { name: "Mirrorless", slug: "mirrorless" },
          { name: "Action Cameras", slug: "action-cameras" },
          { name: "Camera Lenses", slug: "camera-lenses" },
        ],
      },
      {
        name: "Smartwatches",
        slug: "smartwatches",
        children: [
          { name: "Sports Watches", slug: "sports-watches" },
          { name: "Fitness Trackers", slug: "fitness-trackers" },
        ],
      },
    ],
  },
  {
    name: "Fashion",
    slug: "fashion",
    children: [
      {
        name: "Men",
        slug: "men",
        children: [
          { name: "Casual Wear", slug: "casual-wear" },
          { name: "Formal Wear", slug: "formal-wear" },
          { name: "Winter Wear", slug: "winter-wear" },
        ],
      },
      {
        name: "Women",
        slug: "women",
        children: [
          { name: "Dresses", slug: "dresses" },
          { name: "Western Wear", slug: "western-wear" },
          { name: "Winter Collection", slug: "winter-collection" },
        ],
      },
      {
        name: "Kids",
        slug: "kids",
        children: [
          { name: "Boys", slug: "boys" },
          { name: "Girls", slug: "girls" },
        ],
      },
      {
        name: "Footwear",
        slug: "footwear",
        children: [
          { name: "Athletic Shoes", slug: "athletic-shoes" },
          { name: "Casual Shoes", slug: "casual-shoes" },
          { name: "Formal Shoes", slug: "formal-shoes" },
        ],
      },
      {
        name: "Accessories",
        slug: "accessories",
        children: [
          { name: "Bags & Wallets", slug: "bags-wallets" },
          { name: "Watches & Jewelry", slug: "watches-jewelry" },
          { name: "Eyewear", slug: "eyewear" },
        ],
      },
    ],
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    children: [
      {
        name: "Furniture",
        slug: "furniture",
        children: [
          { name: "Living Room", slug: "living-room" },
          { name: "Bedroom", slug: "bedroom" },
        ],
      },
      {
        name: "Cookware",
        slug: "cookware",
        children: [
          { name: "Pots & Pans", slug: "pots-pans" },
          { name: "Bakeware", slug: "bakeware" },
        ],
      },
      {
        name: "Bedding",
        slug: "bedding",
        children: [
          { name: "Sheets", slug: "sheets" },
          { name: "Comforters", slug: "comforters" },
        ],
      },
      {
        name: "Home Decor",
        slug: "home-decor",
        children: [
          { name: "Wall Art", slug: "wall-art" },
          { name: "Lighting", slug: "lighting" },
        ],
      },
      {
        name: "Storage",
        slug: "storage",
        children: [
          { name: "Closet Storage", slug: "closet-storage" },
          { name: "Kitchen Storage", slug: "kitchen-storage" },
        ],
      },
    ],
  },
  {
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    children: [
      {
        name: "Skincare",
        slug: "skincare",
        children: [
          { name: "Cleansers", slug: "cleansers" },
          { name: "Serums", slug: "serums" },
        ],
      },
      {
        name: "Haircare",
        slug: "haircare",
        children: [
          { name: "Shampoo", slug: "shampoo" },
          { name: "Treatments", slug: "treatments" },
        ],
      },
      {
        name: "Makeup",
        slug: "makeup",
        children: [
          { name: "Face", slug: "face" },
          { name: "Eyes", slug: "eyes" },
        ],
      },
      {
        name: "Fragrances",
        slug: "fragrances",
        children: [
          { name: "Perfumes", slug: "perfumes" },
          { name: "Body Mists", slug: "body-mists" },
        ],
      },
      {
        name: "Grooming",
        slug: "grooming",
        children: [
          { name: "Beard Care", slug: "beard-care" },
          { name: "Shaving", slug: "shaving" },
        ],
      },
    ],
  },
  {
    name: "Grocery",
    slug: "grocery",
    children: [
      {
        name: "Snacks",
        slug: "snacks",
        children: [
          { name: "Protein Snacks", slug: "protein-snacks" },
          { name: "Sweet Snacks", slug: "sweet-snacks" },
        ],
      },
      {
        name: "Beverages",
        slug: "beverages",
        children: [
          { name: "Coffee & Tea", slug: "coffee-tea" },
          { name: "Sparkling Drinks", slug: "sparkling-drinks" },
        ],
      },
      {
        name: "Staples",
        slug: "staples",
        children: [
          { name: "Rice & Grains", slug: "rice-grains" },
          { name: "Cooking Oils", slug: "cooking-oils" },
        ],
      },
      {
        name: "Breakfast",
        slug: "breakfast",
        children: [
          { name: "Cereal & Oats", slug: "cereal-oats" },
          { name: "Spreads & Syrups", slug: "spreads-syrups" },
        ],
      },
      {
        name: "Organic",
        slug: "organic",
        children: [
          { name: "Organic Pantry", slug: "organic-pantry" },
          { name: "Organic Superfoods", slug: "organic-superfoods" },
        ],
      },
    ],
  },
  {
    name: "Sports & Fitness",
    slug: "sports-fitness",
    children: [
      {
        name: "Gym Equipment",
        slug: "gym-equipment",
        children: [
          { name: "Strength Training", slug: "strength-training" },
          { name: "Home Gym", slug: "home-gym" },
        ],
      },
      {
        name: "Outdoor Sports",
        slug: "outdoor-sports",
        children: [
          { name: "Camping", slug: "camping" },
          { name: "Hiking", slug: "hiking" },
        ],
      },
      {
        name: "Sportswear",
        slug: "sportswear",
        children: [
          { name: "Training Apparel", slug: "training-apparel" },
          { name: "Running Gear", slug: "running-gear" },
        ],
      },
      {
        name: "Cycling",
        slug: "cycling",
        children: [
          { name: "Bike Accessories", slug: "bike-accessories" },
          { name: "Cycling Apparel", slug: "cycling-apparel" },
        ],
      },
      {
        name: "Yoga",
        slug: "yoga",
        children: [
          { name: "Yoga Mats", slug: "yoga-mats" },
          { name: "Yoga Props", slug: "yoga-props" },
        ],
      },
    ],
  },
  {
    name: "Books",
    slug: "books",
    children: [
      {
        name: "Fiction",
        slug: "fiction",
        children: [
          { name: "Literary Fiction", slug: "literary-fiction" },
          { name: "Sci-Fi & Fantasy", slug: "sci-fi-fantasy" },
        ],
      },
      {
        name: "Non-fiction",
        slug: "non-fiction",
        children: [
          { name: "Business", slug: "business" },
          { name: "History", slug: "history" },
        ],
      },
      {
        name: "Children",
        slug: "children",
        children: [
          { name: "Picture Books", slug: "picture-books" },
          { name: "Young Readers", slug: "young-readers" },
        ],
      },
      {
        name: "Academic",
        slug: "academic",
        children: [
          { name: "Engineering", slug: "engineering" },
          { name: "Medical", slug: "medical" },
        ],
      },
      {
        name: "Self-help",
        slug: "self-help",
        children: [
          { name: "Productivity", slug: "productivity" },
          { name: "Personal Growth", slug: "personal-growth" },
        ],
      },
    ],
  },
  {
    name: "Toys & Games",
    slug: "toys-games",
    children: [
      {
        name: "Action Figures",
        slug: "action-figures",
        children: [
          { name: "Superheroes", slug: "superheroes" },
          { name: "Collectibles", slug: "collectibles" },
        ],
      },
      {
        name: "Board Games",
        slug: "board-games",
        children: [
          { name: "Family Games", slug: "family-games" },
          { name: "Strategy Games", slug: "strategy-games" },
        ],
      },
      {
        name: "Puzzles",
        slug: "puzzles",
        children: [
          { name: "Jigsaw Puzzles", slug: "jigsaw-puzzles" },
          { name: "Brain Teasers", slug: "brain-teasers" },
        ],
      },
      {
        name: "Educational Toys",
        slug: "educational-toys",
        children: [
          { name: "STEM Kits", slug: "stem-kits" },
          { name: "Learning Toys", slug: "learning-toys" },
        ],
      },
      {
        name: "Remote Control",
        slug: "remote-control",
        children: [
          { name: "RC Cars", slug: "rc-cars" },
          { name: "RC Drones", slug: "rc-drones" },
        ],
      },
    ],
  },
  {
    name: "Automotive",
    slug: "automotive",
    children: [
      {
        name: "Car Accessories",
        slug: "car-accessories",
        children: [
          { name: "Interior Accessories", slug: "interior-accessories" },
          { name: "Car Electronics", slug: "car-electronics" },
        ],
      },
      {
        name: "Bike Accessories",
        slug: "bike-accessories",
        children: [
          { name: "Riding Gear", slug: "riding-gear" },
          { name: "Bike Security", slug: "bike-security" },
        ],
      },
      {
        name: "Tools",
        slug: "tools",
        children: [
          { name: "Garage Tools", slug: "garage-tools" },
          { name: "Emergency Tools", slug: "emergency-tools" },
        ],
      },
      {
        name: "Oils & Fluids",
        slug: "oils-fluids",
        children: [
          { name: "Engine Oil", slug: "engine-oil" },
          { name: "Coolants", slug: "coolants" },
        ],
      },
      {
        name: "Safety",
        slug: "safety",
        children: [
          { name: "Roadside Safety", slug: "roadside-safety" },
          { name: "Protective Gear", slug: "protective-gear" },
        ],
      },
    ],
  },
  {
    name: "Health",
    slug: "health",
    children: [
      {
        name: "Supplements",
        slug: "supplements",
        children: [
          { name: "Daily Vitamins", slug: "daily-vitamins" },
          { name: "Performance Nutrition", slug: "performance-nutrition" },
        ],
      },
      {
        name: "Medical Devices",
        slug: "medical-devices",
        children: [
          { name: "Monitoring Devices", slug: "monitoring-devices" },
          { name: "Mobility Support", slug: "mobility-support" },
        ],
      },
      {
        name: "Wellness",
        slug: "wellness",
        children: [
          { name: "Sleep Support", slug: "sleep-support" },
          { name: "Stress Relief", slug: "stress-relief" },
        ],
      },
      {
        name: "Personal Safety",
        slug: "personal-safety",
        children: [
          { name: "Sanitization", slug: "sanitization" },
          { name: "Protective Masks", slug: "protective-masks" },
        ],
      },
      {
        name: "First Aid",
        slug: "first-aid",
        children: [
          { name: "Home First Aid", slug: "home-first-aid" },
          { name: "Travel First Aid", slug: "travel-first-aid" },
        ],
      },
    ],
  },
];

const nodes: CategoryNode[] = [];
let nextId = 1;

function addSeedNodes(seedNodes: SeedNode[], parentId: string | null = null, level: CategoryLevel = 1) {
  for (const seed of seedNodes) {
    const nodeId = `cat-${nextId}`;
    nextId += 1;

    nodes.push({
      id: nodeId,
      name: seed.name,
      slug: seed.slug,
      parentId,
      level,
    });

    if (seed.children?.length) {
      addSeedNodes(seed.children, nodeId, (level + 1) as CategoryLevel);
    }
  }
}

addSeedNodes(categorySeeds);

export const categoryTree: CategoryNode[] = nodes;

export const categories: CategoryDef[] = categoryTree.filter(
  (node): node is CategoryDef => node.level === 1
);

export const subcategories: SubcategoryDef[] = categoryTree
  .filter((node): node is CategoryNode & { level: 2; parentId: string } => node.level === 2)
  .map((node) => ({ ...node, categoryId: node.parentId }));

const categoriesById = new Map(categoryTree.map((node) => [node.id, node]));

export function getCategoryById(id: string): CategoryNode | undefined {
  return categoriesById.get(id);
}

export function getCategoryBySlug(slug: string): CategoryDef | undefined {
  return categories.find((node) => node.slug === slug);
}

export function getSubcategoryBySlug(slug: string, categoryId?: string): SubcategoryDef | undefined {
  return subcategories.find(
    (node) => node.slug === slug && (categoryId ? node.categoryId === categoryId : true)
  );
}

export function getSubcategoryById(id: string): SubcategoryDef | undefined {
  return subcategories.find((node) => node.id === id);
}

export function listChildCategories(parentId: string): CategoryNode[] {
  return categoryTree.filter((node) => node.parentId === parentId);
}

export function getSubcategoriesForCategory(categoryId: string): SubcategoryDef[] {
  return listChildCategories(categoryId)
    .filter(
      (node): node is CategoryNode & { level: 2; parentId: string } =>
        node.level === 2 && typeof node.parentId === "string"
    )
    .map((node) => ({ ...node, categoryId }));
}

export function isLeafCategory(categoryId: string): boolean {
  return !categoryTree.some((node) => node.parentId === categoryId);
}

export function getCategoryPath(categoryId: string): CategoryNode[] {
  const path: CategoryNode[] = [];
  let current = getCategoryById(categoryId);

  while (current) {
    path.unshift(current);
    current = current.parentId ? getCategoryById(current.parentId) : undefined;
  }

  return path;
}

export function resolveCategoryBySlugChain(slugs: string[]): CategoryNode[] | undefined {
  if (slugs.length === 0) return undefined;

  const resolved: CategoryNode[] = [];
  let parentId: string | null = null;

  for (const slug of slugs) {
    const match = categoryTree.find((node) => node.slug === slug && node.parentId === parentId);
    if (!match) return undefined;
    resolved.push(match);
    parentId = match.id;
  }

  return resolved;
}

export function listDescendantCategoryIds(categoryId: string): string[] {
  const descendantIds: string[] = [];
  const stack = [categoryId];

  while (stack.length > 0) {
    const currentId = stack.pop();
    if (!currentId) continue;

    const children = listChildCategories(currentId);
    for (const child of children) {
      descendantIds.push(child.id);
      stack.push(child.id);
    }
  }

  return descendantIds;
}

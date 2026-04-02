import { Product } from "@/lib/types";
import {
  categoryTree,
  getCategoryById,
  getCategoryPath,
  isLeafCategory,
} from "./categories";

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const popularLeafSlugs = new Set([
  "android-phones",
  "iphones",
  "ultrabooks",
  "budget-gaming",
  "high-end-gaming",
  "casual-wear",
  "formal-wear",
  "dresses",
  "western-wear",
]);

const brandByRootSlug: Record<string, string[]> = {
  electronics: ["Samsung", "Apple", "Sony", "Dell", "Lenovo", "Asus"],
  fashion: ["Northline", "Atelier Co.", "Modecraft", "Everlane", "Levi's", "Zara"],
  "home-kitchen": ["West Elm", "Article", "Brooklinen", "Nordic Ware", "IKEA", "CB2"],
  "beauty-personal-care": ["CeraVe", "Olaplex", "Fenty Beauty", "The Ordinary", "Nivea", "Jo Malone"],
  grocery: ["Nature's Path", "Bear Naked", "Bob's Red Mill", "Bragg", "Kirkland", "GT's"],
  "sports-fitness": ["Nike", "Manduka", "Rogue Fitness", "Patagonia", "Giro", "Osprey"],
  books: ["North Press", "Bluebird Books", "Summit Editions", "Brightleaf", "Lumen House", "Anchorline"],
  "toys-games": ["Hasbro", "LEGO", "Ravensburger", "Mattel", "Bandai", "Playmobil"],
  automotive: ["Bosch", "NOCO", "Govee", "Kryptonite", "Mobil 1", "Kidde"],
  health: ["Omron", "Nature Made", "Withings", "LifeStraw", "Thorne", "Yogasleep"],
};

const productTypeByRootSlug: Record<string, string[]> = {
  electronics: ["Edition", "Pro", "Max", "Core", "Ultra", "Studio", "Series"],
  fashion: ["Jacket", "Shirt", "Set", "Collection", "Dress", "Layer", "Fit"],
  "home-kitchen": ["Set", "Collection", "Organizer", "Console", "Bundle", "Series", "Essentials"],
  "beauty-personal-care": ["Serum", "Cream", "Kit", "Mist", "Palette", "Gel", "Cleanse"],
  grocery: ["Pack", "Blend", "Reserve", "Mix", "Selection", "Jar", "Box"],
  "sports-fitness": ["Trainer", "Kit", "Pack", "Series", "Set", "Pro", "Flex"],
  books: ["Volume", "Guide", "Collection", "Edition", "Series", "Handbook", "Reader"],
  "toys-games": ["Set", "Quest", "Deluxe", "Challenge", "Builder", "Pack", "Play Kit"],
  automotive: ["Kit", "Guard", "Pro", "Series", "Pack", "Drive", "Shield"],
  health: ["Support", "Care", "Relief", "Monitor", "Bundle", "Assist", "Formula"],
};

const variantNames = [
  "Prime",
  "Studio",
  "Select",
  "Core",
  "Elite",
  "Everyday",
  "Signature",
  "Plus",
  "Advance",
  "Reserve",
];

function findLevel2Ancestor(pathIds: string[]): string {
  const level2Node = pathIds
    .map((id) => getCategoryById(id))
    .find((node) => node?.level === 2);

  if (!level2Node) {
    throw new Error(`Leaf category is missing a level-2 ancestor: ${pathIds.join(",")}`);
  }

  return level2Node.id;
}

function buildPrice(rootSlug: string, index: number): number {
  const basePriceByRootSlug: Record<string, number> = {
    electronics: 149,
    fashion: 39,
    "home-kitchen": 59,
    "beauty-personal-care": 18,
    grocery: 8,
    "sports-fitness": 34,
    books: 14,
    "toys-games": 19,
    automotive: 24,
    health: 17,
  };

  return basePriceByRootSlug[rootSlug] + index * ((rootSlug.length % 7) + 9);
}

function buildSpecs(rootSlug: string, pathNames: string[], index: number): string[] {
  const leafName = pathNames[pathNames.length - 1];

  const rootSpecs: Record<string, string[]> = {
    electronics: [
      "Latest generation hardware",
      "Fast delivery ready",
      `${128 + index * 32}GB class configuration`,
    ],
    fashion: ["Season-ready fabric", "Inclusive size options", `Drop ${2026 + (index % 2)}`],
    "home-kitchen": [
      "Built for daily use",
      "Modern finish profile",
      `${1 + index}-year care coverage`,
    ],
    "beauty-personal-care": [
      "Dermatologist reviewed",
      "Everyday routine friendly",
      `${30 + index * 5} day usage cycle`,
    ],
    grocery: ["Fresh shelf rotation", "Pantry-friendly packaging", `${2 + index} item serving format`],
    "sports-fitness": [
      "Training-ready build",
      "Performance-focused design",
      `${index + 1} workout use cases`,
    ],
    books: ["Curated title selection", "Reader-friendly format", `${220 + index * 18} page equivalent`],
    "toys-games": [
      "Gift-ready packaging",
      "Family-friendly build quality",
      `Recommended for ${6 + index}+ years`,
    ],
    automotive: [
      "Garage-ready durability",
      "Road-trip friendly setup",
      `${12 + index} month service cycle`,
    ],
    health: ["Daily wellness support", "Easy home use", `${index + 1} step setup`],
  };

  return [leafName, ...rootSpecs[rootSlug]].slice(0, 3);
}

function buildProducts(): Product[] {
  const leafNodes = categoryTree.filter((node) => isLeafCategory(node.id));
  const allProducts: Product[] = [];
  let nextId = 1;

  for (const leaf of leafNodes) {
    const path = getCategoryPath(leaf.id);
    const root = path[0];
    if (!root) continue;

    const names = path.map((node) => node.name);
    const level2CategoryId = findLevel2Ancestor(path.map((node) => node.id));
    const brands = brandByRootSlug[root.slug] ?? ["HarborCart"];
    const productTypes = productTypeByRootSlug[root.slug] ?? ["Edition"];
    const count = popularLeafSlugs.has(leaf.slug) ? 10 : 2;

    for (let index = 0; index < count; index += 1) {
      const collectionName = names.slice(1).join(" ");
      const productType = productTypes[index % productTypes.length];
      const brand = brands[index % brands.length];
      const variant = variantNames[index % variantNames.length];
      const name = `${collectionName} ${variant} ${productType}`;
      const price = buildPrice(root.slug, index);
      const slug = `${slugify(name)}-${nextId}`;
      const shortDescription = `Dummy ${leaf.name.toLowerCase()} product for the ${collectionName} PLP.`;

      allProducts.push({
        id: `p-${nextId}`,
        slug,
        name,
        category: root.name,
        categoryId: root.id,
        subcategoryId: level2CategoryId,
        leafCategoryId: leaf.id,
        price,
        rating: Number((3.8 + ((nextId % 12) * 0.1)).toFixed(1)),
        imageUrl: `https://picsum.photos/seed/${slug}/640/480`,
        shortDescription,
        description: `${shortDescription} Built as sample catalog content for ${collectionName}, this item helps populate the product listing page with realistic merchandising coverage.`,
        specs: buildSpecs(root.slug, names, index),
        brand,
        stockStatus:
          nextId % 17 === 0
            ? "out-of-stock"
            : nextId % 6 === 0
              ? "low-stock"
              : "in-stock",
      });

      nextId += 1;
    }
  }

  return allProducts;
}

export const products: Product[] = buildProducts();

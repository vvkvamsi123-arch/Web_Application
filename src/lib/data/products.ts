import { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "p-101",
    slug: "aero-noise-cancelling-headphones",
    name: "Aero Noise-Cancelling Headphones",
    category: "Electronics",
    price: 229,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Wireless over-ear headphones with 40-hour battery life.",
    description: "A premium listening experience with adaptive noise cancellation and soft memory foam ear cushions.",
    specs: ["Bluetooth 5.3", "40h battery", "USB-C fast charge"]
  },
  {
    id: "p-102",
    slug: "lumen-smart-desk-lamp",
    name: "Lumen Smart Desk Lamp",
    category: "Home",
    price: 89,
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    shortDescription: "App-controlled desk light with 16 million colors.",
    description: "An adjustable aluminum desk lamp with focus modes for reading, coding, and late-night work.",
    specs: ["Voice assistant support", "Scene presets", "Touch controls"]
  },
  {
    id: "p-103",
    slug: "stride-running-shoes",
    name: "Stride Running Shoes",
    category: "Lifestyle",
    price: 129,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Lightweight trainers designed for all-day comfort.",
    description: "Responsive foam sole and breathable knit upper make these shoes ideal for daily runs and casual wear.",
    specs: ["Breathable mesh", "Rubber outsole", "Unisex fit"]
  },
  {
    id: "p-104",
    slug: "pulse-fitness-watch",
    name: "Pulse Fitness Watch",
    category: "Fitness",
    price: 199,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Track heart rate, sleep, and training goals.",
    description: "A sleek smartwatch with health analytics, workout modes, and water resistance for active lifestyles.",
    specs: ["7-day battery", "GPS", "Water resistant 5 ATM"]
  },
  {
    id: "p-105",
    slug: "nova-portable-speaker",
    name: "Nova Portable Speaker",
    category: "Electronics",
    price: 119,
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Compact speaker with deep bass and crisp vocals.",
    description: "Built for travel and backyard sessions with IPX7 splash resistance and stereo pairing.",
    specs: ["IPX7 rated", "12h playtime", "Stereo pairing"]
  },
  {
    id: "p-106",
    slug: "arc-standing-mat",
    name: "Arc Standing Mat",
    category: "Home",
    price: 59,
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Ergonomic anti-fatigue mat for standing desks.",
    description: "Supportive layered foam reduces pressure on knees and lower back during long work sessions.",
    specs: ["Anti-slip base", "Water resistant", "Beveled edge"]
  }
];

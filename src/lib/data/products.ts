import { Product } from "@/lib/types";
import { subcategories, getCategoryById } from "./categories";

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Compact product tuple: [name, brand, price, shortDescription, spec1, spec2, spec3]
type RawProduct = [string, string, number, string, string, string, string];

const rawData: Record<string, RawProduct[]> = {
  // ── Electronics ────────────────────────────────────────────────
  // Mobiles
  "sub-1-1": [
    ["Galaxy Ultra S25", "Samsung", 1199, "Flagship smartphone with AI-powered camera system.", "6.8\" AMOLED 120Hz", "256GB Storage", "5000mAh Battery"],
    ["iPhone 16 Pro", "Apple", 1099, "Pro-grade camera and A18 Bionic chip.", "6.7\" Super Retina XDR", "512GB Storage", "USB-C Fast Charge"],
    ["Pixel 9 Pro", "Google", 899, "Pure Android experience with Tensor G4.", "6.7\" LTPO OLED", "128GB Storage", "AI Photo Features"],
    ["OnePlus 12 Ultra", "OnePlus", 799, "Flagship killer with 100W charging.", "6.82\" ProXDR Display", "256GB UFS 4.0", "100W SuperVOOC"],
    ["Xiaomi 14 Ultra", "Xiaomi", 949, "Leica optics and stunning display.", "6.73\" AMOLED", "512GB Storage", "Leica Quad Camera"],
    ["Samsung Galaxy A55", "Samsung", 449, "Mid-range champion with flagship features.", "6.6\" Super AMOLED", "128GB Storage", "IP67 Water Resistant"],
  ],
  // Laptops
  "sub-1-2": [
    ["MacBook Pro 16 M4", "Apple", 2499, "M4 Pro chip for professional workflows.", "16\" Liquid Retina XDR", "512GB SSD", "22h Battery Life"],
    ["Dell XPS 15", "Dell", 1799, "InfinityEdge display with 13th-gen Intel.", "15.6\" OLED 3.5K", "512GB NVMe SSD", "Intel Core i7-13700H"],
    ["ThinkPad X1 Carbon Gen 12", "Lenovo", 1649, "Ultralight business laptop with MIL-STD durability.", "14\" 2.8K OLED", "16GB RAM", "1.12 kg Weight"],
    ["HP Spectre x360 16", "HP", 1599, "Convertible laptop with AMOLED touch display.", "16\" 3K AMOLED Touch", "1TB SSD", "Intel Evo i7"],
    ["Asus ROG Zephyrus G16", "Asus", 2199, "Gaming powerhouse in an ultraportable form.", "16\" QHD+ 240Hz", "RTX 4070", "DDR5 16GB RAM"],
    ["Microsoft Surface Laptop 6", "Microsoft", 1299, "Sleek design with SnapDragon X Elite.", "15\" PixelSense Touch", "256GB SSD", "All-Day Battery"],
  ],
  // Headphones
  "sub-1-3": [
    ["AirPods Max 2", "Apple", 549, "Spatial audio with premium aluminum build.", "Hi-Fi Lossless Audio", "Active Noise Cancellation", "20h Battery"],
    ["Sony WH-1000XM6", "Sony", 399, "Industry-leading noise cancellation.", "LDAC Hi-Res Audio", "Auto NC Optimizer", "30h Battery Life"],
    ["Bose QuietComfort Ultra", "Bose", 429, "Immersive audio with world-class ANC.", "CustomTune Sound", "Aware Mode", "24h Battery Life"],
    ["Sennheiser Momentum 4", "Sennheiser", 349, "Audiophile-grade wireless headphones.", "42mm Drivers", "Adaptive ANC", "60h Battery Life"],
    ["JBL Tour One M2", "JBL", 299, "True adaptive noise cancelling with spatial sound.", "50mm Drivers", "Smart Ambient", "50h Battery Life"],
    ["Beats Studio Pro", "Beats", 349, "Personalized spatial audio with dynamic head tracking.", "Custom Acoustic Platform", "USB-C & 3.5mm", "40h Battery Life"],
  ],
  // Cameras
  "sub-1-4": [
    ["Sony Alpha A7 IV", "Sony", 2499, "Full-frame hybrid camera for photos and video.", "33MP Full Frame", "4K 60fps Video", "759-Point AF"],
    ["Canon EOS R6 Mark II", "Canon", 2299, "Speed meets image quality in a compact body.", "24.2MP CMOS", "40fps Burst", "6K RAW Video"],
    ["Nikon Z8", "Nikon", 3999, "Flagship mirrorless with 8K capability.", "45.7MP Stacked CMOS", "8K30 Video", "120fps 4K"],
    ["Fujifilm X-T5", "Fujifilm", 1699, "Retro-styled APS-C with 40MP sensor.", "40.2MP X-Trans", "Film Simulation Modes", "7-Stop IBIS"],
    ["Panasonic Lumix S5 II", "Panasonic", 1999, "Hybrid camera with phase-detect autofocus.", "24.2MP Full Frame", "6K 30fps Video", "Phase Hybrid AF"],
    ["GoPro Hero 12 Black", "GoPro", 399, "Ultimate action camera with HyperSmooth 6.0.", "5.3K 60fps", "HyperSmooth 6.0", "Waterproof 10m"],
  ],
  // Smartwatches
  "sub-1-5": [
    ["Apple Watch Ultra 3", "Apple", 799, "Adventure-ready smartwatch with precision GPS.", "49mm Titanium Case", "72h Battery Life", "Depth Gauge"],
    ["Samsung Galaxy Watch 7", "Samsung", 349, "Advanced health monitoring with BioActive sensor.", "Sapphire Crystal", "BioActive Sensor", "WearOS 5"],
    ["Garmin Fenix 8 Solar", "Garmin", 899, "Multi-sport GPS watch with solar charging.", "Solar Charging", "Multi-Band GPS", "28-Day Battery"],
    ["Fitbit Sense 3", "Fitbit", 299, "Comprehensive health and stress management.", "EDA Sensor", "SpO2 Monitoring", "6-Day Battery"],
    ["Amazfit T-Rex Ultra", "Amazfit", 399, "Rugged outdoor smartwatch for extreme conditions.", "MIL-STD-810G", "Dual-Band GPS", "20-Day Battery"],
    ["Polar Vantage V3", "Polar", 599, "Premium multisport watch with biosensing.", "AMOLED Display", "Biosensing Tech", "Offline Maps"],
  ],

  // ── Fashion ────────────────────────────────────────────────────
  // Men
  "sub-2-1": [
    ["Classic Oxford Button-Down Shirt", "Brooks Brothers", 89, "Timeless cotton oxford shirt for every occasion.", "100% Cotton", "Regular Fit", "Machine Washable"],
    ["Slim Fit Stretch Chinos", "Dockers", 69, "Modern slim-fit chinos with stretch comfort.", "98% Cotton 2% Elastane", "Slim Fit", "Wrinkle Resistant"],
    ["Wool Blend Sport Blazer", "Hugo Boss", 349, "Sophisticated blazer for smart-casual looks.", "Wool-Cotton Blend", "Half Lined", "Two-Button Closure"],
    ["Graphic Cotton Tee 3-Pack", "Uniqlo", 39, "Essential graphic tees in premium cotton.", "100% Supima Cotton", "Relaxed Fit", "Set of 3"],
    ["Classic Denim Trucker Jacket", "Levi's", 129, "Iconic denim jacket in a modern wash.", "100% Cotton Denim", "Regular Fit", "Button Front"],
    ["Linen Summer Drawstring Shorts", "J.Crew", 59, "Breathable linen shorts for warm days.", "100% Linen", "7\" Inseam", "Elastic Waist"],
  ],
  // Women
  "sub-2-2": [
    ["Silk Midi Wrap Dress", "Diane von Furstenberg", 398, "Classic wrap dress in pure silk.", "100% Silk", "Midi Length", "Self-Tie Waist"],
    ["High-Rise Straight Jeans", "Agolde", 198, "Premium denim with a vintage-inspired fit.", "Organic Cotton", "High Rise", "Relaxed Straight"],
    ["Cashmere V-Neck Cardigan", "Everlane", 168, "Luxuriously soft cashmere for layering.", "Grade-A Cashmere", "Relaxed Fit", "Ribbed Cuffs"],
    ["Floral Print Maxi Skirt", "Anthropologie", 128, "Flowing maxi skirt with botanical print.", "Viscose Crepe", "Elastic Waist", "Fully Lined"],
    ["Structured Double-Breasted Blazer", "Zara", 119, "Sharp tailoring for power dressing.", "Polyester Blend", "Regular Fit", "Shoulder Pads"],
    ["Cropped Quarter-Zip Hoodie", "Lululemon", 108, "Athletic cropped hoodie for studio to street.", "Cotton Fleece", "Cropped Length", "Thumb Holes"],
  ],
  // Kids
  "sub-2-3": [
    ["Dinosaur Graphic Print Tee", "Carter's", 18, "Fun dinosaur tee for little adventurers.", "100% Cotton", "Ages 3-8", "Machine Washable"],
    ["Rainbow Stripe Leggings Set", "Primary", 28, "Colorful mix-and-match leggings pack.", "Cotton Spandex", "2-Pack", "Ages 2-10"],
    ["Denim Overall Jumpsuit", "OshKosh B'Gosh", 38, "Classic overalls with adjustable straps.", "Stretch Denim", "Snap Closures", "Ages 2-7"],
    ["Cozy Sherpa Fleece Hoodie", "The North Face Kids", 65, "Warm fleece hoodie for playground adventures.", "Sherpa Fleece", "Zip Front", "Ages 4-12"],
    ["School Uniform Polo 5-Pack", "French Toast", 45, "Everyday school polos in classic colors.", "Pique Cotton", "5-Pack", "Stain Resistant"],
    ["Adventure Cargo Jogger Pants", "Gap Kids", 35, "Durable cargo joggers with plenty of pockets.", "Cotton Twill", "Elastic Waist", "Ages 4-14"],
  ],
  // Footwear
  "sub-2-4": [
    ["Classic White Leather Sneakers", "Common Projects", 425, "Minimalist Italian-made leather sneakers.", "Full-Grain Leather", "Margom Sole", "Hand-Stitched"],
    ["Chelsea Boots Dark Brown", "Thursday Boot Co.", 199, "Handcrafted leather Chelsea boots.", "Chrome-Tanned Leather", "Studded Sole", "Goodyear Welt"],
    ["Ultraboost Running Shoes", "Adidas", 190, "Responsive boost cushioning for long runs.", "Primeknit Upper", "Boost Midsole", "Continental Rubber"],
    ["Casual Suede Slip-On Loafers", "Cole Haan", 150, "Effortless style with Grand.OS comfort.", "Premium Suede", "Grand.OS Tech", "Memory Foam"],
    ["Waterproof Hiking Trail Boots", "Merrell", 165, "All-terrain boots with Vibram outsole.", "Waterproof Leather", "Vibram Outsole", "Bellows Tongue"],
    ["Comfort Slide Sandals", "Birkenstock", 110, "Iconic cork footbed sandals.", "Natural Cork Footbed", "Suede Lining", "EVA Sole"],
  ],
  // Accessories
  "sub-2-5": [
    ["Leather Crossbody Messenger Bag", "Coach", 295, "Pebbled leather crossbody for daily essentials.", "Pebbled Leather", "Adjustable Strap", "Zip Closure"],
    ["Polarized Aviator Sunglasses", "Ray-Ban", 163, "Classic aviators with polarized lenses.", "Metal Frame", "Polarized Glass", "UV400 Protection"],
    ["Merino Wool Cable Knit Beanie", "Patagonia", 39, "Warm merino beanie for cold days.", "100% Merino Wool", "Cable Knit", "One Size"],
    ["Silk Print Neck Scarf", "Luxury Maison", 395, "Luxurious hand-rolled silk twill scarf.", "100% Silk Twill", "90cm x 90cm", "Hand-Rolled Edges"],
    ["Titanium Chronograph Watch", "Citizen", 350, "Eco-Drive chronograph with titanium case.", "Eco-Drive Solar", "Titanium Case", "100m Water Resist"],
    ["Reversible Canvas Stretch Belt", "Polo Ralph Lauren", 65, "Two-tone reversible belt for versatile styling.", "Cotton Canvas", "Reversible Buckle", "Stretch Weave"],
  ],

  // ── Home & Kitchen ─────────────────────────────────────────────
  // Furniture
  "sub-3-1": [
    ["Mid-Century Modern Sofa", "West Elm", 1599, "Classic mid-century design with plush cushions.", "Kiln-Dried Hardwood", "Down-Filled Cushions", "84\" Width"],
    ["Electric Standing Desk Pro", "Uplift", 699, "Height-adjustable desk with memory presets.", "Bamboo Desktop", "Dual Motor", "4 Memory Presets"],
    ["Industrial Bookshelf Tower", "IKEA", 249, "Five-tier open shelving with metal frame.", "Steel & Particleboard", "5 Shelves", "70\" Height"],
    ["Extendable Dining Table Set", "Article", 1199, "Solid oak table that seats 6-8 guests.", "Solid White Oak", "Extends to 86\"", "Seats 6-8"],
    ["Ergonomic Mesh Office Chair", "Herman Miller", 1395, "Award-winning Aeron chair for all-day comfort.", "8Z Pellicle Mesh", "PostureFit SL", "12-Year Warranty"],
    ["Walnut Nightstand Pair", "CB2", 498, "Matching bedside tables with soft-close drawers.", "Walnut Veneer", "2 Drawers", "Soft-Close"],
  ],
  // Cookware
  "sub-3-2": [
    ["Cast Iron Skillet Set", "Lodge", 79, "Pre-seasoned cast iron in two sizes.", "Pre-Seasoned Iron", "10\" & 12\" Skillets", "Oven Safe 500F"],
    ["Non-Stick Ceramic Pan Collection", "GreenPan", 149, "Toxin-free ceramic non-stick cookware.", "Thermolon Ceramic", "5-Piece Set", "PFAS Free"],
    ["Tri-Ply Stainless Steel Pot Set", "All-Clad", 599, "Professional-grade stainless steel cookware.", "Tri-Ply Bonded Steel", "10-Piece Set", "Dishwasher Safe"],
    ["Professional Chef Knife Block", "Wusthof", 399, "German-forged knives in acacia block.", "Precision Edge", "7-Piece Set", "Acacia Block"],
    ["Digital Pressure Cooker Pro", "Instant Pot", 119, "9-in-1 multi-cooker for fast family meals.", "6-Quart Capacity", "9 Functions", "Delayed Start"],
    ["Professional Baking Sheet Set", "Nordic Ware", 49, "Commercial-grade aluminum baking sheets.", "Aluminum", "3-Piece Set", "Warp Resistant"],
  ],
  // Bedding
  "sub-3-3": [
    ["Egyptian Cotton 800TC Sheet Set", "Brooklinen", 249, "Luxurious long-staple Egyptian cotton sheets.", "800 Thread Count", "Queen Size", "OEKO-TEX Certified"],
    ["Memory Foam Cooling Pillow Duo", "Casper", 139, "Dual-layer pillow that sleeps cool.", "Memory Foam Core", "Snow Technology", "Set of 2"],
    ["Weighted Comfort Blanket 15lb", "Gravity", 189, "Therapeutic weighted blanket for deep sleep.", "15 lbs Weight", "Glass Bead Fill", "Microfiber Cover"],
    ["All-Season Down Alternative Duvet", "Buffy", 159, "Cloud-soft duvet from recycled materials.", "Recycled Fill", "Queen/Full Size", "Hypoallergenic"],
    ["Bamboo Viscose Mattress Topper", "Tempur-Pedic", 299, "Temperature-regulating mattress topper.", "Bamboo Viscose Cover", "3\" Memory Foam", "Queen Size"],
    ["Pure Silk Pillowcase Set", "Slip", 89, "Mulberry silk pillowcases for hair and skin.", "22mm Mulberry Silk", "Set of 2", "Envelope Closure"],
  ],
  // Home Decor
  "sub-3-4": [
    ["Abstract Canvas Wall Art Trio", "Pottery Barn", 299, "Three-piece abstract art set for modern spaces.", "Gallery Canvas", "Set of 3", "Ready to Hang"],
    ["Handcrafted Ceramic Vase Collection", "West Elm", 89, "Artisan ceramic vases in earth tones.", "Stoneware Ceramic", "Set of 3", "Hand-Painted"],
    ["Warm White LED String Lights", "Twinkly", 49, "Smart LED lights with app control.", "100 LEDs", "33ft Length", "App Controlled"],
    ["Handwoven Jute Area Rug 8x10", "Rugs USA", 299, "Natural jute rug with braided pattern.", "100% Natural Jute", "8' x 10'", "Handwoven"],
    ["Velvet Decorative Throw Pillow Set", "Restoration Hardware", 128, "Plush velvet pillows with feather insert.", "Cotton Velvet", "20\" x 20\"", "Set of 2"],
    ["Marble and Gold Centerpiece Bowl", "CB2", 79, "Statement bowl in white marble with gold rim.", "Natural Marble", "12\" Diameter", "Gold Accent Rim"],
  ],
  // Storage
  "sub-3-5": [
    ["Custom Modular Closet System", "The Container Store", 599, "Configurable closet organizer system.", "Wood & Metal", "8' Width", "Adjustable Shelves"],
    ["Under-Bed Rolling Storage Bins", "Sterilite", 38, "Clear bins that slide under any bed.", "Clear Polypropylene", "Set of 4", "Rolling Wheels"],
    ["Floating Wall Shelf Set", "IKEA", 45, "Minimalist floating shelves in three sizes.", "MDF White Finish", "Set of 3", "Hidden Brackets"],
    ["Bamboo Kitchen Pantry Organizer", "mDesign", 65, "Stackable pantry bins in natural bamboo.", "Sustainable Bamboo", "Set of 6", "Stackable"],
    ["Felt Drawer Divider Set", "Marie Kondo", 29, "Customizable drawer organizer system.", "Premium Felt", "8-Piece Set", "Adjustable"],
    ["Tufted Storage Ottoman Bench", "SONGMICS", 119, "Stylish seating with hidden storage.", "Linen Upholstery", "100L Capacity", "Lid Hinge"],
  ],

  // ── Beauty & Personal Care ─────────────────────────────────────
  // Skincare
  "sub-4-1": [
    ["Vitamin C Brightening Serum", "SkinCeuticals", 169, "L-Ascorbic acid serum for radiant skin.", "15% Vitamin C", "1 fl oz", "Glass Dropper"],
    ["Retinol 0.5 Night Cream", "CeraVe", 24, "Gentle retinol for skin renewal overnight.", "Encapsulated Retinol", "1.7 oz", "Ceramide Complex"],
    ["Hyaluronic Acid Intense Moisturizer", "The Ordinary", 12, "Deep hydration with multiple HA weights.", "2% HA + B5", "1 fl oz", "Oil-Free"],
    ["Gentle Amino Acid Foaming Cleanser", "La Roche-Posay", 16, "Soap-free cleanser for sensitive skin.", "pH 5.5 Balanced", "6.7 fl oz", "Fragrance Free"],
    ["Invisible Shield SPF 50 Sunscreen", "Supergoop!", 38, "Weightless daily sunscreen with no white cast.", "SPF 50 PA++++", "1.7 fl oz", "Oil-Free Formula"],
    ["Peptide Firming Eye Contour Cream", "Drunk Elephant", 68, "Targets fine lines and dark circles.", "Peptide Complex", "0.5 fl oz", "Shea Butter"],
  ],
  // Haircare
  "sub-4-2": [
    ["Moroccan Argan Oil Shampoo", "Moroccanoil", 26, "Sulfate-free cleansing with argan oil.", "Argan Oil Infused", "8.5 fl oz", "Sulfate-Free"],
    ["Deep Repair Keratin Conditioner", "Olaplex", 30, "Bond-building conditioner for damaged hair.", "Bond Building", "8.5 fl oz", "No. 5 Formula"],
    ["Thermal Shield Heat Protectant Spray", "CHI", 16, "Silk-infused spray for heat styling protection.", "450F Protection", "6 fl oz", "Silk Proteins"],
    ["Curl Defining Hydro Cream", "DevaCurl", 28, "Moisturizing cream for defined, frizz-free curls.", "Coconut Oil", "5.1 fl oz", "No Silicones"],
    ["Scalp Revival Treatment Serum", "Briogeo", 42, "Soothing scalp treatment with tea tree.", "Tea Tree + Charcoal", "1 fl oz", "Vegan Formula"],
    ["Invisible Dry Shampoo Powder", "Batiste", 9, "Oil-absorbing dry shampoo for all hair types.", "Rice Starch Complex", "6.73 oz", "No Residue"],
  ],
  // Makeup
  "sub-4-3": [
    ["Velvet Matte Lipstick Collection", "Charlotte Tilbury", 34, "Long-wearing matte lipstick with hydrating core.", "Matte Finish", "3.5g", "Vitamin E Enriched"],
    ["Medium Coverage Skin Tint Foundation", "ILIA", 48, "Breathable skin tint with SPF 40.", "SPF 40 PA+++", "1 fl oz", "30 Shades"],
    ["Mega Volume Waterproof Mascara", "Maybelline", 12, "Dramatic volume that lasts all day.", "Waterproof Formula", "Mega Brush", "Buildable Volume"],
    ["Neutral Palette Eyeshadow Pro", "Urban Decay", 54, "12 blendable shades from matte to shimmer.", "12 Shades", "Naked Collection", "Vegan Formula"],
    ["All-Day Lock Setting Spray", "NYX Professional", 10, "Micro-fine mist to lock makeup for 16 hours.", "16-Hour Hold", "2.03 fl oz", "Matte Finish"],
    ["Cream Contour and Highlight Palette", "Fenty Beauty", 39, "Dual-ended stick for sculpt and glow.", "6 Shades", "Cream Formula", "Blendable"],
  ],
  // Fragrances
  "sub-4-4": [
    ["Midnight Oud Eau de Parfum", "Tom Ford", 185, "Rich oud wood fragrance with smoky depth.", "50ml EDP", "Oud & Rose", "8-Hour Longevity"],
    ["Citrus Burst Fresh Cologne", "Acqua di Gio", 95, "Refreshing marine citrus scent for everyday.", "100ml EDT", "Bergamot & Neroli", "Moderate Sillage"],
    ["Rose Petal Garden Eau de Parfum", "Jo Malone", 142, "Delicate rose scent with dewy green notes.", "50ml EDP", "Damask Rose", "Layerable"],
    ["Amber Woods Aftershave", "Creed", 165, "Sophisticated amber and sandalwood blend.", "75ml EDP", "Amber & Sandalwood", "Long-Lasting"],
    ["Sweet Vanilla Dream Body Mist", "Sol de Janeiro", 22, "Brazilian-inspired vanilla caramel body spray.", "240ml Mist", "Vanilla & Caramel", "Light Scent"],
    ["Ocean Breeze Sport Fragrance", "Versace", 68, "Energizing aquatic scent for active lifestyles.", "100ml EDT", "Sea Notes", "Fresh & Clean"],
  ],
  // Grooming
  "sub-4-5": [
    ["Precision Electric Trimmer Pro", "Philips Norelco", 79, "Multi-length trimmer for beard and body.", "23 Length Settings", "Self-Sharpening Blades", "Wet & Dry Use"],
    ["Classic Safety Razor Starter Kit", "Merkur", 49, "Chrome-plated safety razor with blades.", "Double-Edge Razor", "10 Platinum Blades", "Chrome Handle"],
    ["Organic Beard Oil Collection", "Honest Amish", 19, "Natural oils for a soft, healthy beard.", "Organic Avocado Oil", "2 fl oz", "6 Scent Options"],
    ["Stainless Grooming Scissors Set", "Tweezerman", 25, "Precision scissors for facial hair detail.", "Stainless Steel", "3-Piece Set", "Comfort Grip"],
    ["Sandalwood Luxury Shaving Cream", "Taylor of Old Bond Street", 18, "Rich lather cream for a close, smooth shave.", "Sandalwood Scent", "150g Tub", "Natural Ingredients"],
    ["Cooling Mint Aftershave Balm", "Nivea Men", 9, "Soothing post-shave balm with zero alcohol.", "Chamomile Extract", "3.3 fl oz", "Alcohol Free"],
  ],

  // ── Grocery ────────────────────────────────────────────────────
  // Snacks
  "sub-5-1": [
    ["Deluxe Mixed Nuts Variety Pack", "Kirkland", 24, "Premium roasted nuts in resealable pouches.", "6 Varieties", "2.5 lb Bag", "No Added Salt"],
    ["Organic Trail Mix Superfood Blend", "Nature's Path", 15, "Nutrient-rich trail mix with goji berries.", "Organic Certified", "12 oz Bag", "High Protein"],
    ["Belgian Dark Chocolate Assortment", "Godiva", 32, "Premium 72% dark chocolate collection.", "72% Cacao", "24 Pieces", "Gift Box"],
    ["Whey Protein Bar Box 12-Pack", "RXBAR", 30, "Clean-ingredient protein bars.", "12g Protein", "12-Count Box", "No Added Sugar"],
    ["Japanese Rice Cracker Collection", "Kameda", 12, "Assorted senbei rice crackers.", "Soy Sauce & Wasabi", "8 oz Bag", "Gluten-Free"],
    ["Sun-Dried Fruit Medley", "Made in Nature", 14, "Organic dried mangoes, pineapple, and berries.", "Organic Dried Fruit", "10 oz Bag", "No Sulfites"],
  ],
  // Beverages
  "sub-5-2": [
    ["Cold Brew Coffee Concentrate Pack", "Chameleon", 13, "Smooth, low-acid cold brew for diluting.", "32 fl oz", "Organic Arabica", "Low Acid"],
    ["Japanese Green Tea Collection", "Ito En", 18, "Premium matcha and sencha variety pack.", "20 Sachets", "Japanese Origin", "Antioxidant Rich"],
    ["Sparkling Mineral Water Variety", "San Pellegrino", 22, "Italian sparkling water in assorted flavors.", "24-Pack Cans", "Natural Minerals", "Zero Calories"],
    ["Fresh Pressed Orange Juice", "Tropicana", 8, "100% pure squeezed orange juice.", "52 fl oz", "No Pulp", "Vitamin C Rich"],
    ["Kombucha Probiotic Sampler", "GT's", 24, "Six flavors of raw organic kombucha.", "6-Pack Bottles", "Raw & Organic", "Live Cultures"],
    ["Herbal Wellness Tea Box", "Yogi", 10, "Caffeine-free herbal tea collection.", "6 Varieties", "48 Tea Bags", "Caffeine Free"],
  ],
  // Staples
  "sub-5-3": [
    ["Aged Basmati Rice Premium 10lb", "Royal", 16, "Extra-long grain aged basmati rice.", "10 lb Bag", "Extra Long Grain", "Aged 2 Years"],
    ["Extra Virgin Olive Oil Cold-Press", "California Olive Ranch", 14, "First cold-pressed California olive oil.", "500ml Bottle", "Cold Pressed", "Non-GMO"],
    ["Organic Whole Wheat Penne Pasta", "Barilla", 5, "Whole grain penne with high fiber.", "16 oz Box", "100% Whole Wheat", "High Fiber"],
    ["Unbleached All-Purpose Flour 5lb", "King Arthur", 7, "Premium unbleached flour for all baking.", "5 lb Bag", "No Bleach", "Non-GMO"],
    ["San Marzano Crushed Tomato Set", "Cento", 12, "Authentic Italian San Marzano tomatoes.", "28 oz Can x 3", "DOP Certified", "Imported Italy"],
    ["Organic Royal Quinoa Grain Bag", "Bob's Red Mill", 10, "Tri-color quinoa for salads and bowls.", "25 oz Bag", "Organic Tri-Color", "Complete Protein"],
  ],
  // Breakfast
  "sub-5-4": [
    ["Maple Pecan Granola Crunch", "Bear Naked", 8, "Crunchy clusters with real maple and pecans.", "12 oz Bag", "Non-GMO", "Whole Grain"],
    ["Steel-Cut Organic Oatmeal Pack", "Bob's Red Mill", 9, "Heart-healthy Irish-style steel-cut oats.", "24 oz Can", "Organic", "High Fiber"],
    ["Buttermilk Pancake and Waffle Mix", "Kodiak Cakes", 7, "Protein-packed whole grain pancake mix.", "20 oz Box", "14g Protein", "Whole Grain"],
    ["Grade A Dark Pure Maple Syrup", "Crown Maple", 18, "Estate-produced maple syrup from New York.", "12.7 fl oz", "Grade A Dark", "Single Origin"],
    ["Creamy Almond Butter Jar", "Justin's", 12, "Slow-roasted almonds blended to perfection.", "16 oz Jar", "Dry Roasted", "No Palm Oil"],
    ["French Fruit Preserve Set", "Bonne Maman", 22, "Four classic French preserves.", "4 x 13 oz Jars", "Natural Fruit", "Glass Jars"],
  ],
  // Organic
  "sub-5-5": [
    ["Raw Wildflower Honey Jar", "Bee & Flower", 16, "Unfiltered raw honey from wildflower meadows.", "22 oz Jar", "Raw & Unfiltered", "Single Source"],
    ["Pasture-Raised Organic Eggs 2-Dozen", "Vital Farms", 11, "Pasture-raised hen eggs with rich yolks.", "24 Eggs", "Pasture Raised", "Certified Humane"],
    ["Cold-Pressed Organic Coconut Oil", "Nutiva", 14, "Virgin coconut oil for cooking and body care.", "15 fl oz", "Cold Pressed", "USDA Organic"],
    ["Raw Organic Cacao Nibs", "Navitas", 12, "Superfood cacao nibs for smoothies and baking.", "8 oz Bag", "Raw & Organic", "Fair Trade"],
    ["Organic Apple Cider Vinegar Raw", "Bragg", 9, "Unpasteurized ACV with the mother.", "32 fl oz", "With The Mother", "USDA Organic"],
    ["Organic White Chia Seeds Bag", "Nutiva", 13, "Omega-3 rich chia seeds for pudding and baking.", "12 oz Bag", "Omega-3 Rich", "USDA Organic"],
  ],

  // ── Sports & Fitness ───────────────────────────────────────────
  // Gym Equipment
  "sub-6-1": [
    ["Adjustable Dumbbell Set 5-52lb", "Bowflex", 399, "SelectTech dial adjusts from 5 to 52.5 lbs.", "5-52.5 lbs Range", "Single Handle Dial", "Replaces 15 Pairs"],
    ["Olympic Barbell Power Rack", "Rogue Fitness", 799, "Heavy-duty steel squat rack with pull-up bar.", "11-Gauge Steel", "1000lb Capacity", "J-Cups Included"],
    ["Resistance Band Set with Door Anchor", "Fit Simplify", 25, "Five resistance levels for full-body workouts.", "5 Resistance Levels", "Door Anchor", "Carry Bag"],
    ["Mounted Pull-Up Bar Station", "Iron Gym", 35, "Doorway pull-up bar with multiple grips.", "No Screws Needed", "300lb Capacity", "Foam Grips"],
    ["Vinyl Coated Kettlebell Collection", "Amazon Basics", 89, "Set of three kettlebells for circuit training.", "15, 20, 25 lbs", "Vinyl Coating", "Wide Handle"],
    ["Heavy-Duty Battle Rope 40ft", "POWER GUIDANCE", 56, "1.5\" thick rope for cardio and strength.", "1.5\" Diameter", "40ft Length", "Poly Dacron"],
  ],
  // Outdoor Sports
  "sub-6-2": [
    ["4-Person Instant Setup Camping Tent", "Coleman", 199, "Sets up in 60 seconds with integrated poles.", "Instant Setup", "4-Person Capacity", "Weathertec System"],
    ["Lightweight Hiking Backpack 60L", "Osprey", 270, "Ventilated back panel for long trail days.", "60L Capacity", "Anti-Gravity Suspension", "Rain Cover"],
    ["Ultralight Parachute Hammock", "ENO", 65, "Compact hammock for camping and beach.", "400lb Capacity", "Packs to Softball Size", "Nautical Nylon"],
    ["Carbon Fiber Trekking Poles Pair", "Black Diamond", 149, "Lightweight and durable carbon construction.", "Carbon Fiber", "FlickLock Pro", "Foam Grip"],
    ["HD Waterproof Binoculars 10x42", "Nikon", 199, "Fog-proof and waterproof for all conditions.", "10x42 Magnification", "ED Glass Lenses", "Nitrogen Purged"],
    ["Telescopic Fishing Rod Combo", "Ugly Stik", 59, "Rod and reel combo for freshwater fishing.", "6'6\" Medium Action", "Spinning Reel", "Graphite/Glass Blend"],
  ],
  // Sportswear
  "sub-6-3": [
    ["Compression Training Tights Pro", "Under Armour", 55, "HeatGear fabric with muscle support.", "HeatGear Fabric", "Anti-Odor Tech", "4-Way Stretch"],
    ["Dri-FIT Moisture Wicking Tee", "Nike", 35, "Lightweight training tee that stays dry.", "Dri-FIT Tech", "Relaxed Fit", "Reflective Logo"],
    ["Flex Stride Running Shorts 7in", "Nike", 45, "Built-in liner with zippered pocket.", "Dri-FIT Flex", "7\" Inseam", "Brief Liner"],
    ["High Support Racerback Sports Bra", "Lululemon", 68, "Encapsulated cups for high-impact activity.", "Luxtreme Fabric", "High Support", "Moisture Wicking"],
    ["Lightweight Packable Windbreaker", "Patagonia", 99, "Stuffs into its own pocket for travel.", "Ripstop Nylon", "DWR Finish", "Packable"],
    ["Leather Palm Training Gloves", "Harbinger", 25, "Padded palm for weight training grip.", "Leather Palm", "Wrist Wrap", "Ventilated Back"],
  ],
  // Cycling
  "sub-6-4": [
    ["Aero Road Bike Helmet MIPS", "Giro", 150, "Wind-tunnel tested with MIPS protection.", "MIPS Safety System", "In-Mold Construction", "14 Vents"],
    ["Pro Team Cycling Jersey", "Rapha", 130, "Race-fit jersey with three rear pockets.", "Pro Team Fabric", "Full Zip", "3 Rear Pockets"],
    ["Heavy-Duty U-Lock with Cable", "Kryptonite", 65, "High-security lock with anti-theft protection.", "16mm Hardened Steel", "4ft Cable", "5/10 Security"],
    ["Rechargeable Handlebar Light Set", "Cygolite", 60, "Front and rear USB-rechargeable lights.", "800 Lumens Front", "USB Rechargeable", "6 Modes"],
    ["Gel Padded Cycling Shorts Bib", "Pearl Izumi", 90, "Chamois-padded bib shorts for long rides.", "3D Chamois Pad", "BioViz Reflective", "Transfer Fabric"],
    ["Portable Bike Repair Multi-Tool", "Crankbrothers", 35, "19-function multi-tool for roadside repairs.", "19 Functions", "Chain Breaker", "Compact Design"],
  ],
  // Yoga
  "sub-6-5": [
    ["Premium 6mm Natural Rubber Yoga Mat", "Manduka", 120, "Dense cushioning that won't compress.", "6mm Thickness", "Natural Rubber", "71\" Length"],
    ["Cork and Foam Yoga Block Set", "Gaiam", 22, "Supportive blocks for deeper stretches.", "Cork Surface", "Set of 2", "4\" x 6\" x 9\""],
    ["Buckwheat Hull Meditation Cushion", "Brentwood Home", 58, "Adjustable-fill zafu for seated meditation.", "Buckwheat Hulls", "Organic Cotton Cover", "Adjustable Height"],
    ["10ft Cotton Yoga Strap Duo", "Hugger Mugger", 16, "D-ring straps for flexibility and alignment.", "10ft Length", "Set of 2", "D-Ring Buckle"],
    ["Dharma Yoga Wheel Pro 13in", "UpCircleSeven", 45, "Back-bending wheel for deep stretch and balance.", "13\" Diameter", "500lb Capacity", "Cushion Padded"],
    ["Microfiber Non-Slip Yoga Towel", "Yogitoes", 40, "Silicone nubs grip mat during hot yoga.", "68\" x 24\"", "Silicone Grip Nubs", "Quick-Dry"],
  ],

  // ── Books ──────────────────────────────────────────────────────
  // Fiction
  "sub-7-1": [
    ["The Silent Echo", "Elena Voss", 16, "A haunting literary thriller set in 1940s Vienna.", "Hardcover", "384 Pages", "Bestseller"],
    ["Midnight in the Garden of Light", "James Chen", 14, "Magical realism meets Southern Gothic storytelling.", "Paperback", "298 Pages", "Award Nominee"],
    ["Beyond the Distant Horizon", "Sarah Mitchell", 18, "Epic sci-fi saga spanning three generations.", "Hardcover", "512 Pages", "Series Book 1"],
    ["The Last Handwritten Letter", "Priya Sharma", 13, "A love story told through letters across decades.", "Paperback", "276 Pages", "Book Club Pick"],
    ["Echoes of Tomorrow's Rain", "Marcus Webb", 15, "Time-bending mystery with unreliable narrators.", "Paperback", "342 Pages", "Indie Favorite"],
    ["River of Falling Stars", "Anika Patel", 17, "Multi-generational family saga set along the Ganges.", "Hardcover", "428 Pages", "Literary Fiction"],
  ],
  // Non-fiction
  "sub-7-2": [
    ["Thinking in Complex Systems", "Diana Rhodes", 22, "How system dynamics shape our world.", "Hardcover", "320 Pages", "Science Category"],
    ["The Art of Effortless Focus", "Leo Park", 16, "Practical strategies for deep concentration.", "Paperback", "224 Pages", "Productivity"],
    ["Sapiens An Illustrated History", "Yuval Noah Harari", 35, "Visual companion to the renowned bestseller.", "Hardcover Illustrated", "256 Pages", "Full Color"],
    ["Economics for Everyday People", "Maria Santos", 19, "Making economic theory accessible to all.", "Paperback", "288 Pages", "Economics"],
    ["The New Science of Sleep", "Dr. Ruth Chen", 18, "Research-backed guide to optimal sleep.", "Hardcover", "304 Pages", "Health & Science"],
    ["Journey Through Ancient Civilizations", "Prof. Ahmed Khan", 28, "Lavishly illustrated world history survey.", "Coffee Table Book", "432 Pages", "Full Color"],
  ],
  // Children
  "sub-7-3": [
    ["The Enchanted Magic Forest", "Lily Greenwood", 12, "A whimsical adventure in a talking forest.", "Hardcover Picture", "40 Pages", "Ages 3-7"],
    ["Adventures of Luna the Explorer", "Tom Rivera", 10, "Luna discovers wonders in her own backyard.", "Illustrated", "32 Pages", "Ages 4-8"],
    ["Dinosaur Discovery Expedition", "Dr. Fossil", 14, "Fun facts and stories about 50 dinosaur species.", "Hardcover", "96 Pages", "Ages 6-10"],
    ["Space Explorer Kid Mars Mission", "Zara Cosmos", 11, "An interactive choose-your-own-adventure in space.", "Paperback", "128 Pages", "Ages 8-12"],
    ["The Kind and Gentle Dragon", "Emma Frost", 13, "A story about kindness winning over fear.", "Hardcover Picture", "36 Pages", "Ages 3-6"],
    ["Ocean Friends Under the Sea", "Captain Blue", 10, "Colorful ocean animals teach teamwork.", "Board Book", "24 Pages", "Ages 1-4"],
  ],
  // Academic
  "sub-7-4": [
    ["Introduction to Algorithms 4th Ed", "Cormen et al.", 89, "The definitive guide to algorithm design.", "Hardcover Textbook", "1312 Pages", "MIT Press"],
    ["Modern Physics Comprehensive Guide", "Krane & Halliday", 75, "Undergraduate modern physics with problems.", "Textbook", "544 Pages", "Wiley Publishing"],
    ["Organic Chemistry Principles", "Clayden et al.", 82, "Mechanistic approach to organic chemistry.", "Textbook", "1264 Pages", "Oxford Press"],
    ["Data Structures and Algorithm Mastery", "Goodrich & Tamassia", 79, "Java-based data structures textbook.", "Hardcover", "718 Pages", "Wiley"],
    ["Linear Algebra Core Essentials", "Gilbert Strang", 65, "Intuitive approach from the MIT legend.", "Textbook", "584 Pages", "Cengage"],
    ["Psychology Mind and Behavior 101", "Nolen-Hoeksema", 55, "Introductory psychology with modern research.", "Textbook", "672 Pages", "McGraw-Hill"],
  ],
  // Self-help
  "sub-7-5": [
    ["Atomic Habits Illustrated Guide", "James Clear", 18, "Visual companion to building better habits.", "Paperback", "256 Pages", "#1 Bestseller"],
    ["The Power of Present Living", "Eckhart Tolle", 16, "Finding peace through present-moment awareness.", "Paperback", "236 Pages", "Spiritual"],
    ["Deep Work Rules for Focus", "Cal Newport", 17, "Strategies for focused success in a distracted world.", "Paperback", "304 Pages", "Productivity"],
    ["Mindset The Growth Revolution", "Dr. Carol Dweck", 16, "How your beliefs shape your potential.", "Paperback", "320 Pages", "Psychology"],
    ["The 5 AM Club Method", "Robin Sharma", 15, "Morning routine mastery for peak performance.", "Paperback", "336 Pages", "Leadership"],
    ["Emotional Intelligence 2.0 Workbook", "Bradberry & Greaves", 20, "Practical exercises for raising your EQ.", "Workbook", "272 Pages", "With Assessment"],
  ],

  // ── Toys & Games ───────────────────────────────────────────────
  // Action Figures
  "sub-8-1": [
    ["Superhero Legends Collection Set", "Marvel", 49, "Six articulated superheroes with accessories.", "6-Figure Set", "Fully Articulated", "Ages 4+"],
    ["Galaxy Space Warrior Figure 12in", "Hasbro", 25, "Highly detailed 12-inch action figure.", "12\" Scale", "20 Points Articulation", "Ages 4+"],
    ["Prehistoric Dinosaur Battle Pack", "Jurassic World", 35, "Five dinosaurs with battle-action features.", "5-Pack", "Moving Jaws", "Ages 3+"],
    ["Transforming Robot Warrior Deluxe", "Transformers", 45, "Converts from robot to vehicle in 18 steps.", "18-Step Transform", "Collector Grade", "Ages 6+"],
    ["Shadow Ninja Fighter Elite Set", "Bandai", 28, "Three ninja warriors with weapons.", "3-Figure Set", "Light-Up Weapons", "Ages 5+"],
    ["Medieval Knight and Castle Pack", "Playmobil", 55, "Castle playset with knight figures.", "Castle + 4 Knights", "Working Drawbridge", "Ages 4+"],
  ],
  // Board Games
  "sub-8-2": [
    ["Empires and Alliances Strategy Game", "Stonemaier", 65, "Deep strategy game for 2-5 players.", "2-5 Players", "90-120 min", "Ages 14+"],
    ["Mystery Detective Deduction Kit", "Ravensburger", 30, "Crime-solving deduction game.", "3-6 Players", "45-60 min", "Ages 10+"],
    ["Ultimate Trivia Challenge Pro", "Trivial Pursuit", 35, "2400 questions across six categories.", "2-6 Players", "30-90 min", "Ages 16+"],
    ["Classic Family Fun Night Bundle", "Hasbro", 42, "Four classic board games in one box.", "4-Game Bundle", "2-6 Players", "Ages 6+"],
    ["Fantasy Adventure Quest Board Game", "Fantasy Flight", 55, "Cooperative dungeon-crawling adventure.", "1-4 Players", "60-120 min", "Ages 12+"],
    ["Word Wizard Spelling Challenge", "Mattel", 22, "Fast-paced word-building competition.", "2-4 Players", "30 min", "Ages 8+"],
  ],
  // Puzzles
  "sub-8-3": [
    ["World Map 1000-Piece Panoramic Puzzle", "Ravensburger", 20, "Detailed world map panoramic jigsaw.", "1000 Pieces", "39\" x 14\"", "Premium Cardboard"],
    ["3D Crystal Dragon Puzzle", "BePuzzled", 15, "Build a 3D translucent dragon figure.", "56 Crystal Pieces", "3D Assembly", "Display Stand"],
    ["Wooden Brain Teaser Set of 9", "BSIRI", 25, "Nine wooden interlocking puzzles.", "9-Puzzle Set", "Natural Wood", "Difficulty: Medium"],
    ["Famous Landscapes Jigsaw Collection", "Buffalo Games", 28, "Four 500-piece iconic landscapes.", "4 x 500 Pieces", "Poster Included", "Ages 10+"],
    ["Metal Puzzle Ring Challenge Set", "Hanayama", 18, "Six cast metal brain teasers.", "6-Piece Set", "Difficulty 1-6", "Metal Cast"],
    ["Giant Sudoku and Logic Challenge Book", "NYT Games", 14, "200 puzzles from easy to fiendish.", "200 Puzzles", "Paperback", "All Difficulty"],
  ],
  // Educational Toys
  "sub-8-4": [
    ["STEM Engineering Building Kit 500pc", "LEGO Education", 65, "Build working machines and vehicles.", "500+ Pieces", "12 Projects", "Ages 8+"],
    ["My First Chemistry Lab Jr", "Thames & Kosmos", 45, "Safe experiments for young scientists.", "30 Experiments", "Lab Equipment", "Ages 8+"],
    ["Coding Robot Starter Kit", "Botley", 60, "Screen-free coding robot with remote.", "Coding Cards", "No Screen Needed", "Ages 5+"],
    ["Glow-in-Dark Solar System Model", "4M", 22, "Paint and hang your own solar system.", "9 Planets", "Glow Paint", "Ages 8+"],
    ["Student Microscope Explorer 1200x", "National Geographic", 50, "Microscope with prepared slides.", "1200x Magnification", "52-Piece Kit", "Ages 8+"],
    ["Math Fun Interactive Learning Kit", "Learning Resources", 28, "Hands-on math games and activities.", "100+ Activities", "Manipulatives", "Ages 5-9"],
  ],
  // Remote Control
  "sub-8-5": [
    ["RC Pro Racing Street Car 1-10", "Traxxas", 199, "High-speed RC car with 2.4GHz control.", "1:10 Scale", "30+ MPH", "2.4GHz Radio"],
    ["4K Camera Drone HD Quadcopter", "DJI Mini", 449, "Ultralight camera drone with GPS return.", "4K 30fps Camera", "31 min Flight", "GPS Return Home"],
    ["RC Monster Truck Rally Crawler", "ARRMA", 159, "4WD all-terrain monster truck.", "4WD Drive", "Waterproof Electronics", "2.4GHz"],
    ["Indoor RC Helicopter Flight Pro", "Blade", 89, "Stable indoor helicopter with 6-axis gyro.", "6-Axis Gyro", "LED Lights", "Auto Hover"],
    ["RC Speed Boat Racing Yacht", "Pro Boat", 179, "Self-righting RC boat for pool and lake.", "25+ MPH", "Self-Righting Hull", "Water Cooled"],
    ["RC Rock Crawler 4x4 Off-Road", "Axial", 249, "Scale rock crawler with realistic details.", "1:10 Scale", "4-Link Suspension", "Beadlock Wheels"],
  ],

  // ── Automotive ─────────────────────────────────────────────────
  // Car Accessories
  "sub-9-1": [
    ["4K Dual Dash Camera System", "Viofo", 169, "Front and rear 4K recording with GPS.", "4K Front + Rear", "GPS Logger", "Night Vision"],
    ["Magnetic Wireless Car Phone Mount", "iOttie", 35, "MagSafe-compatible wireless charging mount.", "15W Wireless Charge", "Magnetic Mount", "Air Vent Clip"],
    ["Memory Foam Car Seat Cushion", "Everlasting Comfort", 40, "Ergonomic gel-infused memory foam.", "Gel-Infused Foam", "Non-Slip Bottom", "Machine Washable"],
    ["Collapsible Trunk Organizer XL", "Drive Auto", 26, "Multi-compartment collapsible organizer.", "3 Compartments", "Collapsible Design", "Non-Slip Base"],
    ["Bamboo Charcoal Air Purifier Bag Set", "Moso Natural", 18, "Natural air freshener and deodorizer.", "Bamboo Charcoal", "4-Pack", "Lasts 2 Years"],
    ["LED Interior Ambient Light Strip Kit", "Govee", 24, "App-controlled multicolor LED interior kit.", "48 LEDs", "App Control", "Music Sync"],
  ],
  // Bike Accessories
  "sub-9-2": [
    ["DOT Approved Motorcycle Helmet Carbon", "Shoei", 549, "Premium carbon fiber full-face helmet.", "Carbon Fiber Shell", "DOT & ECE", "Pinlock Shield"],
    ["Vibration-Proof Bike Phone Holder", "Quad Lock", 40, "Secure mounting system for any phone.", "Dual Lock Mount", "Vibration Dampener", "360 Rotation"],
    ["Waterproof Leather Saddlebag Pair", "Viking Bags", 189, "Hard-shell waterproof motorcycle bags.", "Waterproof Hard Shell", "Quick Release", "58L Total"],
    ["Ergonomic Heated Handlebar Grips", "Oxford", 45, "Temperature-controlled heated grips.", "3 Heat Settings", "Universal Fit", "22mm Bars"],
    ["All-Weather Motorcycle Cover XL", "Dowco", 55, "UV and water-resistant bike cover.", "ClimaShield Plus", "Heat Shield Panel", "XXL Size"],
    ["Premium Chain Lube and Clean Kit", "Motul", 22, "Everything for a clean, lubed chain.", "Chain Lube 400ml", "Chain Clean 400ml", "Brush Tool"],
  ],
  // Tools
  "sub-9-3": [
    ["Metric Socket Wrench Set 150pc", "DEWALT", 149, "Chrome vanadium mechanics tool set.", "150-Piece Set", "72-Tooth Ratchets", "Hard Case"],
    ["Digital Smart Tire Pressure Gauge", "AstroAI", 12, "Backlit digital gauge with bleed valve.", "Digital LCD", "0-150 PSI", "Backlit Display"],
    ["Heavy-Duty Jumper Cable Kit 20ft", "Energizer", 35, "4-gauge copper cables with surge protection.", "4 Gauge Copper", "20ft Length", "Surge Protect"],
    ["Bluetooth OBD2 Diagnostic Scanner", "BlueDriver", 100, "Pro-grade vehicle diagnostics via app.", "Bluetooth OBD2", "Full Diagnostics", "iOS & Android App"],
    ["Cordless Impact Driver Kit 20V", "Milwaukee", 179, "Brushless impact driver with 2 batteries.", "20V Brushless", "2 Batteries", "1800 in-lbs"],
    ["Portable 12V Air Compressor", "Viair", 69, "Powerful portable inflator for tires.", "150 PSI Max", "12V DC Power", "Auto Shut-Off"],
  ],
  // Oils & Fluids
  "sub-9-4": [
    ["Full Synthetic 5W-30 Motor Oil 5qt", "Mobil 1", 28, "Extended performance full synthetic oil.", "5W-30 Weight", "5 Quart Jug", "Advanced Full Synthetic"],
    ["DOT 4 Brake Fluid Premium 32oz", "Castrol", 12, "High-performance brake fluid.", "DOT 4 Spec", "32 fl oz", "High Boiling Point"],
    ["50/50 Prediluted Antifreeze Coolant", "Prestone", 16, "Universal antifreeze for all vehicles.", "50/50 Prediluted", "1 Gallon", "All Vehicles"],
    ["Universal Power Steering Fluid", "Valvoline", 8, "Compatible with most power steering systems.", "12 fl oz", "Universal Fit", "Anti-Wear Formula"],
    ["Multi-Vehicle Automatic Transmission Fluid", "Castrol Transmax", 22, "Full synthetic ATF for smooth shifting.", "Full Synthetic", "1 Gallon", "Multi-Vehicle"],
    ["All-Season Windshield Washer Fluid", "Rain-X", 6, "De-icing washer fluid with Rain-X beading.", "1 Gallon", "De-Icing Formula", "-25F Rated"],
  ],
  // Safety
  "sub-9-5": [
    ["Premium Emergency Roadside Kit", "Lifeline", 65, "66-piece AAA-approved roadside kit.", "66 Pieces", "AAA Approved", "Carry Case"],
    ["Compact Vehicle First Aid Pack", "First Aid Only", 22, "125-piece auto first aid kit.", "125 Pieces", "Compact Case", "OSHA Compliant"],
    ["DOT Reflective Warning Triangle Set", "CARTMAN", 18, "Folding warning triangles with case.", "Set of 3", "DOT Approved", "Reflective"],
    ["Car-Rated Fire Extinguisher 2lb", "Kidde", 25, "Compact automotive fire extinguisher.", "2 lb Dry Chemical", "B:C Rated", "Mounting Bracket"],
    ["3-in-1 Emergency Escape Tool", "Resqme", 12, "Seatbelt cutter and window breaker.", "Seatbelt Cutter", "Window Breaker", "Keychain Size"],
    ["High-Visibility Road Safety Vest", "Salzmann", 15, "EN ISO 20471 certified reflective vest.", "Class 3 Certified", "360 Reflective", "One Size Fits All"],
  ],

  // ── Health ─────────────────────────────────────────────────────
  // Supplements
  "sub-10-1": [
    ["Complete Daily Multivitamin", "Nature Made", 18, "Essential vitamins and minerals for adults.", "22 Nutrients", "180 Tablets", "USP Verified"],
    ["Triple Strength Omega-3 Fish Oil", "Nordic Naturals", 32, "Concentrated EPA & DHA omega-3.", "1280mg Omega-3", "120 Softgels", "IFOS Certified"],
    ["High-Potency Vitamin D3 5000 IU", "NOW Foods", 12, "Supports immune and bone health.", "5000 IU per Cap", "240 Softgels", "Non-GMO"],
    ["Gold Standard Whey Protein Isolate", "Optimum Nutrition", 39, "Fast-absorbing whey for muscle recovery.", "24g Protein/Serving", "2 lb Tub", "5 Flavors"],
    ["Advanced Probiotic 50 Billion CFU", "Garden of Life", 35, "16-strain probiotic for gut health.", "50B CFU", "30 Capsules", "Shelf Stable"],
    ["Chelated Magnesium Citrate 400mg", "Doctor's Best", 14, "Highly absorbable magnesium supplement.", "400mg per Serving", "240 Tablets", "Chelated Form"],
  ],
  // Medical Devices
  "sub-10-2": [
    ["Bluetooth Blood Pressure Monitor", "Omron", 70, "Clinical-accuracy BP monitor with app sync.", "Bluetooth Sync", "Dual User Memory", "FDA Cleared"],
    ["Fingertip Pulse Oximeter Pro", "Zacurate", 25, "Measures SpO2 and pulse rate instantly.", "SpO2 & Pulse", "OLED Display", "6-way Display"],
    ["Instant Read Digital Thermometer", "Braun", 40, "Forehead thermometer with no-touch reading.", "No-Touch Infrared", "0.1F Accuracy", "Age Precision"],
    ["Portable Compressor Nebulizer", "PARI", 99, "Reliable nebulizer for respiratory treatment.", "Compressor Type", "Portable Design", "FDA Cleared"],
    ["Continuous Glucose Monitor Kit", "Dexcom", 299, "Real-time glucose readings sent to phone.", "10-Day Sensor", "Real-Time Alerts", "Phone Compatible"],
    ["Rechargeable Personal Hearing Amplifier", "Audien", 89, "Discreet amplifier for clearer conversations.", "Rechargeable", "Nearly Invisible", "3 Dome Sizes"],
  ],
  // Wellness
  "sub-10-3": [
    ["Ceramic Essential Oil Diffuser", "VITRUVI", 119, "Handcrafted ceramic ultrasonic diffuser.", "Ultrasonic Mist", "90ml Capacity", "Auto Shut-Off"],
    ["Percussive Massage Gun Pro", "Theragun", 299, "Professional-grade deep tissue massager.", "5 Speeds", "6 Attachments", "2h Battery Life"],
    ["Acupressure Recovery Mat and Pillow", "Nayoya", 30, "6210 pressure points for pain relief.", "6210 Points", "Mat + Pillow", "Linen & Cotton"],
    ["Adaptive Sleep Sound Machine", "Hatch", 70, "Smart alarm with sleep sounds and light.", "Sleep Sounds", "Sunrise Alarm", "App Controlled"],
    ["Soy Wax Aromatherapy Candle Set", "Brooklyn Candle", 48, "Hand-poured soy candles in three scents.", "3-Candle Set", "Soy Wax", "50h Burn Time"],
    ["Guided Breathwork Exercise Trainer", "Moonbird", 199, "Handheld device guiding breathing patterns.", "Biofeedback", "App Guided", "Rechargeable"],
  ],
  // Personal Safety
  "sub-10-4": [
    ["NIOSH N95 Respirator Mask 20-Pack", "3M", 25, "NIOSH-approved N95 particle respirator.", "N95 Rated", "20-Pack", "NIOSH Approved"],
    ["Hand Sanitizer Gel Collection", "Purell", 14, "Hospital-grade hand sanitizer variety.", "70% Ethanol", "3 x 8oz Bottles", "Moisturizing"],
    ["UV-C Light Sterilizer Box", "PhoneSoap", 80, "UV-C sanitizer for phones and accessories.", "UV-C Dual Bulbs", "10 min Cycle", "99.99% Kill Rate"],
    ["Personal Safety Alarm Keychain 140dB", "She's Birdie", 30, "Ear-piercing alarm with strobe light.", "140 dB Siren", "LED Strobe", "Keychain Design"],
    ["Nitrile Exam Glove Box 200ct", "Kimberly-Clark", 20, "Powder-free nitrile examination gloves.", "200 Gloves/Box", "Powder Free", "Latex Free"],
    ["ANSI Z87.1 Safety Goggles Pro", "DEWALT", 15, "Anti-fog splash-proof safety goggles.", "ANSI Z87.1", "Anti-Fog Coat", "Adjustable Strap"],
  ],
  // First Aid
  "sub-10-5": [
    ["All-Purpose First Aid Kit 299pc", "Johnson & Johnson", 30, "Comprehensive home and travel first aid.", "299 Pieces", "Hard Shell Case", "Family Size"],
    ["Adhesive Bandage Variety Pack 200ct", "Band-Aid", 12, "Assorted sizes for cuts and scrapes.", "200 Bandages", "Flexible Fabric", "Assorted Sizes"],
    ["Individually-Wrapped Antiseptic Wipes", "Dynarex", 10, "BZK antiseptic towelettes for wound care.", "100 Wipes", "Individually Wrapped", "BZK Formula"],
    ["Instant Cold Compress Pack 24ct", "Rapid Relief", 18, "Squeeze-activated instant cold packs.", "24-Pack", "No Refrigeration", "Single Use"],
    ["Burn Relief Gel with Aloe 4oz", "Water-Jel", 9, "Immediate cooling relief for minor burns.", "4 oz Tube", "Lidocaine + Aloe", "First Aid Grade"],
    ["Waterproof Medical Tape Roll Set", "Nexcare", 8, "Flexible tape that stays on in water.", "3 Rolls", "Waterproof", "Hypoallergenic"],
  ],
};

// Build flat product array from raw data
function buildProducts(): Product[] {
  const allProducts: Product[] = [];
  let idx = 1;

  for (const sub of subcategories) {
    const items = rawData[sub.id];
    if (!items) continue;
    const cat = getCategoryById(sub.categoryId);
    if (!cat) continue;

    for (const [name, brand, price, shortDesc, s1, s2, s3] of items) {
      const slug = slugify(name);
      allProducts.push({
        id: `p-${idx}`,
        slug,
        name,
        category: cat.name,
        categoryId: sub.categoryId,
        subcategoryId: sub.id,
        price,
        rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
        imageUrl: `https://picsum.photos/seed/${slug}/400/300`,
        shortDescription: shortDesc,
        description: `${shortDesc} Crafted with quality materials and designed for everyday use. ${name} by ${brand} delivers exceptional value and performance in the ${sub.name} category.`,
        specs: [s1, s2, s3],
        brand,
        stockStatus: idx % 15 === 0 ? "out-of-stock" : idx % 7 === 0 ? "low-stock" : "in-stock",
      });
      idx++;
    }
  }
  return allProducts;
}

export const products: Product[] = buildProducts();

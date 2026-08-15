export type Product = {
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  soldOut?: boolean;
  category: "fashion" | "electronics" | "accessories" | "home" | "beauty" | "furniture" | "realestate";
  images: string[];
  description: string;
  details: string[];
  sizes: string[];
  optionLabel?: string; // defaults to "Size"
};

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const products: Product[] = [
  // ── Fashion ─────────────────────────────────────────────
  {
    slug: "adeline-shirt",
    name: "Adeline Shirt",
    price: 62,
    compareAt: 72,
    category: "fashion",
    images: [u("photo-1521577352947-9bb58764b69a"), u("photo-1617019114583-affb34d1b3cd")],
    description:
      "A relaxed shirt cut from washed cotton poplin. Softly oversized with a curved hem and mother-of-pearl buttons — an everyday staple that works from desk to dinner.",
    details: ["100% washed cotton poplin", "Mother-of-pearl buttons", "Relaxed fit — size down for a closer fit", "Machine wash cold"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "mathilde-shirt",
    name: "Mathilde Shirt",
    price: 72,
    category: "fashion",
    images: [u("photo-1541101767792-f9b2b1c4f127"), u("photo-1512436991641-6745cdb1723f")],
    description:
      "Our signature boyfriend shirt in crisp white linen. Breathable, effortless and endlessly versatile — layer it or wear it on its own.",
    details: ["100% European flax linen", "Drop shoulder, curved hem", "Oversized fit", "Cool gentle wash"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "cecilie-shirt",
    name: "Cecilie Shirt",
    price: 65,
    compareAt: 75,
    soldOut: true,
    category: "fashion",
    images: [u("photo-1475180098004-ca77a66827be"), u("photo-1490725263030-1f0521cec8ec")],
    description:
      "A striped cotton shirt with a soft hand feel. Currently sold out — add it to your wishlist to be notified when it returns.",
    details: ["Yarn-dyed striped cotton", "Notched collar", "Relaxed fit", "Machine wash cold"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    slug: "solange-wrap-dress",
    name: "Solange Wrap Dress",
    price: 110,
    category: "fashion",
    images: [u("photo-1539008835657-9e8e9680c956"), u("photo-1596783074918-c84cb06531ca")],
    description:
      "A floor-skimming wrap dress in sky-blue crinkle chiffon. Cascading sleeves and a flattering tie waist — made to float through summer evenings.",
    details: ["Crinkle chiffon", "Floor length", "Adjustable wrap tie", "Cool hand wash"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    slug: "ophelia-slip-dress",
    name: "Ophelia Slip Dress",
    price: 88,
    category: "fashion",
    images: [u("photo-1515372039744-b8f02a3ae446"), u("photo-1539008835657-9e8e9680c956")],
    description:
      "A bias-cut slip dress in ivory satin with adjustable straps and a cowl neck. From brunch to the after-party.",
    details: ["Bias-cut satin", "Adjustable straps", "Midi length", "Cool hand wash"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    slug: "stride-sneakers",
    name: "Stride Sneakers",
    price: 95,
    category: "fashion",
    images: [u("photo-1491553895911-0055eca6402d"), u("photo-1560343090-f0409e92791a")],
    description:
      "Minimal low-profile sneakers in breathable knit with a cushioned sole. Featherlight comfort that goes with everything in your wardrobe.",
    details: ["Breathable knit upper", "Cushioned EVA sole", "True to size", "Spot clean"],
    sizes: ["38", "39", "40", "41", "42", "43"],
    optionLabel: "EU Size",
  },

  // ── Electronics ─────────────────────────────────────────
  {
    slug: "aria-wireless-headphones",
    name: "Aria Wireless Headphones",
    price: 129,
    compareAt: 149,
    category: "electronics",
    images: [u("photo-1583394838336-acd977736f90"), u("photo-1487215078519-e21cc028cb29")],
    description:
      "Over-ear wireless headphones with active noise cancellation, 40-hour battery life and plush memory-foam cushions. Sound that disappears into comfort.",
    details: ["Active noise cancellation", "40-hour battery, USB-C fast charge", "Bluetooth 5.3, multipoint pairing", "Foldable with travel case"],
    sizes: ["Charcoal", "Ivory"],
    optionLabel: "Color",
  },
  {
    slug: "pulse-smart-watch",
    name: "Pulse Smart Watch",
    price: 199,
    category: "electronics",
    images: [u("photo-1523275335684-37898b6baf30"), u("photo-1546868871-7041f2a55e12")],
    description:
      "A minimalist smart watch with heart-rate and sleep tracking, GPS and a week of battery. Health insights without the noise.",
    details: ["7-day battery life", "Heart rate, SpO2 & sleep tracking", "Built-in GPS, 5ATM water resistance", "Interchangeable quick-release straps"],
    sizes: ["Sand", "Black"],
    optionLabel: "Color",
  },
  {
    slug: "luna-true-wireless-earbuds",
    name: "Luna True Wireless Earbuds",
    price: 89,
    category: "electronics",
    images: [u("photo-1572569511254-d8f925fe2cbb"), u("photo-1511707171634-5f897ff02aa9")],
    description:
      "Feather-light earbuds with adaptive transparency, wireless charging and 30 hours of total playtime with the case.",
    details: ["Adaptive transparency mode", "30-hour total playtime", "Wireless charging case", "IPX4 sweat resistant"],
    sizes: ["Pearl White"],
    optionLabel: "Color",
  },
  {
    slug: "retro-instant-camera",
    name: "Retro Instant Camera",
    price: 119,
    compareAt: 139,
    category: "electronics",
    images: [u("photo-1526170375885-4d8ecf77b99f"), u("photo-1516035069371-29a1b244cc32")],
    description:
      "A modern instant camera with a nostalgic soul. Point, shoot, and watch the moment develop in your hands — double exposure and self-timer included.",
    details: ["Instant prints in 90 seconds", "Double exposure & self-timer modes", "Rechargeable battery, USB-C", "Uses standard instant film"],
    sizes: ["Classic White"],
    optionLabel: "Style",
  },

  // ── Accessories ─────────────────────────────────────────
  {
    slug: "voyager-backpack",
    name: "Voyager Backpack",
    price: 85,
    category: "accessories",
    images: [u("photo-1553062407-98eeb64c6a62"), u("photo-1496181133206-80ce9b88a853")],
    description:
      "A structured everyday backpack in water-resistant canvas with a padded 15\" laptop sleeve, hidden pockets and a luggage pass-through.",
    details: ["Water-resistant waxed canvas", "Padded 15\" laptop sleeve", "Luggage pass-through strap", "YKK zippers"],
    sizes: ["Navy", "Sand"],
    optionLabel: "Color",
  },
  {
    slug: "heritage-leather-bag",
    name: "Heritage Leather Bag",
    price: 145,
    category: "accessories",
    images: [u("photo-1590874103328-eac38a683ce7"), u("photo-1445205170230-053b83016050")],
    description:
      "A structured top-handle bag in vegetable-tanned leather that deepens beautifully with age. Handmade by our partner atelier in small batches.",
    details: ["Vegetable-tanned full-grain leather", "Cotton twill lining", "Detachable shoulder strap", "Brass hardware"],
    sizes: ["Tan"],
    optionLabel: "Color",
  },
  {
    slug: "meridian-watch",
    name: "Meridian Watch",
    price: 149,
    compareAt: 179,
    category: "accessories",
    images: [u("photo-1524805444758-089113d48a6d"), u("photo-1523170335258-f5ed11844a49")],
    description:
      "A minimalist analog watch with a brushed steel case, sapphire-coated glass and a quick-release leather strap. Quietly precise.",
    details: ["Japanese quartz movement", "Sapphire-coated mineral glass", "Quick-release genuine leather strap", "5ATM water resistance"],
    sizes: ["Taupe Leather", "Black Leather"],
    optionLabel: "Strap",
  },
  {
    slug: "atlas-sunglasses",
    name: "Atlas Sunglasses",
    price: 75,
    category: "accessories",
    images: [u("photo-1511499767150-a48a237f0083"), u("photo-1572635196237-14b3f281503f")],
    description:
      "Hand-finished acetate sunglasses with polarized lenses and 100% UV protection. A timeless silhouette that flatters every face.",
    details: ["Polarized CR-39 lenses", "100% UVA/UVB protection", "Hand-polished acetate frame", "Includes hard case & cloth"],
    sizes: ["Gold / Green", "Matte Black"],
    optionLabel: "Style",
  },

  // ── Home & Living ───────────────────────────────────────
  {
    slug: "haven-ceramic-vases",
    name: "Haven Ceramic Vase Set",
    price: 45,
    category: "home",
    images: [u("photo-1584589167171-541ce45f1eea"), u("photo-1616486338812-3dadae4b4ace")],
    description:
      "Hand-thrown ceramic vases in warm wood tones. Sculptural enough to stand alone, beautiful with a single stem.",
    details: ["Hand-thrown stoneware", "Watertight glazed interior", "Each piece slightly unique", "Wipe clean"],
    sizes: ["Set of 2", "Set of 3"],
    optionLabel: "Set",
  },
  {
    slug: "ember-scented-candle",
    name: "Ember Scented Candle",
    price: 32,
    category: "home",
    images: [u("photo-1602874801007-bd458bb1b8b6"), u("photo-1513519245088-0e12902e5a38")],
    description:
      "A hand-poured soy candle with 55 hours of burn time. Warm amber, smoked oud and a whisper of vanilla — like winter light in a jar.",
    details: ["100% soy wax, cotton wick", "55-hour burn time", "Hand-poured in small batches", "Reusable glass vessel"],
    sizes: ["Amber & Oud", "Fig & Cedar", "Sea Salt"],
    optionLabel: "Scent",
  },
  {
    slug: "oslo-lounge-chair",
    name: "Oslo Lounge Chair",
    price: 349,
    compareAt: 399,
    category: "furniture",
    images: [u("photo-1586023492125-27b2c045efd7"), u("photo-1616486338812-3dadae4b4ace")],
    description:
      "A mid-century inspired lounge chair with solid oak legs and deep cushioning. The chair every reading corner deserves.",
    details: ["Solid oak frame & legs", "High-resilience foam cushioning", "Stain-resistant upholstery", "Assembly in under 10 minutes"],
    sizes: ["Mustard", "Stone"],
    optionLabel: "Fabric",
  },
  {
    slug: "sana-linen-throw",
    name: "Sana Linen Throw",
    price: 59,
    category: "home",
    images: [u("photo-1578500494198-246f612d3b3d"), u("photo-1493663284031-b7e3aefcae8e")],
    description:
      "A stonewashed linen throw that gets softer with every wash. Generously sized for sofas, beds and slow Sunday mornings.",
    details: ["100% stonewashed European linen", "130 × 170 cm", "Pre-washed, no shrinkage", "Machine wash cold"],
    sizes: ["Natural", "Sage"],
    optionLabel: "Color",
  },

  // ── Beauty ──────────────────────────────────────────────
  {
    slug: "velvet-makeup-set",
    name: "Velvet Makeup Set",
    price: 54,
    category: "beauty",
    images: [u("photo-1596462502278-27bfdc403348"), u("photo-1512496015851-a90fb38ba796")],
    description:
      "A curated eight-piece makeup set in warm rose tones — everything you need for an effortless everyday look, in one linen pouch.",
    details: ["8-piece curated set", "Cruelty-free & paraben-free", "Warm rose tone palette", "Linen travel pouch included"],
    sizes: ["Full Set"],
    optionLabel: "Set",
  },
  {
    slug: "glow-skincare-ritual",
    name: "Glow Skincare Ritual",
    price: 68,
    category: "beauty",
    images: [u("photo-1570172619644-dfd03ed5d881"), u("photo-1522338242992-e1a54906a8da")],
    description:
      "A three-step ritual of cleanser, vitamin-C serum and moisturizer. Clean formulas, visible glow — morning or evening.",
    details: ["3-step routine: cleanse, treat, seal", "Vitamin C & hyaluronic acid", "Fragrance-free, dermatologist tested", "Suitable for sensitive skin"],
    sizes: ["Morning", "Evening"],
    optionLabel: "Ritual",
  },
  // ── Furniture ───────────────────────────────────────────
  {
    slug: "marlow-velvet-sofa",
    name: "Marlow Velvet Sofa",
    price: 899,
    compareAt: 999,
    category: "furniture",
    images: [u("photo-1555041469-a586c61ea9bc"), u("photo-1550254478-ead40cc54513")],
    description:
      "A three-seat sofa in deep emerald velvet with a solid beech frame and feather-wrapped cushions. Built to be the room's quiet centrepiece for decades.",
    details: ["Kiln-dried beech frame", "Feather-wrapped seat cushions", "Stain-treated cotton velvet", "10-year frame warranty"],
    sizes: ["Emerald", "Slate"],
    optionLabel: "Fabric",
  },
  {
    slug: "hudson-leather-sofa",
    name: "Hudson Leather Sofa",
    price: 1149,
    category: "furniture",
    images: [u("photo-1540574163026-643ea20ade25"), u("photo-1538688525198-9b88f6f53126")],
    description:
      "A tan leather three-seater in full-grain aniline hide that softens and deepens with every year. Mid-century lines, modern comfort.",
    details: ["Full-grain aniline leather", "Solid oak legs", "High-resilience foam core", "Ages beautifully with use"],
    sizes: ["Tan", "Espresso"],
    optionLabel: "Leather",
  },
  {
    slug: "linden-dining-set",
    name: "Linden Dining Set",
    price: 649,
    category: "furniture",
    images: [u("photo-1533090481720-856c6e3c1fdc"), u("photo-1519710164239-da123dc03ef4")],
    description:
      "A round white dining table with four sculpted chairs. Light, bright and endlessly easy to live with — seats four comfortably.",
    details: ["Table + 4 chairs included", "Powder-coated steel & beech", "Seats 4", "Tool-free assembly"],
    sizes: ["Table + 4 Chairs", "Table Only"],
    optionLabel: "Set",
  },
  {
    slug: "cloud-upholstered-bed",
    name: "Cloud Upholstered Bed",
    price: 1199,
    compareAt: 1349,
    category: "furniture",
    images: [u("photo-1505693416388-ac5ce068fe85"), u("photo-1600607687939-ce8a6c25118c")],
    description:
      "A gently tufted upholstered bed frame with a tall cushioned headboard made for late-morning reading. Fits a standard queen mattress.",
    details: ["Tufted cushioned headboard", "Solid pine slat base", "Queen size (160 × 200 cm)", "Assembly in 30 minutes"],
    sizes: ["Oat", "Charcoal"],
    optionLabel: "Fabric",
  },
  {
    slug: "wren-accent-chair",
    name: "Wren Accent Chair",
    price: 229,
    category: "furniture",
    images: [u("photo-1567538096630-e0c55bd6374c"), u("photo-1592078615290-033ee584e267")],
    description:
      "A sculptural accent chair with a turned-leg silhouette. Small enough for a corner, striking enough to hold it.",
    details: ["Kiln-dried hardwood frame", "Hand-turned legs", "Compact footprint", "Spot clean"],
    sizes: ["Ivory", "Black"],
    optionLabel: "Color",
  },

  // ── Real Estate ─────────────────────────────────────────
  {
    slug: "palm-villa",
    name: "The Palm Villa",
    price: 925000,
    category: "realestate",
    images: [u("photo-1564013799919-ab600027ffc6"), u("photo-1600596542815-ffad4c1539a9")],
    description:
      "A colonial-style villa wrapped in verandas, with a private pool and mature palms. Five minutes from the coast, a world away from everything else.",
    details: ["4 bed · 3 bath · 320 m²", "Private pool & landscaped garden", "Double veranda, ocean breeze", "Freehold title"],
    sizes: ["4 Bed · 3 Bath"],
    optionLabel: "Layout",
  },
  {
    slug: "vista-modern-residence",
    name: "Vista Modern Residence",
    price: 780000,
    category: "realestate",
    images: [u("photo-1512917774080-9991f1c4c750"), u("photo-1613490493576-7fde63acd811")],
    description:
      "A flat-roofed modern residence in white concrete and glass, with an infinity-edge pool and open-plan living flooded with light.",
    details: ["3 bed · 3 bath · 280 m²", "Infinity-edge pool", "Floor-to-ceiling glazing", "Smart-home ready"],
    sizes: ["3 Bed · 3 Bath"],
    optionLabel: "Layout",
  },
  {
    slug: "aspen-chalet",
    name: "Aspen Chalet",
    price: 610000,
    category: "realestate",
    images: [u("photo-1568605114967-8130f3a36994"), u("photo-1600566753086-00f18fb6b3ea")],
    description:
      "A timber chalet glowing at dusk, with a steep gabled roof, stone chimney and forest at the doorstep. Winters were made for this.",
    details: ["3 bed · 2 bath · 210 m²", "Stone fireplace & sauna", "Forest-edge plot, 1,400 m²", "Year-round road access"],
    sizes: ["3 Bed · 2 Bath"],
    optionLabel: "Layout",
  },
  {
    slug: "willow-farmhouse",
    name: "Willow Farmhouse",
    price: 465000,
    compareAt: 495000,
    category: "realestate",
    images: [u("photo-1570129477492-45c003edd2be"), u("photo-1580587771525-78b9dba3b914")],
    description:
      "A classic wraparound-porch farmhouse on a wide green lawn. Renovated throughout, with the original oak floors lovingly kept.",
    details: ["4 bed · 2.5 bath · 260 m²", "Wraparound porch", "Original oak floors, new roof", "0.5-acre lawn & orchard"],
    sizes: ["4 Bed · 2.5 Bath"],
    optionLabel: "Layout",
  },

  // ── More Electronics & Accessories ──────────────────────
  {
    slug: "lumen-pro-phone",
    name: "Lumen Pro Phone",
    price: 899,
    category: "electronics",
    images: [u("photo-1574944985070-8f3ebc6b79d2"), u("photo-1511707171634-5f897ff02aa9")],
    description:
      "A flagship phone with a triple-lens pro camera system, all-day battery and a display calibrated for real color. Photography first.",
    details: ["Triple-lens 48MP camera system", "6.1\" calibrated OLED display", "All-day battery, 30W fast charge", "5 years of software updates"],
    sizes: ["128 GB", "256 GB", "512 GB"],
    optionLabel: "Storage",
  },
  {
    slug: "edge-studio-speaker",
    name: "Edge Studio Speaker",
    price: 159,
    category: "electronics",
    images: [u("photo-1545454675-3531b543be5d"), u("photo-1516035069371-29a1b244cc32")],
    description:
      "A compact bookshelf speaker with warm, room-filling sound and a walnut veneer cabinet. Wired or Bluetooth — your records won't mind.",
    details: ["4\" woofer + silk dome tweeter", "Bluetooth 5.0 & RCA input", "Walnut veneer cabinet", "Sold as a pair"],
    sizes: ["Walnut Pair"],
    optionLabel: "Finish",
  },
  {
    slug: "ivy-classic-watch",
    name: "Ivy Classic Watch",
    price: 119,
    category: "accessories",
    images: [u("photo-1524592094714-0f0654e20314"), u("photo-1523170335258-f5ed11844a49")],
    description:
      "A clean white-dial watch on a soft taupe leather strap. The one you reach for when you don't want to think about it.",
    details: ["Japanese quartz movement", "Hardened mineral glass", "Genuine leather strap", "3ATM water resistance"],
    sizes: ["Taupe", "Black"],
    optionLabel: "Strap",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatPrice = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const categories = [
  { key: "all", label: "All" },
  { key: "fashion", label: "Fashion" },
  { key: "electronics", label: "Electronics" },
  { key: "accessories", label: "Accessories" },
  { key: "home", label: "Home & Living" },
  { key: "furniture", label: "Furniture" },
  { key: "realestate", label: "Real Estate" },
  { key: "beauty", label: "Beauty" },
] as const;

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "quiet-tech",
    title: "Quiet Tech: Gadgets That Earn Their Place",
    date: "August 2, 2026",
    excerpt:
      "Good technology should disappear into your day. Here's how we choose the electronics we carry.",
    image: u("photo-1588058365548-9efe5acb8077", 1200),
    body: [
      "Most gadgets shout. The ones we stock are chosen because they whisper — long battery lives, materials that feel good in the hand, and designs that sit comfortably next to linen and ceramic rather than fighting them.",
      "The Aria headphones and Pulse watch both follow the same rule: a week of use without thinking about a charger, and nothing on the surface you don't need.",
      "Every electronic we sell ships with a two-year warranty and free returns within 30 days.",
    ],
  },
  {
    slug: "caring-for-linen",
    title: "Caring for Linen, So It Lasts a Lifetime",
    date: "July 18, 2026",
    excerpt:
      "Linen gets softer with every wash — if you treat it right. Our care ritual in four simple steps.",
    image: u("photo-1512436991641-6745cdb1723f", 1200),
    body: [
      "Linen is one of the oldest textiles in the world, and one of the most forgiving — it gets softer and more beautiful with every wash, provided you follow a few simple rules.",
      "Wash cool, never hot. Skip the dryer when you can and let it line-dry in shade. Embrace the wrinkles; they are the point.",
      "From the Mathilde shirt to the Sana throw, every Luxe linen piece is cut from European flax, pre-washed so the fit you buy is the fit you keep.",
    ],
  },
  {
    slug: "the-art-of-slow-evenings",
    title: "The Art of Slow Evenings",
    date: "June 30, 2026",
    excerpt:
      "A candle, a throw, and a chair worth sinking into — building a corner of your home that asks you to stay.",
    image: u("photo-1513519245088-0e12902e5a38", 1200),
    body: [
      "The best rooms have one corner that does nothing productive at all. A chair angled toward the window. A throw within reach. Light that flickers instead of glares.",
      "We designed the Ember candle, Sana throw and Oslo chair as a set of instruments for exactly this — the hour of the day that belongs to no one but you.",
      "Start small: light the candle before you sit down, not after. The ritual is the point.",
    ],
  },
];

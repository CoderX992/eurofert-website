// Product data structure - MAXIGROW Product Lines
const productData = {
  maxigrowNPK: {
    name: "MAXIGROW NPK",
    fullName: "MAXIGROW NPK – Water-Soluble Fertilizer Line",
    description:
      "Complete water-soluble NPK fertilizers designed for precise nutrient delivery through irrigation systems and foliar application. Perfect for modern farming.",
    products: [],
  },
  maxigrowFoliar: {
    name: "MAXIGROW Foliar",
    fullName: "MAXIGROW Foliar – Foliar Water Soluble Fertilizers",
    description:
      "Specialized foliar fertilizers formulated for rapid nutrient absorption through plant leaves. Delivers immediate growth response and enhanced crop vitality.",
    products: [],
  },
  maxigrowPower: {
    name: "MAXIGROW Power",
    fullName: "MAXIGROW Power – Paste Line",
    description:
      "High-concentration paste fertilizers offering maximum nutrient density for efficient application and storage. Ideal for professional growers seeking powerful results.",
    products: [],
  },
  maxigrowTrace: {
    name: "MAXIGROW Trace",
    fullName: "MAXIGROW Trace – Trace Elements Line",
    description:
      "Essential micronutrient solutions providing critical trace elements for optimal plant health and development. Prevents deficiencies and promotes balanced growth.",
    products: [],
  },
  maxigrowEssentials: {
    name: "MAXIGROW Essentials",
    fullName: "MAXIGROW Essentials – Essential Minerals Liquid Fertilizer Line",
    description:
      "Liquid fertilizers enriched with essential minerals for comprehensive plant nutrition and soil health. Easy to apply with proven effectiveness across all crops.",
    products: [],
  },
  maxigrowSpecialty: {
    name: "MAXIGROW Specialty",
    fullName: "MAXIGROW Specialty – Specialty Liquid Line",
    description:
      "Premium specialty liquids formulated for specific crop needs and growth stages requiring targeted nutrition. Customized solutions for maximum yield potential.",
    products: [],
  },
  maxigrowTerra: {
    name: "MAXIGROW Terra",
    fullName: "MAXIGROW Terra – Soil Conditioner Line",
    description:
      "Advanced soil conditioners designed to improve soil structure, enhance nutrient availability, and promote healthy root systems. Long-lasting benefits for sustainable agriculture.",
    products: [],
  },
};

// Available brands
const brands = [
  "Eurostallion",
  "Maxigrow",
  "Shark",
  "Eagle",
  "Seagull",
  "Swan",
];

// Available packaging options
const packaging = ["25 Kg", "10 Kg", "1 Kg"];

// Available fertilizer formulas (N-P-K format)
const formulas = [
  "7-7-42",
  "30-10-10",
  "10-50-10",
  "20-20-20",
  "12-12-36",
  "18-18-18",
  "13-40-13",
  "17-10-27",
  "5-5-45",
  "5-5-42",
  "12-48-6",
  "18-9-27",
  "15-5-35",
  "15-5-30",
  "16-8-24+2MgO",
  "15-15-15",
  "6-6-43",
  "15-30-15",
  "14-25-13+3MgO+1.8Zn",
];

// Product descriptions templates
const descriptionTemplates = [
  "A premium fertilizer blend specifically formulated to enhance plant growth and maximize crop yields. This advanced formula provides balanced nutrition for optimal plant development.",
  "Scientifically developed to deliver essential nutrients efficiently to plants. Features a unique composition that promotes healthy root development and vigorous growth.",
  "An innovative fertilizer solution designed for modern agriculture. Provides sustained nutrient release for consistent plant performance throughout the growing season.",
  "Professional-grade fertilizer engineered for superior crop production. Contains carefully balanced nutrients to support all stages of plant growth and development.",
  "High-performance fertilizer formulated with precision to meet the demanding needs of commercial agriculture. Ensures optimal nutrient uptake and utilization.",
  "Advanced nutrient solution designed to maximize agricultural productivity. Features enhanced bioavailability for improved plant response and yield potential.",
  "Specially formulated fertilizer blend that combines traditional agricultural wisdom with modern scientific innovation. Promotes sustainable crop production.",
  "Premium quality fertilizer developed through extensive research and field testing. Provides reliable nutrition for consistent crop performance and quality.",
  "Cutting-edge fertilizer technology designed to optimize plant nutrition and growth. Features improved nutrient efficiency and environmental compatibility.",
  "Professional fertilizer solution engineered for maximum effectiveness. Delivers balanced nutrition to support healthy plant development and high yields.",
];

// Generate random product data (8 products per category)
function generateProducts() {
  Object.keys(productData).forEach((category) => {
    for (let i = 1; i <= 8; i++) {
      const product = {
        id: `${category}-${i}`,
        name: `${productData[category].name} ${i.toString().padStart(2, "0")}`,
        category: category,
        formula: formulas[Math.floor(Math.random() * formulas.length)],
        brands: getRandomBrands(),
        packaging: [...packaging],
        description:
          descriptionTemplates[
            Math.floor(Math.random() * descriptionTemplates.length)
          ],
        image: generateProductImage(category, i),
      };
      productData[category].products.push(product);
    }
  });
}

// Get random brands (2 brands per product)
function getRandomBrands() {
  const shuffled = [...brands].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
}

// Generate product image URL (placeholder)
function generateProductImage(category, index) {
  // Using provided product images
  const productImages = [
    "public/product1-placeholder.png",
    "public/product2-placeholder.png",
    "public/product3-placeholder.png",
    "public/product4-placeholder.png",
  ];
  return productImages[(index - 1) % productImages.length];
}

// Helper functions for product detail page
function getRandomFormula() {
  return formulas[Math.floor(Math.random() * formulas.length)];
}

function getRandomDescription() {
  return descriptionTemplates[
    Math.floor(Math.random() * descriptionTemplates.length)
  ];
}

// Export functions for global access
window.productData = productData;
window.generateProducts = generateProducts;
window.getRandomBrands = getRandomBrands;
window.generateProductImage = generateProductImage;
window.getRandomFormula = getRandomFormula;
window.getRandomDescription = getRandomDescription;

// Initialize product data immediately (not waiting for DOM)
generateProducts();
console.log("Product data initialized with", Object.keys(productData).length, "categories");

import gold from '../assets/gold.jpg'
import engagment from '../assets/engagment.jpg'
import silver from '../assets/silver.webp'
import rosegold from '../assets/rosegold.jpg'

// new arival jewelery data

export const products = [
  {
    id: 1,
    category: "Necklaces",
    title: "18K Gold Pearl Necklace",
    description:
      "A timeless handcrafted 18K gold necklace featuring pure freshwater pearls. Perfect for elegant occasions and daily wear.",
    price: 12000,
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1596464716121-9fef8c7f4f93?auto=format&fit=crop&w=600&q=80",
    ],
    materials: ["18K Gold", "Freshwater Pearl"],
    sale: 15,
    additionalDescription:
      "Each necklace is crafted with precision and care, ensuring long-lasting shine and durability.",
    reviews: [
      { name: "Sara Rahman", rating: 5, comment: "Absolutely stunning piece! Looks even better in person." },
      { name: "Ayesha Khan", rating: 4, comment: "Good quality but delivery took a bit longer than expected." },
    ],
  },
  {
    id: 2,
    category: "Rings",
    title: "Sterling Silver Sapphire Ring",
    description:
      "A sophisticated silver ring featuring a deep blue sapphire centerpiece. A perfect gift for anniversaries or engagements.",
    price: 8900,
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1600181951762-3c6dcb490b03?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581092588429-4c4df4b4a2b9?auto=format&fit=crop&w=600&q=80",
    ],
    materials: ["Sterling Silver", "Sapphire Stone"],
    sale: 10,
    additionalDescription:
      "Designed for comfort and class. Perfectly balanced for everyday elegance.",
    reviews: [
      { name: "Lamia Hasan", rating: 5, comment: "The sapphire sparkles beautifully! Totally worth the price." },
    ],
  },
  {
    id: 3,
    category: "Bracelets",
    title: "Rose Gold Charm Bracelet",
    description:
      "A charming rose gold bracelet featuring delicate pendants and minimalistic design. Ideal for gifting.",
    price: 7600,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1600189756799-9a23e4c0ed75?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581093588401-602bc7d04b1b?auto=format&fit=crop&w=600&q=80",
    ],
    materials: ["Rose Gold", "Zircon"],
    sale: 5,
    additionalDescription:
      "An elegant and modern piece designed to add a subtle shine to your outfit.",
    reviews: [
      { name: "Nabila Akter", rating: 5, comment: "Lovely bracelet — lightweight and shiny!" },
      { name: "Taslima Begum", rating: 4, comment: "Very elegant but the clasp could be stronger." },
    ],
  },
  {
    id: 4,
    category: "Earrings",
    title: "Diamond Drop Earrings",
    description:
      "Beautifully crafted diamond earrings set in white gold. Brilliance that elevates your style instantly.",
    price: 15500,
    stock: 10,
    images: [
      "https://images.unsplash.com/photo-1591088477180-d2c1a3c7f9cf?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1591088536599-602cf2a3df1a?auto=format&fit=crop&w=600&q=80",
    ],
    materials: ["White Gold", "Diamond"],
    sale: 20,
    additionalDescription:
      "Perfect for weddings or special events — sparkle that lasts a lifetime.",
    reviews: [
      { name: "Farzana Rahim", rating: 5, comment: "Super shiny and elegant. My favorite earrings now!" },
    ],
  },
  {
    id: 5,
    category: "Anklets",
    title: "Silver Beaded Anklet",
    description:
      "A minimalist silver anklet adorned with small, smooth beads. Adds a touch of style to your every step.",
    price: 3500,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1581091215367-59b78a7f13f2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581091215398-05f97c5bd3b2?auto=format&fit=crop&w=600&q=80",
    ],
    materials: ["Sterling Silver"],
    sale: 0,
    additionalDescription:
      "Lightweight and versatile. Complements both traditional and modern outfits.",
    reviews: [
      { name: "Rima Das", rating: 4, comment: "Simple yet classy. Could have been a little thicker though." },
    ],
  },
];


export const jewelryData = [
    {
        id: 1,
        name: "Elegant Gold Necklace",
        price: 12999,
        description:
            "A handcrafted 22K gold necklace with intricate floral design, perfect for weddings and special occasions.",
        category: "Necklace",
        material: "22K Gold",
        color: "Gold",
        stock: 12,
        image: gold
   
    },
    {
        id: 2,
        name: "Silver Pearl Earrings",
        price: 2499,
        description:
            "Classic sterling silver earrings featuring freshwater pearls, ideal for everyday elegance.",
        category: "Earrings",
        material: "Sterling Silver",
        color: "Silver & White",
        stock: 35,
        image: silver
    },
    {
        id: 3,
        name: "Diamond Engagement Ring",
        price: 48999,
        description:
            "A stunning 18K white gold engagement ring with a 0.5-carat certified diamond centerpiece.",
        category: "Ring",
        material: "18K White Gold",
        color: "White Gold",
        stock: 8,
        image: engagment
    },
    {
        id: 4,
        name: "Rose Gold Bracelet",
        price: 6999,
        description:
            "Elegant 18K rose gold bracelet with a minimal chain and heart charm, suitable for daily wear.",
        category: "Bracelet",
        material: "18K Rose Gold",
        color: "Rose Gold",
        stock: 20,
        image: rosegold
    },
    {
        id: 5,
        name: "Traditional Kundan Choker Set",
        price: 15999,
        description:
            "Royal-style Kundan choker set with matching earrings — a perfect blend of tradition and luxury.",
        category: "Choker Set",
        material: "Kundan & Gold Plating",
        color: "Gold & Green",
        stock: 10,
        images: [
            "https://example.com/images/kundan-choker-1.jpg",
            "https://example.com/images/kundan-choker-2.jpg",
        ],
    },
    {
        id: 6,
        name: "Men’s Platinum Chain",
        price: 19999,
        description:
            "Stylish and durable platinum chain for men, designed for both formal and casual wear.",
        category: "Chain",
        material: "Pure Platinum",
        color: "Silver",
        stock: 15,
        images: [
            "https://example.com/images/platinum-chain-1.jpg",
            "https://example.com/images/platinum-chain-2.jpg",
        ],
    },
];

export const blogData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    title: "Top 5 Jewelry Trends for 2025",
    description:
      "Discover this year’s most stunning jewelry trends — from minimal gold pieces to bold gemstone statements.",
    author: "Sophia Carter",
    date: "October 25, 2025",
    category: "Trends",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504198266285-165a04b8c707",
    title: "How to Care for Your Silver Jewelry",
    description:
      "Learn easy and effective ways to keep your silver jewelry shining like new for years to come.",
    author: "Daniel Rose",
    date: "October 20, 2025",
    category: "Care Tips",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1599643476238-3c2b0f8c36d4",
    title: "Choosing the Perfect Engagement Ring",
    description:
      "From diamond cuts to settings, here’s everything you need to know before buying your dream engagement ring.",
    author: "Emma Stone",
    date: "October 10, 2025",
    category: "Guides",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1602526219348-9c1f6d4b7dc3",
    title: "Why Handmade Jewelry is Worth It",
    description:
      "Explore the beauty and craftsmanship behind handmade jewelry and why it stands out in today’s world.",
    author: "Olivia Moore",
    date: "September 28, 2025",
    category: "Inspiration",
  },
];




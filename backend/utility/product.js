
const blogs = [
  {
    title: "The Ultimate Guide to Choosing the Perfect Engagement Ring",
    slug: "guide-to-choosing-perfect-engagement-ring",
    excerpt:
      "Discover how to choose an engagement ring that matches your partner’s personality, style, and lifestyle.",
    content: `
      Choosing an engagement ring is one of the most emotional purchases you'll ever make.
      From diamond cut and clarity to the perfect metal and setting — every detail matters.
      In this guide, we’ll walk you through understanding the 4Cs, popular setting styles,
      and how to find a ring that symbolizes your love story.
      
      💎 Key tip: Consider your partner’s daily routine. A minimalist band suits someone active,
      while a halo setting adds sparkle for special occasions.`,
    tags: ["Engagement", "Rings", "Jewelry Tips"],
    category: "Buying Guides",
    productCategory: "Rings",
    metaTitle: "How to Choose the Perfect Engagement Ring | Jewelry Tips",
    metaDescription:
      "Learn expert tips for selecting the perfect engagement ring that reflects love and personality.",
    keywords: "engagement ring, diamond guide, jewelry tips, ring setting",
    featuredImage:
      "https://res.cloudinary.com/dgla7fyit/image/upload/v1762339501/pexels-artworkbyumair-15226351_rssn3j.jpg",
  },
  {
    title: "Top 5 Necklace Trends for 2025",
    slug: "top-5-necklace-trends-2025",
    excerpt:
      "From chunky gold chains to elegant layered pearls, here are the top necklace styles dominating 2025.",
    content: `
      The jewelry world in 2025 is all about bold statements and nostalgic elegance.
      Layered pendants are making a comeback, along with baroque pearls and mixed metals.
      For minimalists, sleek choker chains with subtle charms remain timeless.
      
      🪞 Styling tip: Combine a short choker with a mid-length pendant for a perfectly balanced look.`,
    tags: ["Necklaces", "Trends", "2025"],
    category: "Trends & Fashion",
    productCategory: "Necklaces",
    metaTitle: "2025 Necklace Trends: Layered, Chunky, and Elegant Styles",
    metaDescription:
      "Discover the hottest necklace styles for 2025 — from pearls to chunky chains.",
    keywords: "necklace trends, jewelry 2025, fashion jewelry, gold chains",
    featuredImage:
      "https://res.cloudinary.com/dgla7fyit/image/upload/v1762339500/pexels-dhanno-28771729_zo4utx.jpg",
  },
  {
    title: "How to Care for Your Sterling Silver Jewelry",
    slug: "care-for-sterling-silver-jewelry",
    excerpt:
      "Keep your silver jewelry shiny and tarnish-free with these simple cleaning and storage hacks.",
    content: `
      Sterling silver may lose its shine over time, but with proper care, it can last a lifetime.
      Avoid exposing it to moisture and harsh chemicals. Store it in an airtight pouch and polish
      occasionally with a microfiber cloth. Baking soda and warm water can work wonders for deep cleaning.
      
      ✨ Pro tip: Wear your silver often — natural oils from your skin help prevent tarnish.`,
    tags: ["Silver", "Jewelry Care", "Maintenance"],
    category: "Care & Maintenance",
    productCategory: "Rings",
    metaTitle: "How to Clean and Maintain Sterling Silver Jewelry",
    metaDescription:
      "Learn the best methods to clean and care for your sterling silver jewelry to keep it sparkling.",
    keywords: "silver jewelry care, cleaning jewelry, tarnish removal",
    featuredImage:
      "https://res.cloudinary.com/dgla7fyit/image/upload/v1762339501/pexels-thelazyartist-1415145_k7rm4x.jpg",
  },
  {
    title: "Why Rose Gold is the New Classic",
    slug: "why-rose-gold-is-the-new-classic",
    excerpt:
      "Rose gold jewelry has taken over fashion — here’s why this timeless metal is loved by all generations.",
    content: `
      Rose gold blends the warmth of yellow gold with the elegance of copper tones.
      It complements every skin tone, making it universally flattering. Whether in engagement rings,
      bracelets, or earrings, rose gold pieces bring a soft romantic charm.
      
      🌸 Fun fact: Rose gold was first popularized during the 1920s Art Deco era.`,
    tags: ["Rose Gold", "Jewelry Trends"],
    category: "Materials & Metals",
    productCategory: "Bracelets",
    metaTitle: "Why Rose Gold Jewelry is a Must-Have in 2025",
    metaDescription:
      "Explore why rose gold jewelry continues to dominate fashion trends in 2025.",
    keywords: "rose gold, jewelry trends, gold jewelry",
    featuredImage:
      "https://res.cloudinary.com/dgla7fyit/image/upload/v1762339501/pexels-dhanno-20593518_uyvx3u.jpg",
  },
  {
    title: "Mixing Metals: The Modern Jewelry Rulebook",
    slug: "mixing-metals-modern-jewelry-rulebook",
    excerpt:
      "Forget the old rules — combining gold, silver, and rose tones is the new chic in jewelry styling.",
    content: `
      Once considered a fashion faux pas, mixing metals is now a mark of sophistication.
      The trick is balance: pair one dominant metal (like gold) with accent pieces in silver or rose gold.
      Multi-tone jewelry allows versatility — it matches all outfits effortlessly.
      
      🎨 Styling tip: Stack thin rings in different metals for an elegant layered look.`,
    tags: ["Fashion", "Jewelry Styling", "Metals"],
    category: "Style Tips",
    productCategory: "Rings",
    metaTitle: "Mixing Metals in Jewelry: Gold, Silver & Rose Gold Combinations",
    metaDescription:
      "Learn how to mix different metal tones in jewelry for a stylish, modern look.",
    keywords: "mixing metals jewelry, fashion jewelry, gold silver combo",
    featuredImage:
      "https://res.cloudinary.com/dgla7fyit/image/upload/v1762339607/pexels-dhanno-27603283_zwqvcm.jpg",
  },
  {
    title: "Sustainable Jewelry: What It Means and Why It Matters",
    slug: "sustainable-jewelry-why-it-matters",
    excerpt:
      "Eco-friendly jewelry is shaping the future of luxury. Learn how ethical sourcing is changing the game.",
    content: `
      Modern consumers are demanding transparency — and jewelry brands are responding.
      Sustainable jewelry means using recycled metals, lab-grown diamonds, and conflict-free gems.
      It’s not just about beauty; it’s about responsibility.
      
      🌿 Look for certifications like Fairtrade Gold or the Responsible Jewellery Council mark.`,
    tags: ["Sustainability", "Ethical Jewelry"],
    category: "Sustainability",
    productCategory: "Necklaces",
    metaTitle: "Sustainable Jewelry: Ethical Luxury for the Conscious Buyer",
    metaDescription:
      "Understand what makes jewelry sustainable and why it’s important for our planet.",
    keywords: "sustainable jewelry, ethical gold, eco-friendly diamonds",
    featuredImage:
      "https://res.cloudinary.com/dgla7fyit/image/upload/v1762339504/pexels-umutdagli-28856506_w2crto.jpg",
  },
  {
    title: "The Power of Gemstones: Meaning and Energy",
    slug: "the-power-of-gemstones-meaning-and-energy",
    excerpt:
      "Gemstones aren’t just beautiful — they’re believed to carry energy, symbolism, and healing power.",
    content: `
      From sapphires that symbolize wisdom to emeralds representing growth, gemstones have been cherished for centuries.
      Whether you believe in their metaphysical properties or not, they add a meaningful layer to your jewelry collection.
      
      💠 Did you know? Amethyst is known to bring calm and clarity to the mind.`,
    tags: ["Gemstones", "Spiritual", "Jewelry Meaning"],
    category: "Gemstones & Healing",
    productCategory: "Rings",
    metaTitle: "Gemstone Meanings: The Hidden Power Behind Your Jewelry",
    metaDescription:
      "Explore the meaning and energy of popular gemstones in fine jewelry.",
    keywords: "gemstones meaning, crystal energy, jewelry symbolism",
    featuredImage:
      "https://res.cloudinary.com/dgla7fyit/image/upload/v1762339608/pexels-dhanno-20702636_ztzyoj.jpg",
  },
  {
    title: "How to Layer Bracelets Like a Pro",
    slug: "how-to-layer-bracelets-like-a-pro",
    excerpt:
      "Master the art of stacking bangles and bracelets to create your own statement style.",
    content: `
      Layering bracelets is all about rhythm and proportion.
      Combine textures — like a sleek bangle with a beaded bracelet — and vary thicknesses for depth.
      Keep color harmony in mind, and don’t be afraid to mix gold with rose tones for warmth.
      
      💫 Quick tip: Leave one wrist bare to let your layered stack shine.`,
    tags: ["Bracelets", "Styling Tips"],
    category: "Style Inspiration",
    productCategory: "Bracelets",
    metaTitle: "Bracelet Layering Tips: Mix, Match & Shine",
    metaDescription:
      "Learn how to stack and layer bracelets for the perfect modern jewelry look.",
    keywords: "bracelet layering, jewelry styling, bangles mix",
    featuredImage:
      "https://res.cloudinary.com/dgla7fyit/image/upload/v1762339610/pexels-dhanno-20420559_bcqql6.jpg",
  },
  {
    title: "The History of Gold Jewelry Through the Ages",
    slug: "history-of-gold-jewelry",
    excerpt:
      "Gold has symbolized power, love, and divinity for centuries — here’s how it evolved through history.",
    content: `
      From ancient Egyptian pharaohs to modern haute couture, gold has remained a universal symbol of luxury.
      Each era added its twist — Byzantine craftsmanship, Renaissance engravings, and today’s minimalist forms.
      
      🏺 Fun fact: The world’s oldest gold jewelry was found in Bulgaria — dating back to 4,500 BC!`,
    tags: ["Gold", "History", "Luxury"],
    category: "Culture & History",
    productCategory: "Neckpieces",
    metaTitle: "The Evolution of Gold Jewelry Through Time",
    metaDescription:
      "Explore the fascinating history of gold jewelry from ancient civilizations to modern fashion.",
    keywords: "gold jewelry history, ancient jewelry, cultural jewelry",
    featuredImage:
      "https://res.cloudinary.com/dgla7fyit/image/upload/v1762339501/pexels-rajeshverma-7791457_xyeocf.jpg",
  },
  {
    title: "Jewelry Photography Tips for Small Business Owners",
    slug: "jewelry-photography-tips-small-business",
    excerpt:
      "Your jewelry deserves stunning visuals — here’s how to capture sparkle like a pro using simple setups.",
    content: `
      Great photos sell. Use natural light, avoid harsh reflections, and focus on close-ups.
      A white or pastel background enhances color accuracy. Try shooting from multiple angles
      to highlight texture and craftsmanship.
      
      📸 Bonus tip: Use a macro lens or your phone’s portrait mode for sharp details.`,
    tags: ["Photography", "E-commerce", "Business"],
    category: "Business & Marketing",
    productCategory: "All",
    metaTitle: "Jewelry Photography Tips for E-commerce Success",
    metaDescription:
      "Learn how to photograph jewelry for your online store with professional clarity and shine.",
    keywords: "jewelry photography, product photos, e-commerce jewelry",
    featuredImage:
      "https://res.cloudinary.com/dgla7fyit/image/upload/v1762339500/pexels-dhanno-28771729_zo4utx.jpg",
  }
];



module.exports = blogs


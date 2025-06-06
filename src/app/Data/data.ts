const trendingProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 199.99,
    discount: 15,
    rating: 4.5,
    reviewCount: 128,
    imageUrl: "/images/headphones.jpg",
    category: "Electronics",
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    price: 249.99,
    rating: 4.2,
    reviewCount: 86,
    imageUrl: "/images/smartwatch.jpg",
    category: "Wearables",
    isNew: true,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    discount: 20,
    rating: 4.8,
    reviewCount: 215,
    imageUrl: "/images/tshirt.jpg",
    category: "Apparel",
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    price: 89.99,
    rating: 4.3,
    reviewCount: 64,
    imageUrl: "/images/speaker.jpg",
    category: "Electronics",
    isBestSeller: true,
  },
];
const trendingCategories = [
  {
    id: "electronics",
    name: "Electronics",
    imageUrl: "/images/electronics.jpg",
    productCount: 342,
    isTrending: true,
  },
  {
    id: "clothing",
    name: "Clothing",
    imageUrl: "/images/clothing.jpg",
    productCount: 512,
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    imageUrl: "/images/home-garden.jpg",
    productCount: 278,
    isTrending: true,
  },
  {
    id: "beauty",
    name: "Beauty",
    imageUrl: "/images/beauty.jpg",
    productCount: 189,
  },
  {
    id: "sports",
    name: "Sports",
    imageUrl: "/images/sports.jpg",
    productCount: 156,
  },
  {
    id: "toys",
    name: "Toys",
    imageUrl: "/images/toys.jpg",
    productCount: 203,
    isTrending: true,
  },
];
export { trendingCategories, trendingProducts };

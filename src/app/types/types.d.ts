type SignUpFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  otp: string;
  address: Address[];
};
type SignInFormValues = {
  email: string;
  password: string;
};
type Division = {
  id: number;
  name: string;
};
type District = {
  id: number;
  name: string;
};
type Address = {
  country: string;
  division: string;
  district: string;
  isDefault: boolean;
  fullAddress: string;
};
type category = {
  _id: string;
  name: string;
  parent?: string | null;
};
type Product = {
  _id: string;
  title: string;
  description: string;
  sku: string;
  price: number;
  salePrice: number;
  stock: number;
  category: category;
  images: string[];
  slug: string;
  attributes: { name: string; value: string }[];
  status: "active" | "inactive" | "draft";
  tags: string[];
  variants: { name: string; value: string }[];
};
type ProductList = {
  products: Product[];
  totalPages: number;
  totalProducts: number;
  currentPage: number;
};
type User = {
  isAuthenticated: boolean;
  role?: string;
};
type SearchState = {
  hasSearched: boolean;
};

type ProductFormInputs = {
  title: string;
  description: string;
  sku: string;
  price: number;
  salePrice?: number;
  stock: number;
  category: string; // Now selected from a dropdown
  images: string[];
  slug?: string;
  attributes: { name: string; value: string }[];
  status: "active" | "inactive" | "draft" | "";
  tags: string[];
  variants: { name: string; value: string }[];
  _id: string;
};
type CategoryFormInputs = {
  _id: string;
  name: string; // Required
  description?: string; // Optional
  parent?: string; // Optional (for nested categories)
};
type Category = {
  id: string;
  name: string;
  imageUrl: string;
  productCount: number;
  isTrending?: boolean;
};

type CategoryTrendingProps = {
  categories: Category[];
  title?: string;
  subtitle?: string;
  columns?: number;
};
type FilterSidebarProps = {
  handleCategoryChange: (category: string) => void;
  selectedCategory: string;
  min: number;
  max: number;
  setMin: (min: number) => void;
  setMax: (max: number) => void;
};
type PaginationProps = {
  totalPages: number;
  handlePageChange: (page: number) => void;
  currentPage: number;
};
// Define types for nested fields
interface Attribute {
  name: string;
  value: string;
}

interface Variant {
  name: string;
  value: string;
}

// Define the main product form type
interface ProductUpdateFormInputs {
  title: string;
  price: number;
  salePrice: number;
  description: string;
  sku: string;
  images: string[];
  stock: number;
  category: string;
  status: "active" | "inactive" | "draft";
  attributes: Attribute[];
  tags: string[];
  variants: Variant[];
  _id: string;
}
type ReviewFormInputs = {
  _id?: string;
  user: string;
  product: string;
  rating?: number;
  comment?: string;
  date?: string;
};
type Carts = {
  userId: string;
  productId: string;
  quantity?: number;
  variants?: Record<string, string>;
};
type Reviews = {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}
type CartItemType = {
  product: Product;
  quantity: number;
  _id: string;
};
type createProductReviews = {
  user: string;
  product: string;
  rating: number;
  comment: string;
};
export type {
  Address,
  Attribute,
  CategoryFormInputs,
  CategoryTrendingProps,
  District,
  Division,
  FilterSidebarProps,
  PaginationProps,
  Product,
  ProductFormInputs,
  ProductList,
  ProductUpdateFormInputs,
  ReviewFormInputs,
  SearchState,
  SignInFormValues,
  SignUpFormValues,
  User,
  Variant,
  Carts,
  Reviews,
  CartSummary,
  CartItemType,
  createProductReviews,
  category,
};

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
type Product = {
  _id: string;
  title: string;
  description: string;
  sku: string;
  price: number;
  salePrice: number;
  stock: number;
  category: {
    _id: string;
    name: string;
  };
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
  status: "active" | "inactive" | "draft";
  tags: string[];
  variants: { name: string; value: string }[];
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
  handlePriceChange: () => void;
  selectedCategory: string;
  min: number;
  max: number;
  setMin: (min: number) => void;
  setMax: (max: number) => void;
};
export type {
  Address,
  CategoryFormInputs,
  CategoryTrendingProps,
  District,
  Division,
  FilterSidebarProps,
  Product,
  ProductFormInputs,
  ProductList,
  SearchState,
  SignInFormValues,
  SignUpFormValues,
  User,
};

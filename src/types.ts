import { User } from '@supabase/supabase-js';

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  features: string[];
  rating: number;
  reviews: Review[];
  specifications: Record<string, string>;
}

export interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  type: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  linkedinUrl: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ShopFilters {
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'price_asc' | 'price_desc' | 'rating' | 'newest';
  searchQuery: string;
}
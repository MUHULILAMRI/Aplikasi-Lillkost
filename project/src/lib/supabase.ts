import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// These would typically come from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create a single supabase client for the entire app
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Types based on Supabase schema
export type PropertyType = 'male' | 'female' | 'mixed';
export type RentalPeriod = 'daily' | 'monthly' | 'yearly';

export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  price: number;
  rental_period: RentalPeriod;
  property_type: PropertyType;
  room_size: string;
  image_urls: string[];
  facilities: string[];
  latitude: number;
  longitude: number;
  owner_id: string;
  created_at: string;
  available: boolean;
  is_verified: boolean;
  rating?: number;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone_number?: string;
  role: 'tenant' | 'owner' | 'admin';
  created_at: string;
}

export interface Booking {
  id: string;
  property_id: string;
  tenant_id: string;
  check_in_date: string;
  duration: number;
  duration_unit: RentalPeriod;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  total_price: number;
  payment_status: 'unpaid' | 'paid';
  created_at: string;
  property?: Property;
}

export interface Review {
  id: string;
  property_id: string;
  tenant_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user?: User;
}
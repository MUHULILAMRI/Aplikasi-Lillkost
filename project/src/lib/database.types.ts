export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          title: string
          description: string
          address: string
          city: string
          price: number
          rental_period: "daily" | "monthly" | "yearly"
          property_type: "male" | "female" | "mixed"
          room_size: string
          image_urls: string[]
          facilities: string[]
          latitude: number
          longitude: number
          owner_id: string
          created_at: string
          available: boolean
          is_verified: boolean
          rating: number | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          address: string
          city: string
          price: number
          rental_period: "daily" | "monthly" | "yearly"
          property_type: "male" | "female" | "mixed"
          room_size: string
          image_urls: string[]
          facilities: string[]
          latitude: number
          longitude: number
          owner_id: string
          created_at?: string
          available?: boolean
          is_verified?: boolean
          rating?: number | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          address?: string
          city?: string
          price?: number
          rental_period?: "daily" | "monthly" | "yearly"
          property_type?: "male" | "female" | "mixed"
          room_size?: string
          image_urls?: string[]
          facilities?: string[]
          latitude?: number
          longitude?: number
          owner_id?: string
          created_at?: string
          available?: boolean
          is_verified?: boolean
          rating?: number | null
        }
      }
      bookings: {
        Row: {
          id: string
          property_id: string
          tenant_id: string
          check_in_date: string
          duration: number
          duration_unit: "daily" | "monthly" | "yearly"
          status: "pending" | "confirmed" | "cancelled" | "completed"
          total_price: number
          payment_status: "unpaid" | "paid"
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          tenant_id: string
          check_in_date: string
          duration: number
          duration_unit: "daily" | "monthly" | "yearly"
          status?: "pending" | "confirmed" | "cancelled" | "completed"
          total_price: number
          payment_status?: "unpaid" | "paid"
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          tenant_id?: string
          check_in_date?: string
          duration?: number
          duration_unit?: "daily" | "monthly" | "yearly"
          status?: "pending" | "confirmed" | "cancelled" | "completed"
          total_price?: number
          payment_status?: "unpaid" | "paid"
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          property_id: string
          tenant_id: string
          rating: number
          comment: string
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          tenant_id: string
          rating: number
          comment: string
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          tenant_id?: string
          rating?: number
          comment?: string
          created_at?: string
        }
      }
      saved_properties: {
        Row: {
          id: string
          user_id: string
          property_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          property_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          property_id?: string
          created_at?: string
        }
      }
      chats: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          message: string
          created_at: string
          is_read: boolean
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          message: string
          created_at?: string
          is_read?: boolean
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          message?: string
          created_at?: string
          is_read?: boolean
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone_number: string | null
          role: "tenant" | "owner" | "admin"
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone_number?: string | null
          role?: "tenant" | "owner" | "admin"
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone_number?: string | null
          role?: "tenant" | "owner" | "admin"
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
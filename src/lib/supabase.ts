import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          completed: boolean;
          priority: 'low' | 'medium' | 'high';
          category: string;
          due_date: string | null;
          focus_time: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          completed?: boolean;
          priority?: 'low' | 'medium' | 'high';
          category: string;
          due_date?: string | null;
          focus_time?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          completed?: boolean;
          priority?: 'low' | 'medium' | 'high';
          category?: string;
          due_date?: string | null;
          focus_time?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      focus_sessions: {
        Row: {
          id: string;
          user_id: string;
          duration: number;
          date: string;
          task_id: string | null;
          completed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          duration: number;
          date?: string;
          task_id?: string | null;
          completed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          duration?: number;
          date?: string;
          task_id?: string | null;
          completed?: boolean;
          created_at?: string;
        };
      };
      badges: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string;
          icon: string;
          earned: boolean;
          earned_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description: string;
          icon: string;
          earned?: boolean;
          earned_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string;
          icon?: string;
          earned?: boolean;
          earned_at?: string | null;
          created_at?: string;
        };
      };
      user_stats: {
        Row: {
          id: string;
          user_id: string;
          total_focus_time: number;
          tasks_completed: number;
          current_streak: number;
          longest_streak: number;
          last_activity_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_focus_time?: number;
          tasks_completed?: number;
          current_streak?: number;
          longest_streak?: number;
          last_activity_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_focus_time?: number;
          tasks_completed?: number;
          current_streak?: number;
          longest_streak?: number;
          last_activity_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};

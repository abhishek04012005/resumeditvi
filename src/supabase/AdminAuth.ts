"use client";
import { supabase } from './Supabase';

export interface AdminUser {
  id: number;
  username: string;
  password: string;
  created_at: string;
}

export const AdminAuthStorage = {
  async createAdminUser(username: string, password: string) {
    const { data, error } = await supabase
      .from('admin_users')
      .insert([{ username, password }])
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return data as AdminUser;
  },

  async authenticateAdmin(username: string, password: string) {
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, username')
      .eq('username', username)
      .eq('password', password)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data as Pick<AdminUser, 'id' | 'username'> | null;
  },
};

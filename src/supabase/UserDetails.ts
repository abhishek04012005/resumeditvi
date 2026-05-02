import { supabase } from './Supabase';

interface UserDetails {
  name: string;
  mobileNumber: string;
}

interface ModelDetails {
  modelNumber: string;
  language: string;
  type: string;
  amount: number;
}

interface SaveUserDetailsParams {
  userDetails: UserDetails;
}

interface UserDetailResponse {
  id: number;
  request_number: string;
  user_details: UserDetails;
  model_details?: ModelDetails;
  created_at: string;
}

export class UserDetailsError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'UserDetailsError';
  }
}

export const UserDetailsStorage = {
  async saveUserDetails({
    userDetails,
  }: SaveUserDetailsParams): Promise<UserDetailResponse> {
    try {
      // Input validation
      if (!userDetails.name || !userDetails.mobileNumber) {
        throw new UserDetailsError('Invalid user details provided');
      }

      // Generate a unique request number
      const requestNumber = `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const { data, error } = await supabase
        .from('user_details')
        .insert([{
          request_number: requestNumber,
          user_details: userDetails,
          created_at: new Date().toISOString()
        }])
        .select('id, request_number, user_details, created_at')
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new UserDetailsError(`Failed to save user details: ${error.message}`, error);
      }

      if (!data) {
        throw new UserDetailsError('No data returned from insertion');
      }

      return {
        id: data.id,
        request_number: data.request_number,
        user_details: data.user_details,
        created_at: data.created_at,
      };
    } catch (error) {
      console.error('Error saving User details:', error);
      if (error instanceof UserDetailsError) {
        throw error;
      }
      throw new UserDetailsError('Failed to save user details', error);
    }
  },

  async getAllUsers(): Promise<UserDetailResponse[]> {
    try {
      const { data, error } = await supabase
        .from('user_details')
        .select('id, request_number, user_details, model_details, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw new UserDetailsError(`Failed to fetch users: ${error.message}`, error);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching all users:', error);
      if (error instanceof UserDetailsError) {
        throw error;
      }
      throw new UserDetailsError('Failed to fetch users', error);
    }
  },

  async getUserByRequestNumber(requestNumber: string): Promise<UserDetailResponse | null> {
    try {
      const { data, error } = await supabase
        .from('user_details')
        .select('id, request_number, user_details, model_details, created_at')
        .eq('request_number', requestNumber)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new UserDetailsError(`Failed to fetch user: ${error.message}`, error);
      }

      return data;
    } catch (error) {
      console.error('Error fetching user by request number:', error);
      if (error instanceof UserDetailsError) {
        throw error;
      }
      throw new UserDetailsError('Failed to fetch user by request number', error);
    }
  }
};
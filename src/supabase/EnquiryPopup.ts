import { supabase } from './Supabase';
import { supabaseServer } from './SupabaseServer';

export interface EnquiryPopupEntry {
  name: string;
  mobileNumber: string;
  service: string;
}

export interface EnquiryPopupResponse {
  id: number;
  name: string;
  mobile_number: string;
  service: string;
  status: string;
  created_at: string;
}

export class EnquiryPopupError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'EnquiryPopupError';
  }
}

export const EnquiryPopupStorage = {
  async saveEnquiryPopup({
    name,
    mobileNumber,
    service,
  }: EnquiryPopupEntry): Promise<EnquiryPopupResponse> {
    try {
      if (!name || !mobileNumber || !service) {
        throw new EnquiryPopupError('Invalid enquiry data provided');
      }

      const { data, error } = await supabaseServer
        .from('enquiry_popup')
        .insert([
          {
            name,
            mobile_number: mobileNumber,
            service,
            status: 'New',
          },
        ])
        .select('id, name, mobile_number, service, status, created_at')
        .single();

      if (error) {
        console.error('Supabase error:', error);
        const message = error.message ? `Failed to save enquiry: ${error.message}` : 'Failed to save enquiry: Supabase returned an error';
        throw new EnquiryPopupError(message, error);
      }

      if (!data) {
        throw new EnquiryPopupError('No data returned from insertion');
      }

      return data;
    } catch (error) {
      console.error('Error saving enquiry:', error);
      if (error instanceof EnquiryPopupError) {
        if (error.originalError) {
          console.error('Original error details:', error.originalError);
        }
        throw error;
      }
      throw new EnquiryPopupError('Failed to save enquiry', error);
    }
  },

  async getAllEnquiries(): Promise<EnquiryPopupResponse[]> {
    try {
      const { data, error } = await supabase
        .from('enquiry_popup')
        .select('id, name, mobile_number, service, status, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        throw new EnquiryPopupError('Failed to fetch enquiries', error);
      }

      if (!data) {
        return [];
      }

      return data as EnquiryPopupResponse[];
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      if (error instanceof EnquiryPopupError) {
        throw error;
      }
      throw new EnquiryPopupError('Unexpected error while fetching enquiries', error);
    }
  },

  async updateEnquiryStatus(id: number, status: string): Promise<EnquiryPopupResponse> {
    try {
      const { data, error } = await supabase
        .from('enquiry_popup')
        .update({ status })
        .eq('id', id)
        .select('id, name, mobile_number, service, status, created_at')
        .single();

      if (error) {
        throw new EnquiryPopupError(`Failed to update enquiry status for ID: ${id}`, error);
      }

      if (!data) {
        throw new EnquiryPopupError(`No data returned after updating enquiry status for ID: ${id}`);
      }

      return data as EnquiryPopupResponse;
    } catch (error) {
      console.error('Error updating enquiry status:', error);
      if (error instanceof EnquiryPopupError) {
        throw error;
      }
      throw new EnquiryPopupError(`Unexpected error while updating enquiry status for ID: ${id}`, error);
    }
  },
};

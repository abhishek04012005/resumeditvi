import { supabase } from './Supabase';

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

      const { data, error } = await supabase
        .from('enquiry_popup')
        .insert([
          {
            name,
            mobile_number: mobileNumber,
            service,
          },
        ])
        .select('id, name, mobile_number, service, created_at')
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new EnquiryPopupError(
          `Failed to save enquiry: ${error.message}`,
          error
        );
      }

      if (!data) {
        throw new EnquiryPopupError('No data returned from insertion');
      }

      return data;
    } catch (error) {
      console.error('Error saving enquiry:', error);
      if (error instanceof EnquiryPopupError) {
        throw error;
      }
      throw new EnquiryPopupError('Failed to save enquiry', error);
    }
  },
};

// ResumeRequest.ts
import { supabase } from "./Supabase";
import { FlowType } from "../data/flowtype";

interface Status {
  id: number;
  created: string;
}

interface ResumeRequest {
  id?: number;
  created_at?: string;
  request_number: string;
  flow_type: FlowType;
  status: Status[];
  user_details: Record<string, unknown>;
  model_details: Record<string, unknown>;
  profile_url?: string;
  resume_url?: string;
  personal_details?: Record<string, unknown>;
  professional_details?: Record<string, unknown>;
  examination_details?: Record<string, unknown>;
  education_details?: Record<string, unknown>;
  family_details?: Record<string, unknown>;
  contact_details?: Record<string, unknown>;
  completed?: boolean;
  deleted?: boolean;
}

interface WhatsappResumeRequest {
  requestNumber: string;
  userDetails: Record<string, unknown>;
  modelDetails: Record<string, unknown>;
}

interface UploadResumeRequest extends WhatsappResumeRequest {
  profileUrl: string;
  resumeUrl: string;
}

interface CreateResumeRequest extends UploadResumeRequest {
  personalDetails: Record<string, unknown>;
  professionalDetails: Record<string, unknown>;
  examinationDetails: Record<string, unknown>;
  educationDetails: Record<string, unknown>;
  familyDetails: Record<string, unknown>;
  contactDetails: Record<string, unknown>;
}

const resumeRequestTableName = "resume_request";

export const ResumeRequestStorage = {
  async getAllResumeRequest(): Promise<ResumeRequest[]> {
    try {
      const { data, error } = await supabase
        .from(resumeRequestTableName)
        .select(`
          id,
          created_at,
          request_number,
          flow_type,
          status,
          user_details,
          model_details,
          profile_url,
          resume_url,
          personal_details,
          professional_details,
          examination_details,
          education_details,
          family_details,
          contact_details,
          completed
        `)
        .eq("deleted", false)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ResumeRequest[];
    } catch (error) {
      console.error("Error getAllResumeRequest:", error);
      throw error;
    }
  },

  async getAllResumeRequestWithoutAnyFilters(): Promise<ResumeRequest[]> {
    try {
      const { data, error } = await supabase
        .from(resumeRequestTableName)
        .select(`
          id,
          created_at,
          request_number,
          flow_type,
          status,
          user_details,
          model_details,
          profile_url,
          resume_url,
          personal_details,
          professional_details,
          examination_details,
          education_details,
          family_details,
          contact_details,
          completed
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ResumeRequest[];
    } catch (error) {
      console.error("Error getAllResumeRequestWithoutAnyFilters:", error);
      throw error;
    }
  },

  async saveResumeRequestFromWhatsapp(
    resumeRequest: WhatsappResumeRequest
  ): Promise<ResumeRequest> {
    try {
      const { data, error } = await supabase
        .from(resumeRequestTableName)
        .insert({
          request_number: resumeRequest.requestNumber,
          flow_type: FlowType.FLOW_WHATSAPP,
          status: [
            {
              id: 0,
              created: new Date().toISOString(),
            },
          ],
          user_details: resumeRequest.userDetails,
          model_details: resumeRequest.modelDetails,
        })
        .select("*")
        .single();

      if (error) throw error;
      return data as ResumeRequest;
    } catch (error) {
      console.error("Error saveResumeRequestFromWhatsapp:", error);
      throw error;
    }
  },

  async saveResumeRequestFromUploadResume(
    resumeRequest: UploadResumeRequest
  ): Promise<ResumeRequest> {
    try {
      const { data, error } = await supabase
        .from(resumeRequestTableName)
        .insert({
          request_number: resumeRequest.requestNumber,
          status: [
            {
              id: 0,
              created: new Date().toISOString(),
            },
          ],
          flow_type: FlowType.FLOW_UPLOAD_BIODATA,
          user_details: resumeRequest.userDetails,
          model_details: resumeRequest.modelDetails,
          profile_url: resumeRequest.profileUrl,
          resume_url: resumeRequest.resumeUrl,
        })
        .select("*")
        .single();

      if (error) throw error;
      return data as ResumeRequest;
    } catch (error) {
      console.error("Error saveResumeRequestFromUploadResume:", error);
      throw error;
    }
  },

  async saveResumeRequestFromCreateResume(
    resumeRequest: CreateResumeRequest
  ): Promise<ResumeRequest> {
    try {
      const { data, error } = await supabase
        .from(resumeRequestTableName)
        .insert({
          request_number: resumeRequest.requestNumber,
          status: [
            {
              id: 0,
              created: new Date().toISOString(),
            },
          ],
          flow_type: FlowType.FLOW_CREATE_BIODATA,
          user_details: resumeRequest.userDetails,
          model_details: resumeRequest.modelDetails,
          profile_url: resumeRequest.profileUrl,
          personal_details: resumeRequest.personalDetails,
          professional_details: resumeRequest.professionalDetails,
          examination_details: resumeRequest.examinationDetails,
          education_details: resumeRequest.educationDetails,
          family_details: resumeRequest.familyDetails,
          contact_details: resumeRequest.contactDetails,
        })
        .select("*")
        .single();

      if (error) throw error;
      return data as ResumeRequest;
    } catch (error) {
      console.error("Error saveResumeRequestFromCreateResume:", error);
      throw error;
    }
  },

  async updateStatusResumeRequestById(
    requestId: number,
    status: Status[]
  ): Promise<ResumeRequest> {
    try {
      const { data, error } = await supabase
        .from(resumeRequestTableName)
        .update({ status })
        .eq("id", requestId)
        .select("*")
        .single();

      if (error) throw error;
      return data as ResumeRequest;
    } catch (error) {
      console.error("Error updateStatusResumeRequestById:", error);
      throw error;
    }
  },

  async updateStatusResumeRequestByRequestNumber(
    requestNumber: string,
    status: Status[],
    completed = false
  ): Promise<ResumeRequest> {
    try {
      const { data, error } = await supabase
        .from(resumeRequestTableName)
        .update({
          status,
          completed,
        })
        .eq("request_number", requestNumber)
        .select("*")
        .single();

      if (error) throw error;
      return data as ResumeRequest;
    } catch (error) {
      console.error("Error updateStatusResumeRequestByRequestNumber:", error);
      throw error;
    }
  },

  async deleteResumeRequestById(requestId: number): Promise<ResumeRequest> {
    try {
      const { data, error } = await supabase
        .from(resumeRequestTableName)
        .update({
          deleted: true,
        })
        .eq("id", requestId)
        .select("*")
        .single();

      if (error) throw error;
      return data as ResumeRequest;
    } catch (error) {
      console.error("Error deleteResumeRequestById:", error);
      throw error;
    }
  },

  async getResumeRequestByRequestNumber(
    requestNumber: string
  ): Promise<ResumeRequest> {
    try {
      const { data, error } = await supabase
        .from(resumeRequestTableName)
        .select("*")
        .eq("request_number", requestNumber)
        .single();

      if (error) throw error;
      return data as ResumeRequest;
    } catch (error) {
      console.error("Error getResumeRequestByRequestNumber:", error);
      throw error;
    }
  },

  async checkResumeRequestByRequestNumber(
    requestNumber: string
  ): Promise<ResumeRequest | null> {
    try {
      const { data, error } = await supabase
        .from(resumeRequestTableName)
        .select("*")
        .eq("request_number", requestNumber)
        .eq("deleted", false)
        .maybeSingle();

      if (error) {
        if (error.code === "PGRST116") {
          return null;
        }
        throw error;
      }

      return data as ResumeRequest | null;
    } catch (error) {
      console.error("Error checkResumeRequestByRequestNumber:", error);
      throw error;
    }
  },

  async getResumeRequestByRequestId(requestId: number): Promise<ResumeRequest> {
    try {
      const { data, error } = await supabase
        .from(resumeRequestTableName)
        .select("*")
        .eq("id", requestId)
        .single();

      if (error) throw error;
      return data as ResumeRequest;
    } catch (error) {
      console.error("Error getResumeRequestByRequestId:", error);
      throw error;
    }
  },

  async searchResumeRequests(searchTerm: string): Promise<ResumeRequest[]> {
    try {
      const numericSearchTerm = parseInt(searchTerm);

      if (isNaN(numericSearchTerm)) {
        return [];
      }

      const searchNumbers = [
        ...Array.from({ length: 10 }, (_, i) => parseInt(`${searchTerm}${i}`)),
        ...Array.from({ length: 10 }, (_, i) => parseInt(`${i}${searchTerm}`)),
        numericSearchTerm,
      ];

      const { data, error } = await supabase
        .from(resumeRequestTableName)
        .select("*")
        .eq("deleted", false)
        .in("request_number", searchNumbers)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ResumeRequest[];
    } catch (error) {
      console.error("Error searching resume requests:", error);
      throw error;
    }
  },
};

export type {
  ResumeRequest,
  WhatsappResumeRequest,
  UploadResumeRequest,
  CreateResumeRequest,
  Status,
};
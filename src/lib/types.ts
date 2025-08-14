export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

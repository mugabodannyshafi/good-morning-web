import axios, { AxiosError } from "axios";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: ContactFormData;
}

const apiClient = axios.create({
  baseURL: "https://good-morning-api-02ub.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const submitContactForm = async (
  formData: ContactFormData
): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post("/submission", formData);

    return {
      success: true,
      message: "Form submitted successfully!",
      data: response.data,
    };
  } catch (error) {
    console.error("API submission error:", error);

    if (error instanceof AxiosError) {
      if (error.response) {
        return {
          success: false,
          message: `Server error: ${error.response.status} - ${
            error.response.data?.message || error.message
          }`,
        };
      } else if (error.request) {
        return {
          success: false,
          message:
            "Network error: Unable to reach server. Please check your connection.",
        };
      } else {
        return {
          success: false,
          message: error.message,
        };
      }
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

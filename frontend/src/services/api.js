import axios from 'axios';

// ===== API Configuration =====
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_TIMEOUT = 60000; // 60 seconds — AI models can take time

// Create Axios instance with defaults
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Accept': 'application/json',
  },
});

/**
 * Generate a caption for an uploaded image.
 * Sends the image as multipart/form-data to the FastAPI backend.
 *
 * @param {File} imageFile - The image file to caption
 * @param {Function} onUploadProgress - Optional progress callback
 * @returns {Promise<{ success: boolean, caption: string }>}
 */
export const generateCaption = async (imageFile, onUploadProgress) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await apiClient.post('/caption', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress && progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onUploadProgress(percent);
        }
      },
    });

    return response.data;
  } catch (error) {
    // Network error (backend unreachable)
    if (!error.response) {
      throw new Error(
        'Unable to connect to the AI server. Please ensure the backend is running at ' +
        API_BASE_URL
      );
    }

    // Server returned an error
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      'An unexpected error occurred while generating the caption.';

    throw new Error(message);
  }
};

export default apiClient;

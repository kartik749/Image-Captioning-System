import { useState, useCallback } from 'react';
import { generateCaption } from '../services/api';
import { validateImageFile } from '../utils/helpers';
import toast from 'react-hot-toast';

/**
 * Custom hook encapsulating all image captioning logic:
 * - File selection & validation
 * - Image preview generation
 * - Upload progress tracking
 * - API call & error handling
 * - State reset
 */
export const useImageCaption = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  /**
   * Handle file selection from drop or input click.
   */
  const handleFileSelect = useCallback((selectedFile) => {
    const validation = validateImageFile(selectedFile);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    // Clear previous state
    setCaption('');
    setError(null);
    setUploadProgress(0);
    setFile(selectedFile);

    // Generate preview URL
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);

    toast.success(`"${selectedFile.name}" selected successfully!`);
  }, []);

  /**
   * Submit the image to the backend for captioning.
   */
  const handleGenerateCaption = useCallback(async () => {
    if (!file) {
      toast.error('Please select an image first.');
      return;
    }

    setIsLoading(true);
    setCaption('');
    setError(null);
    setUploadProgress(0);

    try {
      const result = await generateCaption(file, (progress) => {
        setUploadProgress(progress);
      });

      if (result.success && result.caption) {
        setCaption(result.caption);
        toast.success('Caption generated successfully!');
      } else {
        throw new Error('Unexpected response from the server.');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to generate caption.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  }, [file]);

  /**
   * Reset all state back to initial.
   */
  const handleReset = useCallback(() => {
    setFile(null);
    setPreview(null);
    setCaption('');
    setIsLoading(false);
    setUploadProgress(0);
    setError(null);
  }, []);

  return {
    file,
    preview,
    caption,
    isLoading,
    uploadProgress,
    error,
    handleFileSelect,
    handleGenerateCaption,
    handleReset,
  };
};

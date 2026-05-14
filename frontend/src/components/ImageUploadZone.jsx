import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, X, FileImage } from 'lucide-react';
import { formatFileSize } from '../utils/helpers';

/**
 * Drag-and-drop / click-to-upload image zone with preview.
 */
const ImageUploadZone = ({ file, preview, onFileSelect, onReset, isLoading }) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) onFileSelect(droppedFile);
    },
    [onFileSelect]
  );

  const handleInputChange = useCallback(
    (e) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) onFileSelect(selectedFile);
      // Reset input so same file can be re-selected
      e.target.value = '';
    },
    [onFileSelect]
  );

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!preview ? (
          /* ===== Drop Zone (no image selected) ===== */
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative w-full min-h-[280px] rounded-2xl cursor-pointer
              flex flex-col items-center justify-center gap-4 p-8
              border-2 border-dashed transition-all duration-300
              ${
                isDragging
                  ? 'border-accent-purple bg-accent-purple/5 scale-[1.02]'
                  : 'border-dark-400 hover:border-dark-300 hover:bg-white/[0.02]'
              }`}
          >
            <motion.div
              animate={isDragging ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 flex items-center justify-center mb-2">
                <Upload className="w-7 h-7 text-accent-purple" />
              </div>
            </motion.div>

            <div className="text-center">
              <p className="text-white font-medium mb-1">
                {isDragging ? 'Drop your image here' : 'Drag & drop your image here'}
              </p>
              <p className="text-sm text-dark-300">
                or <span className="text-accent-purple hover:underline">click to browse</span>
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-dark-400">
              <Image className="w-3.5 h-3.5" />
              <span>JPEG, PNG, WebP, GIF, BMP • Max 10MB</span>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
              id="image-upload-input"
            />
          </motion.div>
        ) : (
          /* ===== Image Preview ===== */
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative w-full rounded-2xl overflow-hidden glass"
          >
            {/* Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-dark-800">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain"
              />

              {/* Gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-dark-800/90 to-transparent" />
            </div>

            {/* File Info Bar */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <FileImage className="w-5 h-5 text-accent-purple" />
                <div>
                  <p className="text-sm text-white font-medium truncate max-w-[200px] sm:max-w-[300px]">
                    {file?.name}
                  </p>
                  <p className="text-xs text-dark-300">
                    {file && formatFileSize(file.size)}
                  </p>
                </div>
              </div>

              {/* Reset Button */}
              {!isLoading && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onReset}
                  className="p-2 rounded-full hover:bg-red-500/10 text-dark-300 hover:text-red-400 transition-colors duration-200"
                  title="Remove image"
                  id="remove-image-btn"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUploadZone;

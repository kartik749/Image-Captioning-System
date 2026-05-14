import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, RotateCcw, Sparkles } from 'lucide-react';
import { useImageCaption } from '../hooks/useImageCaption';
import ImageUploadZone from '../components/ImageUploadZone';
import LoadingAnimation from '../components/LoadingAnimation';
import CaptionDisplay from '../components/CaptionDisplay';

/**
 * The main "Generate Caption" section — houses the upload zone,
 * generate button, loading state, and caption output.
 */
const GenerateSection = () => {
  const {
    file,
    preview,
    caption,
    isLoading,
    uploadProgress,
    error,
    handleFileSelect,
    handleGenerateCaption,
    handleReset,
  } = useImageCaption();

  return (
    <section id="generate" className="relative py-24">
      <div className="section-container max-w-3xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-4">
            <Wand2 className="w-3.5 h-3.5 text-accent-purple" />
            <span className="text-xs text-dark-100 font-medium uppercase tracking-wider">
              Caption Generator
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-display)] text-white mb-3">
            Generate Your Caption
          </h2>
          <p className="text-dark-200 max-w-md mx-auto text-base">
            Upload an image and let our AI describe it for you in natural language.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="glass-strong rounded-3xl p-5 sm:p-8"
        >
          <div className="flex flex-col gap-5">
            {/* Upload Zone */}
            <ImageUploadZone
              file={file}
              preview={preview}
              onFileSelect={handleFileSelect}
              onReset={handleReset}
              isLoading={isLoading}
            />

            {/* Action Buttons */}
            {preview && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(139,92,246,0.25)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerateCaption}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5
                    rounded-xl text-base font-semibold
                    bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan text-white
                    shadow-lg shadow-accent-purple/20
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-shadow duration-300 cursor-pointer"
                  id="generate-caption-btn"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate Caption
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-6 py-3.5
                    rounded-xl text-sm font-medium
                    glass text-dark-200 hover:text-white transition-colors duration-200 cursor-pointer"
                  id="reset-btn"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear
                </motion.button>
              </motion.div>
            )}

            {/* Loading State */}
            <AnimatePresence>
              {isLoading && <LoadingAnimation uploadProgress={uploadProgress} />}
            </AnimatePresence>

            {/* Error Display */}
            <AnimatePresence>
              {error && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                >
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Caption Result */}
            <AnimatePresence>
              {caption && !isLoading && <CaptionDisplay caption={caption} />}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GenerateSection;

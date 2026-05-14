import { motion } from 'framer-motion';
import { Loader2, Brain } from 'lucide-react';

/**
 * AI Loading animation shown while the caption is being generated.
 * Features a pulsing brain icon and shimmer bars.
 */
const LoadingAnimation = ({ uploadProgress }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full glass rounded-2xl p-8"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Pulsing Brain Icon */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full border-2 border-accent-purple/20 border-t-accent-purple flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Brain className="w-7 h-7 text-accent-purple" />
            </motion.div>
          </motion.div>

          {/* Orbiting dots */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-accent-cyan"
              style={{ top: '50%', left: '50%' }}
              animate={{
                x: [0, Math.cos((i * 2 * Math.PI) / 3) * 35, 0],
                y: [0, Math.sin((i * 2 * Math.PI) / 3) * 35, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Status Text */}
        <div className="text-center">
          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white font-medium mb-1"
          >
            {uploadProgress > 0 && uploadProgress < 100
              ? 'Uploading image...'
              : 'Analyzing image with AI...'}
          </motion.p>
          <p className="text-sm text-dark-300">
            {uploadProgress > 0 && uploadProgress < 100
              ? `${uploadProgress}% uploaded`
              : 'This may take a few seconds'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs">
          {uploadProgress > 0 && uploadProgress < 100 ? (
            <div className="w-full h-1.5 bg-dark-600 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          ) : (
            /* Shimmer lines */
            <div className="space-y-2">
              {[100, 80, 60].map((w, i) => (
                <motion.div
                  key={i}
                  className="shimmer rounded-full"
                  style={{ width: `${w}%`, height: '8px' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;

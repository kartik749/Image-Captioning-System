import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Wand2 } from 'lucide-react';

/**
 * Hero section — the opening splash with gradient text and CTAs.
 */
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="section-container flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <div className="pulse-dot" />
          <span className="text-xs sm:text-sm text-dark-100 font-medium">
            Powered by BLIP Vision AI
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-[var(--font-display)] leading-[1.1] mb-6 max-w-4xl"
        >
          <span className="text-white">Transform Images into</span>
          <br />
          <span className="gradient-text">Intelligent Captions</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-base sm:text-lg text-dark-200 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Upload any image and let our state-of-the-art AI model generate
          descriptive, accurate captions in seconds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <motion.a
            href="#generate"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(139,92,246,0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold
              bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan text-white
              shadow-xl shadow-accent-purple/25 transition-shadow duration-300 w-full sm:w-auto"
          >
            <Wand2 className="w-5 h-5" />
            Generate Caption
          </motion.a>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-medium
              glass text-dark-100 hover:text-white transition-colors duration-300 w-full sm:w-auto"
          >
            <Sparkles className="w-4 h-4" />
            Explore Features
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-5 h-5 text-dark-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

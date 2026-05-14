import { motion } from 'framer-motion';
import { Sparkles, Brain, Zap } from 'lucide-react';

/**
 * Navbar — fixed top with glass effect.
 * Uses section-container for alignment matching all other sections.
 */
const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-50 glass"
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 flex-shrink-0"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <Brain className="w-6 h-6 text-accent-purple" />
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3 text-accent-cyan" />
              </motion.div>
            </div>
            <span className="text-lg font-bold font-[var(--font-display)] gradient-text">
              CaptionAI
            </span>
          </motion.a>

          {/* Nav Links */}
          <div className="hidden sm:flex items-center gap-8">
            {['Features', 'Generate', 'About'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-dark-200 hover:text-white transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="#generate"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
              bg-gradient-to-r from-accent-purple to-accent-blue text-white flex-shrink-0
              shadow-lg shadow-accent-purple/20 hover:shadow-accent-purple/40 transition-shadow duration-300"
          >
            <Zap className="w-3.5 h-3.5" />
            Try Now
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

import { motion } from 'framer-motion';
import { Brain, Globe, Heart, Mail } from 'lucide-react';

/**
 * Footer with branding, technology links, and social icons.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="about" className="relative py-16 border-t border-white/5">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-accent-purple" />
              <span className="text-lg font-bold font-[var(--font-display)] gradient-text">
                CaptionAI
              </span>
            </div>
            <p className="text-sm text-dark-300 leading-relaxed max-w-xs">
              Transform your images into intelligent captions using
              state-of-the-art deep learning technology.
            </p>
          </div>

          {/* Technology Column */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Technology
            </h4>
            <ul className="space-y-2.5 text-sm text-dark-300">
              <li>BLIP Vision Model</li>
              <li>FastAPI Backend</li>
              <li>React + Vite Frontend</li>
              <li>PyTorch Inference</li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-dark-300 hover:text-white transition-colors duration-200"
              >
                <Globe className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-dark-300 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-dark-400">
            © {currentYear} CaptionAI. All rights reserved.
          </p>
          <p className="text-xs text-dark-400 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400" /> using React & FastAPI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

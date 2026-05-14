import { motion } from 'framer-motion';
import { Upload, Brain, Zap, Shield, Image, Sparkles, Copy } from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Drag & Drop Upload',
    description: 'Simply drag your image or click to browse. Supports JPEG, PNG, WebP, GIF, and more.',
    color: '#8b5cf6',
  },
  {
    icon: Brain,
    title: 'AI-Powered Captions',
    description: 'Leveraging BLIP deep learning model fine-tuned for accurate and natural image descriptions.',
    color: '#3b82f6',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get your captions generated in seconds with optimized model inference.',
    color: '#06b6d4',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your images are processed locally on the server and never stored or shared.',
    color: '#10b981',
  },
  {
    icon: Image,
    title: 'Multi-Format Support',
    description: 'Upload images in any common format — JPEG, PNG, GIF, WebP, BMP, and TIFF.',
    color: '#ec4899',
  },
  {
    icon: Copy,
    title: 'Easy Export',
    description: 'Copy captions to clipboard instantly or download them as text files.',
    color: '#f59e0b',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/**
 * Features section with animated cards in a responsive grid.
 */
const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
            <span className="text-xs text-dark-100 font-medium uppercase tracking-wider">
              Features
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-display)] text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-dark-200 max-w-md mx-auto text-base">
            A complete AI-powered captioning solution designed for the best user experience.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group glass rounded-2xl p-6 hover:border-white/10 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <feature.icon
                  className="w-5 h-5 transition-colors duration-300"
                  style={{ color: feature.color }}
                />
              </div>

              {/* Content */}
              <h3 className="text-base font-semibold text-white mb-2 font-[var(--font-display)]">
                {feature.title}
              </h3>
              <p className="text-sm text-dark-200 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

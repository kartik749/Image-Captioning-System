import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, CheckCheck, Quote, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { downloadAsTextFile } from '../utils/helpers';

/**
 * Displays the generated caption with a typing animation,
 * plus copy & download action buttons.
 */
const CaptionDisplay = ({ caption }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [copied, setCopied] = useState(false);

  // Typing animation effect
  useEffect(() => {
    if (!caption) {
      setDisplayedText('');
      setIsTypingDone(false);
      return;
    }

    setDisplayedText('');
    setIsTypingDone(false);
    let index = 0;

    const interval = setInterval(() => {
      if (index < caption.length) {
        setDisplayedText(caption.slice(0, index + 1));
        index++;
      } else {
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, 35); // Typing speed

    return () => clearInterval(interval);
  }, [caption]);

  // Copy to clipboard
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      toast.success('Caption copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy caption.');
    }
  }, [caption]);

  // Download as text file
  const handleDownload = useCallback(() => {
    downloadAsTextFile(caption, 'ai-caption.txt');
    toast.success('Caption downloaded!');
  }, [caption]);

  if (!caption) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Card */}
      <div className="glass-strong rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-white/5">
          <Sparkles className="w-4 h-4 text-accent-cyan" />
          <span className="text-xs font-medium text-dark-100 uppercase tracking-wider">
            Generated Caption
          </span>
        </div>

        {/* Caption Text */}
        <div className="px-6 py-6">
          <div className="flex gap-3">
            <Quote className="w-5 h-5 text-accent-purple/40 flex-shrink-0 mt-0.5" />
            <p className="text-lg sm:text-xl text-white leading-relaxed font-[var(--font-display)]">
              {displayedText}
              {!isTypingDone && <span className="typing-cursor" />}
            </p>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-2 px-6 py-3 border-t border-white/5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
              text-dark-200 hover:text-white hover:bg-white/5 transition-all duration-200"
            id="copy-caption-btn"
          >
            {copied ? (
              <CheckCheck className="w-4 h-4 text-accent-emerald" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? 'Copied!' : 'Copy'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
              text-dark-200 hover:text-white hover:bg-white/5 transition-all duration-200"
            id="download-caption-btn"
          >
            <Download className="w-4 h-4" />
            Download
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CaptionDisplay;

import { motion } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import GenerateSection from './pages/GenerateSection';
import Footer from './components/Footer';

/**
 * Root application component.
 * Assembles all sections into a single-page AI captioning app.
 */
function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full overflow-x-hidden"
    >
      {/* Animated background layer */}
      <AnimatedBackground />

      {/* Content layer */}
      <div className="relative z-10 w-full">
        <Navbar />
        <main className="w-full">
          <HeroSection />
          <FeaturesSection />
          <GenerateSection />
        </main>
        <Footer />
      </div>
    </motion.div>
  );
}

export default App;

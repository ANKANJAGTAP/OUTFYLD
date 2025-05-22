import { ThemeProvider } from './contexts/ThemeContext';
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import SignupForm from './components/SignupForm';
import Footer from './components/Footer';
import TriviaTicker from './components/TriviaTicker';
import CountdownTimer from './components/CountdownTimer';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import About2 from './components/About2signup';

// Define a common page transition variant
const pageVariants = {
  initial: {
    opacity: 0,
    x: 100,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    x: -100,
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: 'easeIn'
    }
  }
};

const App = () => {
  const location = useLocation();

  return (
    <ThemeProvider>
      <div className="min-h-screen relative overflow-hidden">
      <Navbar />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <main className="container mx-auto px-4 pb-20">
                      <CountdownTimer />
                      <Timeline />
                      <section className="my-16">
                        <SignupForm />
                      </section>
                      <section className="my-16">
                        <TriviaTicker />
                      </section>
                    </main>
                  </>
                }
              />

              <Route
                path="/signup"
                element={
                  <>
                    <main className="container mx-auto px-4 pb-20">
                      <About2 />
                    </main>
                  </>
                }
              />

              <Route
                path="/about"
                element={
                  <About />
                }
              />

              <Route
                path="/contact"
                element={
                  <Contact />
                }
              />
            </Routes>
          </motion.div>
        </AnimatePresence>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;

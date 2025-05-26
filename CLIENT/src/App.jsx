import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import SignupForm from "./components/SignupForm";
import Footer from "./components/Footer";
import TriviaTicker from "./components/TriviaTicker";
import CountdownTimer from "./components/CountdownTimer";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import About2 from "./components/About2signup";
import LandingPage from "./components/Landingpage";

const pageVariants = {
  initial: { opacity: 0, x: 100, scale: 0.95 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -100,
    scale: 0.95,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const App = () => {
  const location = useLocation();

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };
  const particlesLoaded = (container) => {
    /* debug if you like */
  };

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          pointerEvents: "none",
        }}
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          background: { color: "#000000" },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { enable: true, color: "#ffffff", distance: 150 },
            move: { enable: true, speed: 2 },
            number: { value: 50 },
            size: { value: 3 },
          },
        }}
      />

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
                      <LandingPage />

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
                    <main className="container mx-auto px-4 pb-20">
                      <About2 />
                    </main>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </motion.div>
          </AnimatePresence>

          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const images = [
    "https://images.unsplash.com/photo-1617696618050-b0fef0c666af?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593766787879-e8c78e09cbbe?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566920989005-c4c3e239c12c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1728536909253-a84ce4750d33?w=2070&q=80&auto=format&fit=crop&ixlib=rb-4.1.0",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonRef = useRef(null);
  const overlayRef = useRef(null);

  const text = "OUTFYLD IS COMING SOON";
  const headingChars = text.split("");
  const subwords = "Reserve your favourite turf, find your favourite pitch in seconds. Never miss a game with real-time availability.".split(" ");

  // Background image rotation
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Overlay & section scale animation
  useLayoutEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { scale: 1.05 },
      { scale: 1, duration: 6, ease: "power3.out" }
    );
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.inOut" }
    );
  }, [currentImageIndex]);

  // Entrance animation for text & button
  useLayoutEffect(() => {
    gsap.set([headingRef.current, subheadingRef.current, buttonRef.current], { opacity: 1 });
    const tl = gsap.timeline();
    tl.fromTo(
      headingRef.current.querySelectorAll("span"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.03, duration: 0.6, ease: "power3.out" }
    )
      .fromTo(
        subheadingRef.current.querySelectorAll("span"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        buttonRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "elastic.out(1, 0.5)" },
        "-=0.2"
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[500px] h-[100svh] bg-center bg-cover transition-all duration-1000 overflow-hidden"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"
      />

      <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
        {/* allow full width on large screens so heading won't wrap */}
        <div className="max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto space-y-5 sm:space-y-8 md:space-y-10">
          {/* Responsive Heading */}
          <h1
            ref={headingRef}
            className="
              text-white
              text-2xl        /* base: very small devices */
              sm:text-3xl     /* ≥640px */
              md:text-5xl     /* ≥768px */
              lg:text-6xl     /* ≥1024px */
              xl:text-7xl     /* ≥1280px */
              2xl:text-8xl    /* ≥1536px */
              font-extrabold
              tracking-tight
              leading-snug
              md:whitespace-nowrap  /* prevent wrapping on md+ */
            "
          >
            {headingChars.map((char, i) => (
              <span key={i} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          {/* Responsive Subheading */}
          <p
            ref={subheadingRef}
            className="
              text-gray-200
              text-xs        /* base */
              sm:text-sm     /* ≥640px */
              md:text-base   /* ≥768px */
              lg:text-lg     /* ≥1024px */
              xl:text-xl     /* ≥1280px */
              2xl:text-2xl   /* ≥1536px */
              font-medium
              leading-relaxed
              max-w-3xl
              mx-auto
            "
          >
            {subwords.map((word, i) => (
              <span key={i} className="inline-block mr-1">
                {word}
              </span>
            ))}
          </p>

          {/* CTA Button */}
          <div className="mt-8 sm:mt-10 md:mt-12">
            <a
              href="/signup"
              ref={buttonRef}
              className="
                inline-block
                w-full sm:w-auto
                text-center
                px-6 sm:px-8
                py-4 sm:py-5
                text-base md:text-lg
                font-bold
                rounded-full
                bg-[#136d15]
                text-white
                shadow-[0_0_20px_rgba(0,230,118,0.5)]
                hover:shadow-[0_0_30px_rgba(0,230,118,0.8)]
                hover:bg-[#158017]
                transform hover:scale-105
                transition-all duration-300
              "
            >
              Get Notified!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

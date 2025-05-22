import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { quarter: "Q1 2025", title: "Platform Launch", description: "Initial platform release with core booking features" },
  { quarter: "Q2 2025", title: "Mobile App", description: "Native mobile applications for iOS and Android" },
  { quarter: "Q3 2025", title: "League Integration", description: "Seamless integration with local sports leagues" },
  { quarter: "Q4 2025", title: "Global Expansion", description: "Expansion to international markets" },
];

const Timeline = () => {
  const timelineRef = useRef(null);
  const milestonesRef = useRef([]);

  useEffect(() => {
    if (!timelineRef.current) return;

    // Immediately show the first milestone (no delay)
    if (milestonesRef.current[0]) {
      gsap.set(milestonesRef.current[0], { opacity: 1, y: 0 });
    }

    // Animate the timeline line with gradient
    gsap.fromTo(
      ".timeline-line",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
      }
    );

    // Timeline to reveal milestones with stagger
    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top top",
        end: `+=${milestones.length * 250}px`, // reduced scroll length
        scrub: 0.7,                           // faster scrub
        snap: 1 / (milestones.length - 1),
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate all milestones with stagger, skipping the first because it's visible already
    revealTl.fromTo(
      milestonesRef.current.slice(1),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.3,
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      revealTl.kill();
    };
  }, []);

  return (
    <section
      ref={timelineRef}
      className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-charcoal px-6 sm:px-12"
    >
      <h2 className="mt-8 text-3xl sm:text-4xl font-bold text-center mb-12 text-charcoal dark:text-white tracking-wide">
        ROADMAP
      </h2>

      <div className="relative w-full max-w-6xl">
        {/* Timeline line with gradient and rounded edges */}
        <div
          className="timeline-line absolute top-10 left-0 right-0 h-2 rounded-full origin-left"
          style={{
            background: "linear-gradient(90deg, #00e676, #00b33c)",
            boxShadow: "0 0 12px rgba(0, 230, 118, 0.7)",
          }}
        />

        {/* Milestones grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-16">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              ref={(el) => (milestonesRef.current[index] = el)}
              className="relative pt-16 opacity-0 transform transition-opacity duration-500"
            >
              {/* Marker */}
              <div
                className="
                absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                w-12 h-12 rounded-full bg-neonGreen shadow-[0_0_15px_rgba(0,230,118,0.6)]
                flex items-center justify-center
                transition-transform duration-300
              "
              >
                <span className="text-white text-lg font-semibold select-none">
                  {index + 1}
                </span>
              </div>

              {/* Content card */}
              <div
                className="
                bg-white dark:bg-charcoal
                shadow-md dark:shadow-[0_0_20px_rgba(0,230,118,0.15)]
                rounded-lg p-8 border border-lightGray/20 dark:border-lightGray/10
                hover:shadow-lg hover:dark:shadow-[0_0_25px_rgba(0,230,118,0.4)]
                transition-shadow duration-300
                h-full flex flex-col
              "
              >
                <span className="inline-block mb-3 px-4 py-1 bg-lightGray/20 dark:bg-lightGray/10 text-sm font-semibold rounded-full text-charcoal dark:text-lightGray tracking-wide">
                  {milestone.quarter}
                </span>
                <h3 className="text-2xl font-bold mb-3 text-charcoal dark:text-white">
                  {milestone.title}
                </h3>
                <p className="text-charcoal/90 dark:text-lightGray leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;


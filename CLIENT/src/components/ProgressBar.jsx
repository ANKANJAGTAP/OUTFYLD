import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProgressBar = ({ progress, text }) => {
  const progressRef = useRef(null);
  const barRef = useRef(null);
  const pulseDotRef = useRef(null);

  useEffect(() => {
    if (barRef.current && progressRef.current && pulseDotRef.current) {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: progress / 100,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: progressRef.current,
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(
        pulseDotRef.current,
        { left: "0%" },
        {
          left: `${progress}%`,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: progressRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, [progress]);

  return (
    <div 
      ref={progressRef} 
      className="max-w-3xl mx-auto" 
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={text}
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-charcoal dark:text-white">{text}</h3>
      </div>

      <div className="relative h-6 bg-lightGray/30 dark:bg-lightGray/10 rounded-full overflow-hidden">
        {/* Progress bar fill */}
        <div 
          ref={barRef}
          className="absolute top-0 left-0 h-full bg-neonGreen origin-left rounded-full"
          style={{ width: '100%', transform: `scaleX(${progress / 100})` }}
        ></div>

        {/* Pulse dot */}
        <div 
          ref={pulseDotRef}
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(0,230,118,0.8)] animate-pulse-glow"
          style={{ left: `calc(${progress}% - 0.5rem)` }}
        ></div>

        {/* Percentage markers */}
        <div className="absolute top-full left-0 right-0 flex justify-between pt-2 text-xs text-charcoal/70 dark:text-lightGray/70">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

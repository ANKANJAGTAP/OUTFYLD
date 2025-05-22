import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const STORAGE_KEY = "countdown-deadline";

const CountdownTimer = ({ targetDate }) => {
  // Get or generate deadline
  const getDeadline = () => {
    if (targetDate) {
      return new Date(targetDate);
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const ms = parseInt(stored, 10);
      if (!isNaN(ms)) return new Date(ms);
    }

    const newDeadline = new Date(Date.now() + 20 * 24 * 60 * 60 * 1000);
    localStorage.setItem(STORAGE_KEY, String(newDeadline.getTime()));
    return newDeadline;
  };

  const deadline = useRef(getDeadline()).current;

  // Calculate time left
  const calculateTimeLeft = () => {
    const diff = +deadline - Date.now();
    if (diff > 0) {
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [flipped, setFlipped] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });
  const containerRef = useRef(null);

  // Update every second
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(prev => {
        const newTL = calculateTimeLeft();
        setFlipped(pf => ({
          days: newTL.days !== prev.days ? !pf.days : pf.days,
          hours: newTL.hours !== prev.hours ? !pf.hours : pf.hours,
          minutes: newTL.minutes !== prev.minutes ? !pf.minutes : pf.minutes,
          seconds: newTL.seconds !== prev.seconds ? !pf.seconds : pf.seconds,
        }));
        return newTL;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Entry animation
  useLayoutEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  // Time unit block
  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center mx-1 sm:mx-2">
      <div className="
        w-16 h-16
        xs:w-20 xs:h-20
        sm:w-24 sm:h-24
        md:w-28 md:h-28
        lg:w-32 lg:h-32
        mb-2 flex justify-center items-center
        border-2 border-neonGreen rounded-lg
        text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold
        text-neonGreen
      ">
        {value.toString().padStart(2, "0")}
      </div>
      <span className="text-[10px] xs:text-xs sm:text-sm md:text-base uppercase tracking-wider text-charcoal dark:text-lightGray">
        {label}
      </span>
    </div>
  );

  // Final render
  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full px-2 sm:px-4 flex flex-col justify-center items-center text-center"
    >
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-8 text-charcoal dark:text-white">
        KICKOFF IN
      </h2>
      <div className="flex flex-nowrap justify-center gap-x-2 sm:gap-x-4 overflow-x-auto px-2">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </section>
  );
};

export default CountdownTimer;

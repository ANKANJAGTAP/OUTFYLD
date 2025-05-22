import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const triviaFacts = [
  "The first artificial turf field was installed in 1966 at the Houston Astrodome",
  "The average soccer field covers about 76,000 square feet",
  "A regulation NFL field is exactly 120 yards long including end zones",
  "The largest sports venue in the world is the Indianapolis Motor Speedway",
  "The first basketball court was less than half the size of today's courts"
];

const TriviaTicker = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const tickerRef = useRef(null);
  const factRef = useRef(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (factRef.current) {
        // Animate fact out
        gsap.to(factRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          onComplete: () => {
            setCurrentFactIndex(prevIndex => 
              prevIndex === triviaFacts.length - 1 ? 0 : prevIndex + 1
            );
            // Animate new fact in
            gsap.fromTo(
              factRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5 }
            );
          }
        });
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      ref={tickerRef}
      className="max-w-3xl mx-auto scoreboard px-4 py-3 text-center"
    >
      <div className="flex items-center justify-center">
        <div className="inline-block mr-3 font-bold text-white">DID YOU KNOW?</div>
        <div 
          ref={factRef} 
          className="inline-block font-bold text-white"
        >
          {triviaFacts[currentFactIndex]}
        </div>
      </div>
    </div>
  );
};

export default TriviaTicker;

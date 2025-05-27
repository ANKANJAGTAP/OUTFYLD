import { useState, useEffect, useRef } from "react";
import "../css/mainPage.css";
import { useNavigate } from "react-router-dom";
import ThreeDScene from "./starfield";
import { motion } from 'framer-motion';

export default function MainPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState(0);
  const [floatOffset, setFloatOffset] = useState(0);
  const [targetOffset, setTargetOffset] = useState(0);
  const [imageRotation, setImageRotation] = useState(0);
  const [tiltTimeout, setTiltTimeout] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 400, height: 300 });
  const [bigThrustersSize, setBigThrustersSize] = useState({ width: 95 });
  const [smallThrustersSize, setSmallThrustersSize] = useState({ width: 70 });
  const [mainThrusterSize, setMainThrusterSize] = useState({ width: 45 });
  const [starSpeed, setStarSpeed] = useState(0.2);
  const [starSize, setStarSize] = useState(0.15);

  const navigate = useNavigate();
  const shipWrapperRef = useRef(null);
  const shipRef = useRef(null);
  const soundRef = useRef(new Audio("/music/spaceship-passing-by.mp3"));

  useEffect(() => {
    // soundRef.current.play()

    const updateSizes = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let newImageWidth, newImageHeight;

      if (screenWidth < 640) {
        setStarSize(0.15);
        // Mobile
        newImageWidth = Math.min(screenWidth * 0.8, 300);
      } else if (screenWidth < 1024) {
        // Tablet
        newImageWidth = Math.min(screenWidth * 0.6, 400);
      } else {
        setStarSpeed(0.2);
        setStarSize(0.25);
        // Desktop

        newImageWidth = Math.min(screenWidth * 0.4, 500);
      }
      newImageHeight = newImageWidth * 0.75;

      setImageSize({ width: newImageWidth, height: newImageHeight });
      setBigThrustersSize({ width: newImageWidth * 0.24 });
      setSmallThrustersSize({ width: newImageWidth * 0.18 });
      setMainThrusterSize({ width: newImageWidth * 0.11 });
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const newOffset = ((clientX - screenWidth / 2) / (screenWidth / 2)) * 600;
    setTargetOffset(newOffset);

    if (clientX < screenWidth / 2) {
      applyTilt("left");
    } else {
      applyTilt("right");
    }
  };

  const applyTilt = (direction) => {
    const tiltAngle = direction === "left" ? -3 : 3;

    setImageRotation(tiltAngle);

    if (tiltTimeout) clearTimeout(tiltTimeout);

    const timeout = setTimeout(() => {
      setImageRotation(0);
    }, 2000);

    setTiltTimeout(timeout);
  };

  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
      setFloatOffset((prev) => {
        if (prev >= 25) direction = -1;
        if (prev <= -25) direction = 1;
        return prev + direction;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) => {
        if (Math.abs(targetOffset - prevOffset) < 0.5) {
          return targetOffset;
        }
        return prevOffset + (targetOffset - prevOffset) * 0.1;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [targetOffset]);

  const handleButtonClick = (val) => {
    // console.log("Btn clicked")
    if (!shipWrapperRef.current) return;
  
   
    soundRef.current.pause();
    soundRef.current.currentTime = 0;

    soundRef.current.play().catch((error) => {
      console.error("Audio play failed:", error);
    });

    
  
    setTimeout(() => {
      if (!shipWrapperRef.current) return;
      shipWrapperRef.current.style.animation = "none";
      void shipWrapperRef.current.offsetWidth;
      shipWrapperRef.current.classList.add("gofast");
    }, 2000);
  
    setTimeout(() => {
      val === 0 ? navigate("/ball-simulation") : navigate("/signup");
    }, 3500);
  
    setTimeout(() => {
      if (!shipWrapperRef.current) return;
      shipWrapperRef.current.classList.add("rmPlane");
    }, 3000);
  
    setTimeout(() => {
      if (!shipWrapperRef.current) return;
      shipWrapperRef.current.classList.remove("gofast");
    }, 5000);
  };
  
 
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.pause();
        soundRef.current.currentTime = 0;
      }
    };
  }, [navigate]);
  

  const handleButtonHover = () => {
    setIsHovered(true);
    if (shipRef.current) {
      shipRef.current.classList.add("bounceFast");
    }

    setStarSpeed(0.6); 
  };

  const handleButtonLeave = () => {
    setIsHovered(false);
    if (shipRef.current) {
      void shipRef.current.offsetWidth;
      shipRef.current.classList.remove("bounceFast");
    }
    setStarSpeed(0.1); 
  };

  const spaceShipStyle = {
    transform: `translate(${Math.min(
      Math.max(offset, -(window.innerWidth - imageSize.width) / 2),
      (window.innerWidth - imageSize.width) / 2
    )}px, 
    ${Math.min(
      Math.max(floatOffset, -(window.innerHeight - imageSize.height) / 2),
      (window.innerHeight - imageSize.height) / 2
    )}px) rotate(${imageRotation}deg)`,
    transition: "transform 3.0s ease-out, rotate 1.0s ease-out",
    position: "relative",
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    MsUserSelect: "none",
    pointerEvents: "none",
   
    top: "10%",
    left: "0%",
    transformOrigin: "center center", 
  };

  return (
    <div
      className="flex flex-col justify-evenly md:justify-center w-screen md:h-screen h-screen text-center bg-transparent text-white relative"
      onMouseMove={handleMouseMove}
      style={{
        userSelect: "none",
        overflow: "hidden",
        height: "100vh", 
        position: "relative", 
      }}
    >
     
      <ThreeDScene
        speed={starSpeed}
        starSize={starSize}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />

      {/* Upper Content */}
      <div className="w-full h-screen flex flex-col justify-center items-center bg-transparent z-10 px-4 text-center">
      
      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: [1, 1.03, 1] }}
        transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        className="
          text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-400
          font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-4
          filter drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]
        "
      >
        Level Up Your E-Sports Booking
      </motion.h1>

      {/* Description */}
      <p className="max-w-xl text-gray-200 text-base md:text-lg lg:text-xl leading-relaxed mb-6">
        Discover, book, and dominate the arena with seamless scheduling, real-time stats, and community-driven challenges.
      </p>

      {/* Coming Soon */}
      <motion.h2
        initial={{ opacity: 0, y: -20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: [1, 1.04, 1] }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        className="
          text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500
          font-extrabold text-3xl md:text-5xl lg:text-6xl mb-8
          filter drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] drop-shadow-[0_0_20px_rgba(14,116,144,0.6)]
        "
      >
        OUTFYLD is Coming Soon!
      </motion.h2>

      {/* Get Notified Button */}
      <button
        className="
          font-medium uppercase text-white text-sm md:text-base lg:text-lg
          bg-gradient-to-r from-pink-500 to-purple-600
          hover:from-pink-600 hover:to-purple-700 transition duration-300
          py-3 px-6 rounded-full shadow-xl
          hover:shadow-[0_0_20px_rgba(236,72,153,0.6)]
        "
        onMouseEnter={handleButtonHover}
        onMouseLeave={handleButtonLeave}
        onClick={() => handleButtonClick(2)}
      >
        Get Notified
      </button>
    </div>
  
<div className="md:flex-1 flex h-1/4 justify-center md:items-center items-start relative z-20">
 
  <div ref={shipWrapperRef} style={spaceShipStyle}>
   
  </div>
</div>

    </div>
  );
}
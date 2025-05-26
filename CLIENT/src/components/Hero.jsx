import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float } from "@react-three/drei";
import gsap from "gsap";

function GameControllerModel(props) {
  const { scene } = useGLTF("/models/DamagedHelmet.glb");
  return <primitive object={scene} {...props} />;
}

function ModelRig({ mouse }) {
  const group = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rotationX = (e.clientX / window.innerWidth - 0.5) * (Math.PI * 0.5);
      const rotationY =
        (e.clientY / window.innerHeight - 0.5) * (Math.PI * 0.5);

      if (group.current) {
        gsap.to(group.current.rotation, {
          x: rotationY,
          y: rotationX,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {});

  return (
    <group ref={group}>
      <Float>
        <GameControllerModel scale={2.9} position={[0, 0.2, 0]} />
      </Float>
    </group>
  );
}

export default function HeroSection() {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const comingRef = useRef();
  const notifyRef = useRef();
  const buttonRef = useRef();

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(titleRef.current, { y: -50, opacity: 0, duration: 1 })
      .from(subtitleRef.current, { y: -30, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(
        comingRef.current,
        { scale: 0.8, opacity: 0, duration: 0.6 },
        "-=0.4"
      )
      .from(
        buttonRef.current,
        { scale: 0.8, opacity: 0, duration: 0.6 },
        "-=0.4"
      )
      .from(notifyRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.5");
  }, []);

  return (
    <section className="relative w-full h-screen pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-gray-900" />
      <div className="absolute inset-0 bg-black opacity-50 z-0" />

      <div className="absolute inset-0 z-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <ModelRig mouse={mouse} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 space-y-4">
        <h1
          ref={titleRef}
          className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
        >
          Level Up Your E-Sports Booking
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl lg:text-2xl text-white max-w-2xl"
        >
          Discover, book, and dominate the arena with seamless scheduling,
          real-time stats, and community-driven challenges.
        </p>
        <h2
          ref={comingRef}
          className="text-3xl lg:text-4xl font-semibold text-white"
        >
          OUTFYLD is Coming Soon!
        </h2>
        <button
          ref={notifyRef}
          className="px-6 py-3 font-semibold rounded-full border-2 border-white text-white hover:bg-white hover:text-gray-900 transition"
        >
          Get Notified
        </button>
        <button
          ref={buttonRef}
          className="relative px-8 py-4 font-semibold rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white overflow-hidden group"
        >
          <span className="relative z-20">Get Started</span>
          <span className="absolute inset-0 bg-white opacity-10 transform scale-0 group-hover:scale-100 transition-transform duration-500" />
        </button>
      </div>
    </section>
  );
}

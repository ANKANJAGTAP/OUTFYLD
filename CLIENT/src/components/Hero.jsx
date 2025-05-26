import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float } from '@react-three/drei';
import gsap from 'gsap';

// 3D Model Loader Component
function GameControllerModel(props) {
  const { scene } = useGLTF('/models/DamagedHelmet.glb');
  return <primitive object={scene} {...props} />;
}

// Wrap the model in a group and drive its rotation from mouse
function ModelRig({ mouse }) {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;
    // map x∈[-.5,.5] → y-rotation ∈[±0.5rad]
    // map y∈[-.5,.5] → x-rotation ∈[±0.3rad]
    const targetY = mouse.x * 0.5;
    const targetX = -mouse.y * 0.3;

    // lerp for smoothness
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.1;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.1;
  });

  return (
    <group ref={group}>
      <Float floatIntensity={2} rotationIntensity={0} speed={2}>
        <GameControllerModel scale={1.5} position={[0, -0.5, 0]} />
      </Float>
    </group>
  );
}

export default function HeroSection() {
  const titleRef   = useRef();
  const subtitleRef= useRef();
  const comingRef  = useRef();
  const notifyRef  = useRef();
  const buttonRef  = useRef();

  // store normalized mouse [-0.5, +0.5]
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(titleRef.current,    { y: -50, opacity: 0, duration: 1 });
    tl.from(subtitleRef.current, { y: -30, opacity: 0, duration: 0.8 }, '-=0.5');
    tl.from(comingRef.current,   { scale: 0.8, opacity: 0, duration: 0.6 }, '-=0.4');
    tl.from(buttonRef.current,   { scale: 0.8, opacity: 0, duration: 0.6 }, '-=0.4');
    tl.from(notifyRef.current,   { y: 20,   opacity: 0, duration: 0.6 }, '-=0.5');
  }, []);

  // update mouse pos on the canvas wrapper
  const handleMouseMove = e => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width  - 0.5;
    const y = 0.5 - (clientY - top) / height;
    setMouse({ x, y });
  };

  return (
    <section className="relative w-full h-screen pt-16 overflow-hidden">
      {/* Background gradient & overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-gray-900" />
      <div className="absolute inset-0 bg-black opacity-50 z-0" />

      {/* 3D Canvas that listens for mouse movement */}
      <div onMouseMove={handleMouseMove} className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          <Suspense fallback={null}>
            <ModelRig mouse={mouse} />
          </Suspense>

          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Overlay Content */}
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

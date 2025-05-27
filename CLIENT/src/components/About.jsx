import React from 'react';
import { Zap, Shield, BarChart, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

// Header Section
const HeaderSection = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-neonGreen mb-4 animate-fade-in">
      Outfyld Powering the Future of E-Sports Booking
      </h1>
      <p className="text-xl text-white max-w-3xl mx-auto">
      Effortlessly reserve your favorite gaming stations, assemble teams, and join curated tournaments—all in one platform.
      </p>
    </div>
  );
};

// About Section
const AboutSection = () => {
  return (
    <div className="mb-24">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg md:text-xl text-white leading-relaxed">
        OUTFYLD simplifies every step of your competitive gaming journey. Our platform gives you instant access to local and online arenas, intelligent team-and-opponent matchmaking so you always find the perfect squad or rival, and turnkey tournament management—wrapped in an intuitive app that keeps your season organized, competitive, and fun.        </p>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
      <div className="text-neonGreen  mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Feature Grid
const FeatureGrid = () => {
  const features = [
    {
      icon: <Zap size={32} />,
      title: "Instant Arena Booking",
      description: "Browse real-time availability of PC rigs, console pods, or custom lobbies and lock in your session in seconds—no phone calls or emails required."
    },
    {
      icon: <Shield size={32} />,
      title: "Secure Payments & Wallet",
      description: "Pay or get paid through in-app wallets, split entry fees with teammates, and track every transaction safely—so you can focus on the game."
    },
    {
      icon: <BarChart size={32} />,
      title: "Unified Dashboard",
      description: "Manage all your upcoming bookings, team invites, match results, and stat leaderboards from one intuitive interface."
    },
    {
      icon: <Users size={32} />,
      title: "Smart Player Matching",
      description: "Tap into our community pool to find teammates or opponents at your exact skill level and preferred game modes—so every match stays competitive"
    }
  ];

  return (
    <div className="mb-24">
      <h2 className="text-3xl font-bold text-neonGreen mb-10 text-center">What We Offer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

// Team Member Component
const TeamMember = ({ imageUrl, name, role, bio }) => {
  return (
    <div className="text-center">
      <div className="mb-4 mx-auto w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-charcoal dark:text-white">{name}</h3>
      <p className="text-neonGreen font-medium mb-2">{role}</p>
      <p className="text-charcoal dark:text-white max-w-sm mx-auto">{bio}</p>
    </div>
  );
};

// Team Grid
const TeamGrid = () => {
  const teamMembers = [
    {
      imageUrl: "./images/ankan.png",
      name: "Ankan Jagtap",
      role: "Co-Founder & CTO – Outfyld",
      bio: "He builds and powers the tech behind Outfyld. With strong development skills and an innovative mindset, he ensures the platform stays fast, scalable, and user-friendly. His tech leadership is at the core of Outfyld’s seamless experience"
    },
    {
      imageUrl: "./images/ashay.png",
      name: "Ashay Jog",
      role: "Co-Founder, CMO & CFO – Outfyld",
      bio: "He leads Outfyld’s brand and financial strategy with creativity and precision. As CMO and CFO, he drives growth through sharp marketing instincts and strong financial planning. His vision and leadership have played a key role in shaping Outfyld into a dynamic platform for Gen Z"
    },
    {
      imageUrl: "./images/siddesh.png",
      name: "Siddhesh Hadole",
      role: "Co-Founder & COO – Outfyld",
      bio: "He keeps Outfyld running efficiently and effectively. With a focus on smooth execution and strong operations, he turns strategy into action. His structured approach and drive keep the team aligned and the platform thriving"
    }
  ];

  return (
    <div className="mb-24">
      <h2 className="text-3xl font-bold text-neonGreen mb-10 text-center">Meet the Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            imageUrl={member.imageUrl}
            name={member.name}
            role={member.role}
            bio={member.bio}
          />
        ))}
      </div>
    </div>
  );
};

// Mission Section
const MissionSection = () => {
  return (
    <div className="mb-24 py-16 bg-neonGreen rounded-2xl text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
        <p className="text-xl text-white leading-relaxed">
        To unlock easy access to play by revolutionizing the way India books and experiences e-sports.
        We aim to empower young gamers by providing a smooth, tech-driven solution that brings people together through sport.
        </p>
      </div>
    </div>
  );
};

// Call to Action Section
const CtaSection = () => {
  return (
    <div className="text-center mb-24">
      <p className="text-lg text-white mb-8">
        Ready to transform how your team works?
      </p>
      <div className="mt-8 sm:mt-10 md:mt-12">
            <NavLink
              to="/signup"
              className="inline-block w-full sm:w-auto text-center px-6 sm:px-8 py-4 sm:py-5 text-base md:text-lg font-bold rounded-full bg-neonGreen  text-white shadow-[0_0_20px_rgba(0,230,118,0.5)] hover:shadow-[0_0_30px_rgba(0,230,118,0.8)] hover:bg-[#13586d] transform hover:scale-105 transition-all duration-300"
            >
              Get Notified!
            </NavLink>
          </div>
    </div>
  );
};

// Main About Page Component
const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 mt-24 md:mt-32 lg:mt-40">
      <HeaderSection />
      <AboutSection />
      <FeatureGrid />
      <TeamGrid />
      <MissionSection />
      <CtaSection />
    </div>
  );
};

export default AboutPage;

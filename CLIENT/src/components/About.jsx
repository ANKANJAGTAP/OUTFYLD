import React from 'react';
import { Zap, Shield, BarChart, Users } from 'lucide-react';

// Header Section
const HeaderSection = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white mb-4 animate-fade-in">
        Simplifying Complexity, Amplifying Results
      </h1>
      <p className="text-xl text-charcoal dark:text-white max-w-3xl mx-auto">
        Your platform for seamless digital transformation
      </p>
    </div>
  );
};

// About Section
const AboutSection = () => {
  return (
    <div className="mb-24">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg md:text-xl text-charcoal dark:text-white leading-relaxed">
          We provide enterprise-grade solutions that empower businesses to navigate digital challenges with confidence. 
          Our platform combines intuitive design with powerful technology, offering unparalleled efficiency for teams of all sizes.
        </p>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
      <div className="text-[#136d15] mb-4">{icon}</div>
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
      title: "Lightning Fast Setup",
      description: "Get your projects up and running in minutes with our streamlined onboarding process."
    },
    {
      icon: <Shield size={32} />,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance measures keep your data protected at all times."
    },
    {
      icon: <BarChart size={32} />,
      title: "Insightful Analytics",
      description: "Make data-driven decisions with our comprehensive analytics dashboard."
    },
    {
      icon: <Users size={32} />,
      title: "Seamless Collaboration",
      description: "Work together efficiently with real-time updates and intuitive sharing features."
    }
  ];

  return (
    <div className="mb-24">
      <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-10 text-center">What We Offer</h2>
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
      <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
      <p className="text-[#136d15] font-medium mb-2">{role}</p>
      <p className="text-charcoal dark:text-white max-w-sm mx-auto">{bio}</p>
    </div>
  );
};

// Team Grid
const TeamGrid = () => {
  const teamMembers = [
    {
      imageUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      name: "Sarah Chen",
      role: "CEO & Founder",
      bio: "Visionary leader with 15+ years experience transforming how enterprises leverage technology."
    },
    {
      imageUrl: "https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=800",
      name: "Alex Rivera",
      role: "CTO",
      bio: "Tech innovator focused on building scalable solutions that solve real-world problems."
    },
    {
      imageUrl: "https://images.pexels.com/photos/3760583/pexels-photo-3760583.jpeg?auto=compress&cs=tinysrgb&w=800",
      name: "Maya Johnson",
      role: "Head of Product",
      bio: "Product strategist dedicated to creating intuitive experiences that delight users."
    }
  ];

  return (
    <div className="mb-24">
      <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-10 text-center">Meet the Team</h2>
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
    <div className="mb-24 py-16 bg-[#136d15] rounded-2xl text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
        <p className="text-xl text-white leading-relaxed">
          Our mission is to empower organizations with technology that transforms challenges into opportunities, 
          enabling innovation that drives meaningful progress.
        </p>
      </div>
    </div>
  );
};

// Call to Action Section
const CtaSection = () => {
  return (
    <div className="text-center mb-24">
      <p className="text-lg text-charcoal dark:text-white mb-8">
        Ready to transform how your team works?
      </p>
      <div className="mt-8 sm:mt-10 md:mt-12">
            <a
              href="/notify"
              className="inline-block w-full sm:w-auto text-center px-6 sm:px-8 py-4 sm:py-5 text-base md:text-lg font-bold rounded-full bg-[#136d15] text-white shadow-[0_0_20px_rgba(0,230,118,0.5)] hover:shadow-[0_0_30px_rgba(0,230,118,0.8)] hover:bg-[#158017] transform hover:scale-105 transition-all duration-300"
            >
              Get Notified!
            </a>
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

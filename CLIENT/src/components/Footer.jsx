import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Twitter, Linkedin, MessageCircle } from 'lucide-react';

const socialLinks = [
  {
    icon: <Twitter className="w-5 h-5" />,
    url: "https://x.com/AnkanJagtap",
    label: "Follow us on Twitter"
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    url: 'https://linkedin.com/in/ankan-jagtap-384902367',
    label: "Connect on LinkedIn"
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    url: "https://www.instagram.com/outfyld?igsh=MTRkbm16bWRmYnc1bQ%3D%3D",
    label: "Join our Discord"
  }
];

const Footer = () => {
  const socialIconsRef = useRef([]);

  useEffect(() => {
    socialIconsRef.current.forEach((icon) => {
      if (icon) {
        const iconFront = icon.querySelector('.icon-front');
        const iconBack = icon.querySelector('.icon-back');

        const onEnter = () => {
          gsap.to(iconFront, {
            rotationY: 180,
            duration: 0.5,
            ease: "power2.out"
          });
          gsap.to(iconBack, {
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        };

        const onLeave = () => {
          gsap.to(iconFront, {
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out"
          });
          gsap.to(iconBack, {
            rotationY: -180,
            duration: 0.5,
            ease: "power2.out"
          });
        };

        icon.addEventListener('mouseenter', onEnter);
        icon.addEventListener('mouseleave', onLeave);

        // Clean-up
        return () => {
          icon.removeEventListener('mouseenter', onEnter);
          icon.removeEventListener('mouseleave', onLeave);
        };
      }
    });
  }, []);

  return (
    <footer className="py-10 bg-charcoal text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">OUTFYLD</h2>
            <p className="text-lightGray mt-2">The future of sports field booking</p>
          </div>

          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                ref={el => socialIconsRef.current[index] = el}
                href={link.url}
                aria-label={link.label}
                className="relative w-12 h-12 perspective"
              >
                {/* Front of the icon */}
                <div className="icon-front absolute inset-0 flex items-center justify-center bg-charcoal border-2 border-lightGray/30 rounded-full transition-all duration-300 backface-hidden">
                  {link.icon}
                </div>

                {/* Back of the icon */}
                <div className="icon-back absolute inset-0 flex items-center justify-center bg-neonGreen text-charcoal rounded-full transition-all duration-300 backface-hidden" style={{ transform: 'rotateY(-180deg)' }}>
                  {link.icon}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-lightGray/20 mt-10 pt-6 text-center text-lightGray text-sm">
          <p>&copy; {new Date().getFullYear()} OUTFYLD. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-neonGreen transition-colors">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-neonGreen transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

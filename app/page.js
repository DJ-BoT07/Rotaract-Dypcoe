"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Oswald } from 'next/font/google';
import dynamic from 'next/dynamic';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home as HomeIcon,
  Info, 
  Running, 
  Calendar, 
  MapPin, 
  Medal,
  Users,
  Heart,
  ExternalLink,
  PersonStanding,
  MapPinCheck,
  Menu,
  X,
  Route,
  Trophy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const oswald = Oswald({ subsets: ['latin'] });

// Dynamically import the Map component with no SSR
const MarathonMap = dynamic(() => import('@/components/MarathonMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

const carouselImages = [
  {
    src: "/carousel-1.jpg",
    title: "Welcome to Rotaract DYPCOE",
    description: "Empowering Youth Through Service & Leadership"
  },
  {
    src: "/carousel-2.png",
    title: "Join Our Community",
    description: "Make a Difference in Society by participating in community service, leadership development, and social initiatives. Together we can create positive change."
  },
  {
    src: "/carousel-3.png",
    title: "Marathon 2024",
    description: "Run for a Cause - Register Now for our annual charity marathon. Join hundreds of runners supporting education and youth empowerment. Every step makes a difference."
  }
];

function CustomCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 h-full w-full transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0'
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
            }`}
          >
            <div className="relative h-full w-full">
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover"
                priority={index === 0}
                quality={90}
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                <h1 className={`${oswald.className} text-4xl md:text-6xl font-bold mb-4 animate-fadeIn`}>
                  {image.title}
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl animate-slideUp">
                  {image.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 transition-all ${
              currentSlide === index 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/50'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/30 p-2 text-white hover:bg-white/50 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/30 p-2 text-white hover:bg-white/50 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const slideIn = {
  initial: { x: -60, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: { 
    x: 60, 
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: { 
    scale: 0.9, 
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar currentRoute="/" />

      {/* Hero Section with Custom Carousel */}
      <motion.section 
        id="home"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
        className="h-screen relative bg-gradient-to-b from-black/50 to-transparent"
      >
        <div className="h-full">
          <CustomCarousel />
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div 
              variants={slideIn}
              className="relative h-[300px] md:h-[600px] w-full group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl -rotate-6 scale-95 opacity-20 group-hover:rotate-0 group-hover:scale-100 transition-transform duration-300"></div>
            <Image
                src="/TEAM.png"
              alt="Rotaract Team"
              fill
                className="object-cover rounded-2xl shadow-xl group-hover:scale-[1.02] transition-transform duration-300"
              />
            </motion.div>
            <motion.div 
              variants={fadeIn}
              className="space-y-6 md:space-y-8"
            >
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
                <h2 className={`${oswald.className} text-3xl md:text-4xl font-bold text-amber-600 flex items-center gap-3 mb-6 md:mb-8`}>
                  <Users className="w-8 md:w-10 h-8 md:h-10" />
                  What is Rotaract DYPCOE?
                </h2>
                <div className="space-y-4 md:space-y-6">
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Rotaract DYPCOE is a dynamic community of young leaders at D.Y. Patil College of Engineering, 
              dedicated to making a positive impact through service and leadership. As part of Rotary International's 
              global network, we focus on professional development, community service, and international understanding.
            </p>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Our club organizes various initiatives including educational programs, health camps, and environmental 
              projects, providing members with opportunities to develop leadership skills while serving the community.
            </p>
                </div>
                <div className="pt-6 md:pt-8">
                  <Button 
                    className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 flex items-center justify-center gap-2 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    asChild
                  >
                    <a 
                      href="https://www.instagram.com/rotaract_dypcoe/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      About Our Community
                      <ExternalLink className="w-4 md:w-5 h-4 md:h-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-b from-white to-amber-50 border-t py-8 md:py-12"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
            <p className="flex items-center justify-center gap-2 text-gray-600 text-center px-4">
              <Heart className="w-4 md:w-5 h-4 md:h-5 text-amber-600 animate-pulse" />
              © 2024 Rotaract Club of DYPCOE. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

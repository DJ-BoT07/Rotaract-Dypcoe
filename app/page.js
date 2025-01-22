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
import EventCard from "@/components/EventCard";

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
                src="/rotaract2.jpg"
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
              dedicated to making a positive impact through service and leadership. As part of Rotary International&apos;s 
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

      {/* Event Gallery */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 px-4 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden"
        id="events"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <motion.h2 
            variants={fadeIn}
            className={`${oswald.className} text-3xl md:text-5xl font-bold text-center text-amber-600 mb-12 md:mb-16`}
          >
            Recent Events
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
            <EventCard 
              title="Rotaract Eye Checkup Camp"
              images={[
                '/eye_camp/img1.jpg',
                '/eye_camp/img2.jpg',
                '/eye_camp/img3.jpg',
                '/eye_camp/img4.jpg',
                '/eye_camp/img5.jpg',
                '/eye_camp/img6.jpg',
                '/eye_camp/img7.jpg',
                '/eye_camp/img8.jpg',
                '/eye_camp/img9.jpg',
                '/eye_camp/img10.jpg',
                '/eye_camp/img11.jpg'
              ]}
              description="A comprehensive eye health initiative providing free eye checkups and consultations to the community, promoting better vision care and awareness."
            />

            <EventCard 
              title="Rotaract River Cleaning Camp"
              images={[
                '/river_cleaning/img1.jpg',
                '/river_cleaning/img2.jpg',
                '/river_cleaning/img3.jpg',
                '/river_cleaning/img4.jpg',
                '/river_cleaning/img5.jpg',
                '/river_cleaning/img6.jpg',
              ]}
              description="An environmental conservation initiative where our team worked together to clean and protect our local river ecosystem, promoting environmental awareness."
            />
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-b from-white to-amber-50 border-t py-12 md:py-16"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-8 md:gap-12">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full max-w-4xl" id="contact">
              <div className="text-center space-y-2">
                <h4 className={`${oswald.className} text-lg font-semibold text-amber-600`}>
                  President 2024-25
                </h4>
                <p className="font-medium">Rtn. Suhas Dhamale</p>
                <p className="text-gray-600">Rotary Club of Nigdi, Pune</p>
                <a 
                  href="tel:+919881461001" 
                  className="text-amber-600 hover:text-amber-700 transition-colors"
                >
                  +91 9881461001
                </a>
              </div>

              <div className="text-center space-y-2">
                <h4 className={`${oswald.className} text-lg font-semibold text-amber-600`}>
                  Director of Runathon 2024-25
                </h4>
                <p className="font-medium">Rtn. Keshav Manage</p>
                <a 
                  href="tel:+919422522911" 
                  className="text-amber-600 hover:text-amber-700 transition-colors"
                >
                  +91 9422522911
                </a>
              </div>

              <div className="text-center space-y-2">
                <h4 className={`${oswald.className} text-lg font-semibold text-amber-600`}>
                  Co-Director of Runathon 2024-25
                </h4>
                <p className="font-medium">Rtn. Shashank Phadke</p>
                <a 
                  href="tel:+919823029488" 
                  className="text-amber-600 hover:text-amber-700 transition-colors"
                >
                  +91 9823029488
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a 
                href="https://www.facebook.com/rotaractdypcoe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-amber-600 transition-colors"
                aria-label="Facebook"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-6 h-6"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/rotaract_dypcoe/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-amber-600 transition-colors"
                aria-label="Instagram"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-6 h-6"
                >
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/>
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="flex items-center justify-center gap-2 text-gray-600">
                <Heart className="w-4 md:w-5 h-4 md:h-5 text-amber-600 animate-pulse" />
                © 2024 Rotaract Club of DYPCOE. All rights reserved.
              </p>
              <a 
                href="https://www.instagram.com/rotaract_dypcoe/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-700 transition-colors"
              >
                @rotaract_dypcoe
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

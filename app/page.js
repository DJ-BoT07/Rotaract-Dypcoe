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
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    description: "Make a Difference in Society"
  },
  {
    src: "/carousel-3.png",
    title: "Marathon 2024",
    description: "Run for a Cause - Register Now"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 50, 
          damping: 20,
          duration: 0.8
        }}
        className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b z-[100] shadow-sm"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <Image 
                src="/logo_rotract.JPG" 
                alt="Rotaract Logo" 
                width={40} 
                height={40}
                className="rounded-full shadow-md md:w-[50px] md:h-[50px]"
              />
              <span className={`${oswald.className} text-lg md:text-xl font-bold text-amber-600`}>
                Rotaract DYPCOE
              </span>
            </div>
            <div className="hidden md:flex gap-8">
              <a href="#home" className="text-gray-600 hover:text-amber-600 flex items-center gap-2 transition-colors">
                <HomeIcon className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </a>
              <a href="#about" className="text-gray-600 hover:text-amber-600 flex items-center gap-2 transition-colors">
                <Info className="w-5 h-5" />
                <span className="font-medium">About</span>
              </a>
              <a href="#marathon" className="text-gray-600 hover:text-amber-600 flex items-center gap-2 transition-colors">
                <PersonStanding className="w-5 h-5" />
                <span className="font-medium">Marathon</span>
              </a>
            </div>
            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden p-2 text-gray-600 hover:text-amber-600 transition-colors relative z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Container - Moved outside nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 z-[90]"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: {
                visibility: 'visible',
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              },
              closed: {
                visibility: 'hidden',
                transition: { staggerChildren: 0.05, staggerDirection: -1 }
              }
            }}
          >
            {/* Mobile Menu Overlay */}
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              variants={{
                open: { opacity: 1 },
                closed: { opacity: 0 }
              }}
              transition={{ duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div 
              className="fixed right-0 top-0 h-full w-[280px] bg-white shadow-xl"
              variants={{
                open: { 
                  x: 0,
                  transition: {
                    type: "spring",
                    damping: 30,
                    stiffness: 75,
                    duration: 0.8
                  }
                },
                closed: { 
                  x: "100%",
                  transition: {
                    type: "spring",
                    damping: 30,
                    stiffness: 75,
                    duration: 0.8
                  }
                }
              }}
            >
              <div className="flex flex-col h-full pt-16">
                <motion.div 
                  className="flex items-center justify-between p-4 border-b"
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Image 
                      src="/logo_rotract.JPG" 
                      alt="Rotaract Logo" 
                      width={40} 
                      height={40}
                      className="rounded-full shadow-sm"
                    />
                    <span className={`${oswald.className} text-lg font-bold text-amber-600`}>
                      Rotaract DYPCOE
                    </span>
                  </div>
                </motion.div>
                <div className="flex flex-col gap-2 p-4">
                  {[
                    { href: '#home', icon: <HomeIcon className="w-5 h-5" />, label: 'Home' },
                    { href: '#about', icon: <Info className="w-5 h-5" />, label: 'About' },
                    { href: '#marathon', icon: <PersonStanding className="w-5 h-5" />, label: 'Marathon' }
                  ].map((item, index) => (
                    <motion.a 
                      key={item.href}
                      href={item.href}
                      className="text-gray-600 hover:text-amber-600 flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                      variants={{
                        open: { 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: 0.2 + index * 0.1 }
                        },
                        closed: { 
                          opacity: 0, 
                          x: 20 
                        }
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </motion.a>
                  ))}
                </div>
                <motion.div 
                  className="mt-auto p-4 border-t"
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 }
                  }}
                >
                  <p className="text-sm text-gray-500 text-center">
                    © 2024 Rotaract Club of DYPCOE
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Marathon Section */}
      <motion.section 
        id="marathon"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-50/70 to-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          {/* Header Content */}
          <motion.div 
            variants={fadeIn}
            className="text-center mb-12 md:mb-20 space-y-6 md:space-y-8 max-w-4xl mx-auto"
          >
            <div className="inline-block">
              <h2 className={`${oswald.className} text-3xl md:text-5xl font-bold text-amber-600 flex items-center gap-2 md:gap-3 bg-white/50 backdrop-blur-sm px-6 md:px-8 py-3 md:py-4 rounded-2xl shadow-sm`}>
                <MapPinCheck className="w-8 md:w-12 h-8 md:h-12" />
                Marathon 2024
              </h2>
            </div>
            <p className="text-gray-600 text-base md:text-xl max-w-3xl mx-auto leading-relaxed px-4">
              Be part of our annual marathon event promoting health and community wellness. 
              This year's marathon features multiple categories and an exciting route through the city.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto px-4">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 text-base md:text-lg">
                  <Calendar className="w-6 md:w-8 h-6 md:h-8 text-amber-600" />
                  <span className="font-medium">March 15, 2024</span>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 text-base md:text-lg">
                  <Medal className="w-6 md:w-8 h-6 md:h-8 text-amber-600" />
                  <span className="font-medium">3K, 5K, 10K</span>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 text-base md:text-lg">
                  <MapPin className="w-6 md:w-8 h-6 md:h-8 text-amber-600" />
                  <span className="font-medium">D. Y. Patil School</span>
                </div>
              </div>
            </div>
            <Button 
              className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 flex items-center justify-center gap-2 text-base md:text-lg py-4 md:py-6 px-8 md:px-12 mx-auto rounded-xl shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.open('https://marathon-registration.com', '_blank')}
            >
              Register Now
              <ExternalLink className="w-4 md:w-5 h-4 md:h-5" />
            </Button>
          </motion.div>

          {/* Maps Grid */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {/* 3K Map */}
            <motion.div 
              variants={scaleIn}
              whileHover={{ 
                scale: 1.02,
                transition: {
                  duration: 0.4,
                  ease: "easeOut"
                }
              }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all space-y-4"
            >
              <h3 className={`${oswald.className} text-xl md:text-2xl font-semibold text-center text-amber-600 flex items-center justify-center gap-2`}>
                <MapPin className="w-5 md:w-6 h-5 md:h-6" />
                3K Route
              </h3>
              <div className="h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden border-2 border-amber-100">
                <MarathonMap gpxFile="/3K.gpx" />
              </div>
            </motion.div>

            {/* 5K Map */}
            <motion.div 
              variants={scaleIn}
              whileHover={{ 
                scale: 1.02,
                transition: {
                  duration: 0.4,
                  ease: "easeOut"
                }
              }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all space-y-4"
            >
              <h3 className={`${oswald.className} text-xl md:text-2xl font-semibold text-center text-amber-600 flex items-center justify-center gap-2`}>
                <MapPin className="w-5 md:w-6 h-5 md:h-6" />
                5K Route
              </h3>
              <div className="h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden border-2 border-amber-100">
                <MarathonMap gpxFile="/5K.gpx" />
              </div>
            </motion.div>

            {/* 10K Map */}
            <motion.div 
              variants={scaleIn}
              whileHover={{ 
                scale: 1.02,
                transition: {
                  duration: 0.4,
                  ease: "easeOut"
                }
              }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all space-y-4"
            >
              <h3 className={`${oswald.className} text-xl md:text-2xl font-semibold text-center text-amber-600 flex items-center justify-center gap-2`}>
                <MapPin className="w-5 md:w-6 h-5 md:h-6" />
                10K Route
              </h3>
              <div className="h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden border-2 border-amber-100">
                <MarathonMap gpxFile="/10 KM.gpx" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Partners Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden py-16 md:py-0"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            variants={fadeIn}
            className="flex flex-col items-center justify-center gap-12 md:gap-20"
          >
            <motion.h2 
              variants={scaleIn}
              className={`${oswald.className} text-3xl md:text-5xl font-bold text-amber-600 bg-white/50 backdrop-blur-sm px-8 md:px-12 py-4 md:py-6 rounded-2xl shadow-sm text-center`}
            >
              Our Partners
            </motion.h2>
            <div className="grid grid-cols-1 md:flex md:flex-wrap items-center justify-center gap-8 md:gap-16">
              <div className="group">
                <motion.div 
                  variants={scaleIn}
                  whileHover={{ 
                    scale: 1.03,
                    transition: {
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  }}
                  className="relative w-full h-[200px] md:w-[300px] md:h-[300px] bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300"
                >
                  <Image
                    src="/logo_rotract.JPG"
                    alt="Rotaract DYPCOE Logo"
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </motion.div>
                <p className={`${oswald.className} text-lg md:text-xl font-semibold text-center mt-4 text-amber-600`}>
                  Rotaract DYPCOE
                </p>
              </div>
              <div className="group">
                <motion.div 
                  variants={scaleIn}
                  whileHover={{ 
                    scale: 1.03,
                    transition: {
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  }}
                  className="relative w-full h-[200px] md:w-[300px] md:h-[300px] bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300"
                >
                  <Image
                    src="/pradhikaran.png"
                    alt="Rotaract Pradhikaran Logo"
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </motion.div>
                <p className={`${oswald.className} text-lg md:text-xl font-semibold text-center mt-4 text-amber-600`}>
                  Rotaract Pradhikaran
                </p>
              </div>
              <div className="group">
                <motion.div 
                  variants={scaleIn}
                  whileHover={{ 
                    scale: 1.03,
                    transition: {
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  }}
                  className="relative w-full h-[200px] md:w-[300px] md:h-[300px] bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300"
                >
                  <Image
                    src="/satej.png"
                    alt="SATEJ Logo"
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </motion.div>
                <p className={`${oswald.className} text-lg md:text-xl font-semibold text-center mt-4 text-amber-600`}>
                  SATEJ
                </p>
              </div>
            </div>
            <div className="text-center space-y-4 md:space-y-6 bg-white/50 backdrop-blur-sm px-6 md:px-12 py-6 md:py-8 rounded-2xl shadow-lg max-w-3xl mx-4">
              <h2 className={`${oswald.className} text-3xl md:text-5xl font-bold text-amber-600`}>
                Rotaract Club of DYPCOE
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                Service Above Self
              </p>
            </div>
          </motion.div>
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

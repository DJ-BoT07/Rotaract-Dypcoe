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
  MapPinCheck
} from "lucide-react";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <Image 
                src="/logo_rotract.JPG" 
                alt="Rotaract Logo" 
                width={50} 
                height={50}
                className="rounded-full shadow-md"
              />
              <span className={`${oswald.className} text-xl font-bold text-amber-600`}>
                Rotaract DYPCOE
              </span>
            </div>
            <div className="flex gap-8">
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
          </div>
        </div>
      </nav>

      {/* Hero Section with Custom Carousel */}
      <section id="home" className="h-screen relative bg-gradient-to-b from-black/50 to-transparent">
        <div className="h-full">
          <CustomCarousel />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] w-full group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl -rotate-6 scale-95 opacity-20 group-hover:rotate-0 group-hover:scale-100 transition-transform duration-300"></div>
              <Image
                src="/TEAM.png"
                alt="Rotaract Team"
                fill
                className="object-cover rounded-2xl shadow-xl group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
            <div className="space-y-8">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h2 className={`${oswald.className} text-4xl font-bold text-amber-600 flex items-center gap-3 mb-8`}>
                  <Users className="w-10 h-10" />
                  What is Rotaract DYPCOE?
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Rotaract DYPCOE is a dynamic community of young leaders at D.Y. Patil College of Engineering, 
                    dedicated to making a positive impact through service and leadership. As part of Rotary International's 
                    global network, we focus on professional development, community service, and international understanding.
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Our club organizes various initiatives including educational programs, health camps, and environmental 
                    projects, providing members with opportunities to develop leadership skills while serving the community.
                  </p>
                </div>
                <div className="pt-8">
                  <Button 
                    className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    asChild
                  >
                    <a 
                      href="https://www.instagram.com/rotaract_dypcoe/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      About Our Community
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marathon Section */}
      <section id="marathon" className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-50/70 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Header Content */}
          <div className="text-center mb-20 space-y-8 max-w-4xl mx-auto">
            <div className="inline-block">
              <h2 className={`${oswald.className} text-5xl font-bold text-amber-600 flex items-center gap-3 bg-white/50 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-sm`}>
                <MapPinCheck className="w-12 h-12" />
                Marathon 2024
              </h2>
            </div>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Be part of our annual marathon event promoting health and community wellness. 
              This year's marathon features multiple categories and an exciting route through the city.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 text-lg">
                  <Calendar className="w-8 h-8 text-amber-600" />
                  <span className="font-medium">March 15, 2024</span>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 text-lg">
                  <Medal className="w-8 h-8 text-amber-600" />
                  <span className="font-medium">3K, 5K, 10K</span>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 text-lg">
                  <MapPin className="w-8 h-8 text-amber-600" />
                  <span className="font-medium">D. Y. Patil Dnyanshanti School</span>
                </div>
              </div>
            </div>
            <Button 
              className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2 text-lg py-6 px-12 mx-auto rounded-xl shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.open('https://marathon-registration.com', '_blank')}
            >
              Register Now
              <ExternalLink className="w-5 h-5" />
            </Button>
          </div>

          {/* Maps Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* 3K Map */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all space-y-4">
              <h3 className={`${oswald.className} text-2xl font-semibold text-center text-amber-600 flex items-center justify-center gap-2`}>
                <MapPin className="w-6 h-6" />
                3K Route
              </h3>
              <div className="h-[400px] w-full rounded-xl overflow-hidden border-2 border-amber-100">
                <MarathonMap gpxFile="/3K.gpx" />
              </div>
            </div>

            {/* 5K Map */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all space-y-4">
              <h3 className={`${oswald.className} text-2xl font-semibold text-center text-amber-600 flex items-center justify-center gap-2`}>
                <MapPin className="w-6 h-6" />
                5K Route
              </h3>
              <div className="h-[400px] w-full rounded-xl overflow-hidden border-2 border-amber-100">
                <MarathonMap gpxFile="/5K.gpx" />
              </div>
            </div>

            {/* 10K Map */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all space-y-4">
              <h3 className={`${oswald.className} text-2xl font-semibold text-center text-amber-600 flex items-center justify-center gap-2`}>
                <MapPin className="w-6 h-6" />
                10K Route
              </h3>
              <div className="h-[400px] w-full rounded-xl overflow-hidden border-2 border-amber-100">
                <MarathonMap gpxFile="/10 KM.gpx" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rotaract Logo Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center gap-20">
            <h2 className={`${oswald.className} text-5xl font-bold text-amber-600 bg-white/50 backdrop-blur-sm px-12 py-6 rounded-2xl shadow-sm inline-block`}>
              Our Partners
            </h2>
            <div className="flex items-center justify-center gap-16 flex-wrap">
              <div className="group">
                <div className="relative w-[300px] h-[300px] bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300">
                  <Image
                    src="/logo_rotract.JPG"
                    alt="Rotaract DYPCOE Logo"
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                <p className={`${oswald.className} text-xl font-semibold text-center mt-4 text-amber-600`}>
                  Rotaract DYPCOE
                </p>
              </div>
              <div className="group">
                <div className="relative w-[300px] h-[300px] bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300">
                  <Image
                    src="/pradhikaran.png" 
                    alt="Rotaract Pradhikaran Logo"
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                <p className={`${oswald.className} text-xl font-semibold text-center mt-4 text-amber-600`}>
                  Rotaract Pradhikaran
                </p>
              </div>
              <div className="group">
                <div className="relative w-[300px] h-[300px] bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300">
                  <Image
                    src="/satej.png"
                    alt="SATEJ Logo" 
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                <p className={`${oswald.className} text-xl font-semibold text-center mt-4 text-amber-600`}>
                  SATEJ
                </p>
              </div>
            </div>
            <div className="text-center space-y-6 bg-white/50 backdrop-blur-sm px-12 py-8 rounded-2xl shadow-lg max-w-3xl">
              <h2 className={`${oswald.className} text-5xl font-bold text-amber-600`}>
                Rotaract Club of DYPCOE
              </h2>
              <p className="text-xl text-gray-600">
                Service Above Self
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-white to-amber-50 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-6">
            {/* <div className="flex items-center gap-3">
              <Image 
                src="/logo_rotract.JPG" 
                alt="Rotaract Logo" 
                width={40} 
                height={40}
                className="rounded-full shadow-sm"
              />
              <span className={`${oswald.className} text-lg font-semibold text-amber-600`}>
                Rotaract DYPCOE
              </span>
            </div> */}
            <p className="flex items-center justify-center gap-2 text-gray-600">
              <Heart className="w-5 h-5 text-amber-600 animate-pulse" />
              © 2024 Rotaract Club of DYPCOE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

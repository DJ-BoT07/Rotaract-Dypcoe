"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Oswald } from 'next/font/google';
import Image from "next/image";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Calendar,
  Medal,
  MapPin,
  MapPinCheck,
  ArrowLeft,
  Clock,
  Trophy,
  Users,
  Heart,
  Footprints,
  Route,
  ChevronDown,
  Home as HomeIcon,
  Info,
  PersonStanding,
  Menu,
  X,
  Facebook,
  Instagram
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Navbar from "@/components/Navbar";

import {useRef} from 'react';
import { useScroll } from "@/context/scrollContext";

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
  }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const scaleIn = {
  initial: { scale: 0.9 },
  animate: { 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};


export default function MarathonPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const iframeRef = useRef();
  const { sectionRef, scrollToSection } = useScroll();

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentRoute="/marathon" />

      {/* Hero Section */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="relative min-h-screen bg-gradient-to-br from-amber-700 to-amber-900"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/marathon-hero.jpg"
            alt="Marathon Background"
            fill
            className="object-cover mix-blend-overlay opacity-30"
            priority
          />
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        
        {/* Content Container */}
        <div className="container mx-auto relative z-10 h-screen flex flex-col">
          {/* Navigation */}
          <motion.div
            variants={fadeIn}
            className="pt-24 flex justify-between items-center"
          >
            <Link href="/">
              <motion.div
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </motion.div>
            </Link>
          </motion.div>
          
          {/* Main Content */}
          <div className="flex-1 flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full">
              {/* Left Side - Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex justify-center items-center"
              >
                <div className="relative w-[250px] h-[250px] md:w-[400px] md:h-[400px]">
                  <Image
                    src="/marathon.png"
                    alt="Marathon 2024 Logo"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full -z-10"></div>
                </div>
              </motion.div>

              {/* Right Side - Content */}
              <motion.div 
                variants={fadeIn}
                className="flex flex-col items-center md:items-start text-center md:text-left text-white"
              >
                {/* Event Date Badge */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span className="text-amber-100">March 15, 2024</span>
                </motion.div>

                {/* Title and Description */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4 mb-8"
                >
                  <h1 className={`${oswald.className} text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-amber-200`}>
                    Marathon 2024
                  </h1>
                  <p className="text-lg md:text-xl text-amber-100/90 max-w-xl">
                    Join us for an unforgettable running experience through the heart of Pimpri-Chinchwad
                  </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="grid grid-cols-2 gap-4 w-full max-w-lg mb-8"
                >
                  {[
                    { icon: <Route className="w-5 h-5" />, label: "3 Routes", value: "3K, 5K, 10K" },
                    { icon: <Users className="w-5 h-5" />, label: "Participants", value: "1000+" },
                    { icon: <Trophy className="w-5 h-5" />, label: "Prize Pool", value: "₹1,00,000" },
                    { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "DYPCOE" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-amber-500/30 transition-colors">
                      <div className="bg-amber-500/10 p-2 rounded-xl w-fit mb-2">
                        {stat.icon}
                      </div>
                      <div className="text-amber-200 text-sm font-medium">{stat.label}</div>
                      <div className="text-white text-base font-semibold">{stat.value}</div>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <Button 
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    onClick={scrollToSection}
                  >
                    Register Now
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </motion.section>

      {/* Event Details */}
      <motion.section 
        id="event-details"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 bg-gradient-to-b from-white via-amber-50/30 to-white relative"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className={`${oswald.className} text-xl font-semibold`}>Date & Time</h3>
                  <p className="text-gray-600">March 15, 2024</p>
                  <p className="text-gray-600">5:30 AM Onwards</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <MapPin className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className={`${oswald.className} text-xl font-semibold`}>Location</h3>
                  <p className="text-gray-600">D. Y. Patil School</p>
                  <p className="text-gray-600">Pimpri-Chinchwad</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <Medal className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className={`${oswald.className} text-xl font-semibold`}>Categories</h3>
                  <p className="text-gray-600">3K, 5K, and 10K</p>
                  <p className="text-gray-600">All age groups</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Race Categories */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 bg-gradient-to-b from-white via-amber-50/30 to-white relative"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            variants={fadeIn}
            className={`${oswald.className} text-3xl md:text-5xl font-bold text-center text-amber-600 mb-12`}
          >
            Race Categories
          </motion.h2>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                title: "3K Fun Run",
                description: "Perfect for beginners and families",
                icon: <Footprints className="w-6 h-6" />,
                features: ["Family-friendly", "No age limit", "Finisher medal", "Refreshments"]
              },
              {
                title: "5K Run",
                description: "Challenge yourself with this intermediate distance",
                icon: <Route className="w-6 h-6" />,
                features: ["Chip timing", "Age group prizes", "Hydration stations", "Medical support"]
              },
              {
                title: "10K Race",
                description: "Test your endurance in our flagship event",
                icon: <Trophy className="w-6 h-6" />,
                features: ["Professional timing", "Cash prizes", "Energy stations", "Medical support"]
              }
            ].map((category, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-amber-100"
              >
                <div className="p-4 bg-amber-100 rounded-xl w-fit mb-6">
                  {category.icon}
                </div>
                <h3 className={`${oswald.className} text-2xl font-bold mb-3`}>{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <ul className="space-y-3">
                  {category.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <Heart className="w-4 h-4 text-amber-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Route Maps */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 bg-gradient-to-b from-white via-amber-50/30 to-white relative"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            variants={fadeIn}
            className={`${oswald.className} text-3xl md:text-5xl font-bold text-center text-amber-600 mb-12`}
          >
            Route Maps
          </motion.h2>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: "3K Route", file: "/3K.gpx" },
              { title: "5K Route", file: "/5K.gpx" },
              { title: "10K Route", file: "/10 KM.gpx" }
            ].map((route, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className={`${oswald.className} text-xl md:text-2xl font-semibold text-center text-amber-600 flex items-center justify-center gap-2 mb-4`}>
                  <MapPin className="w-5 md:w-6 h-5 md:h-6" />
                  {route.title}
                </h3>
                <div className="h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden border-2 border-amber-100">
                  <MarathonMap gpxFile={route.file} />
                </div>
              </motion.div>
            ))}

            {/* 10K Map */}
            {/* <motion.div 
              variants={scaleIn}
              whileHover={{ 
                scale: 1.02,
                transition: {
                  duration: 0.4,
                  ease: "easeOut"
                }
              }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <Trophy className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className={`${oswald.className} text-xl font-semibold`}>Prize Pool</h3>
                  <p className="text-gray-600">₹1,00,000</p>
                  <p className="text-gray-600">Medals & Certificates</p>
                </div>
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </motion.section>

      <div ref={sectionRef} className="w-full px-5 sm:px-24 md:px-0">
        <iframe src="https://konfhub.com/widget/runspire-marathon?desc=false&secondaryBg=F7F7F7&ticketBg=F7F7F7&borderCl=F7F7F7&bg=FFFFFF&fontColor=572148&ticketCl=572148&btnColor=fb5850&fontFamily=Prompt&borderRadius=10" id="konfhub-widget" title="Register for Runspire Marathon" width="100%" height="500"></iframe>
      </div>

      {/* Partners Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden"
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
              Event Partners
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
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-gradient-to-b from-amber-50 to-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        
        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* President */}
            <motion.div variants={fadeIn} className="text-center">
              <h3 className={`${oswald.className} text-xl font-semibold mb-2`}>President 2024-25</h3>
              <p className="text-gray-600 mb-1">Rtn. Suhas Dhamale</p>
              <p className="text-amber-600 font-medium">+91 9876543210</p>
            </motion.div>
            
            {/* Director */}
            <motion.div variants={fadeIn} className="text-center">
              <h3 className={`${oswald.className} text-xl font-semibold mb-2`}>Director of Runathon 2024-25</h3>
              <p className="text-gray-600 mb-1">Rtn. Keshav Manage</p>
              <p className="text-amber-600 font-medium">+91 9876543210</p>
            </motion.div>
            
            {/* Co-Director */}
            <motion.div variants={fadeIn} className="text-center">
              <h3 className={`${oswald.className} text-xl font-semibold mb-2`}>Co-Director of Runathon 2024-25</h3>
              <p className="text-gray-600 mb-1">Rtn. Shashank Phadke</p>
              <p className="text-amber-600 font-medium">+91 9876543210</p>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div variants={fadeIn} className="flex justify-center gap-6 mb-8">
            <Link 
              href="https://facebook.com"
              target="_blank"
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <Facebook className="w-6 h-6 text-blue-600" />
            </Link>
            <Link 
              href="https://instagram.com"
              target="_blank"
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <Instagram className="w-6 h-6 text-pink-600" />
            </Link>
          </motion.div>

          {/* Copyright */}
          <motion.div variants={fadeIn} className="text-center text-gray-600">
            <p className="flex items-center justify-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" /> by{" "}
              <Link
                href="https://instagram.com/rotaract_dypcoe"
                target="_blank"
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                @rotaract_dypcoe
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
} 
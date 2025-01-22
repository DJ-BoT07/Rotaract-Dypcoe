"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Oswald } from 'next/font/google';
import Image from "next/image";
import Link from 'next/link';
import { 
  Home as HomeIcon,
  Info,
  PersonStanding,
  Menu,
  X,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useScroll } from "@/context/scrollContext";

const oswald = Oswald({ subsets: ['latin'] });

export default function Navbar({ currentRoute }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [register,setRegister] = useState(false);
  const { scrollToSection } = useScroll();


  const navItems = [
    { href: "/", icon: <HomeIcon className="w-5 h-5" />, label: "Home" },
    { href: "/#about", icon: <Info className="w-5 h-5" />, label: "About" },
  ];

  const handleRegisterClick = () => {    
    if(window.location.href.split("/")[3] === "marathon") {
      scrollToSection();
    }else{
      window.location.href = "/marathon";
    }
  };

  return (
    <>
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
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
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
            </Link>
            <div className="hidden md:flex gap-8 items-center">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={`flex items-center gap-2 transition-colors ${
                    currentRoute === item.href 
                      ? 'text-amber-600' 
                      : 'text-gray-600 hover:text-amber-600'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              <Button 
                className="bg-amber-600 hover:bg-amber-700 text-white gap-2 ml-4 shadow-md hover:shadow-lg transition-all"
                onClick={handleRegisterClick}
              >
                Register Now for Marathon
                <ExternalLink className="w-4 h-4" />
              </Button>
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

      {/* Mobile Menu Container */}
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
                  {navItems.map((item, index) => (
                    <Link 
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        currentRoute === item.href
                          ? 'text-amber-600 bg-amber-50'
                          : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.div
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
                        className="flex items-center gap-3 w-full"
                      >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
                  ))}
                  <Button 
                    className="bg-amber-600 hover:bg-amber-700 text-white gap-2 mt-2 shadow-md hover:shadow-lg transition-all"
                    onClick={() => {
                      handleRegisterClick();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Register Now for Marathon
                    
                  </Button>
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
    </>
  );
} 
"use client";
import React, { createContext, useRef, useContext } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    const finalPosition = sectionRef.current.offsetTop - 100;

    if (sectionRef.current) {
      window.scrollTo({
        top: finalPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <ScrollContext.Provider value={{ sectionRef, scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);

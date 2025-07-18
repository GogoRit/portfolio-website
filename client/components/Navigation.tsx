import React, { useEffect, useState, useRef } from "react";

// Apple-style system icons (improved, more polished)
const AppleIcons = {
  home: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 3L4 9v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9l-8-6zM12 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  ),
  projects: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM20 18H4V8h16v10z"/>
    </svg>
  ),
  timeline: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
  now: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  skills: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  contact: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  ),
};

const navItems = [
  { label: "Home", href: "#hero", icon: AppleIcons.home },
  { label: "Projects", href: "#projects", icon: AppleIcons.projects },
  { label: "Timeline", href: "#timeline", icon: AppleIcons.timeline },
  { label: "Now", href: "#now", icon: AppleIcons.now },
  { label: "Skills", href: "#skills", icon: AppleIcons.skills },
  { label: "Contact", href: "#contact", icon: AppleIcons.contact },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#hero");
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  // Calculate header height for scroll offset
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  // Handle scroll for header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function with proper offset
  const smoothScrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      // Add extra margin (16px) for better spacing from the header
      const offsetPosition = elementTop - headerHeight - 16;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Handle nav link clicks
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveSection(href);
    smoothScrollToSection(href);
  };

  // Intersection Observer for active section detection
  useEffect(() => {
    const sectionElements = navItems
      .map((item) => document.querySelector(item.href) as HTMLElement | null)
      .filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { 
        threshold: 0.3, 
        rootMargin: `-${headerHeight + 16}px 0px 0px 0px` 
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    // Special handling for Contact section at bottom
    const handleScrollBottom = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        setActiveSection("#contact");
      }
    };

    window.addEventListener("scroll", handleScrollBottom);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollBottom);
    };
  }, [headerHeight]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 w-full z-30 transition-all duration-apple ${
        isScrolled
          ? "backdrop-blur-apple bg-appleGlass/80 border-b border-silver/20 shadow-apple-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Apple-style Logo / Brand */}
        <a 
          href="#hero" 
          className="flex items-center gap-3 text-xl font-medium"
          onClick={(e) => handleNavClick(e, "#hero")}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue to-purple rounded-xl flex items-center justify-center shadow-apple-sm">
            <span className="text-white text-sm font-semibold">G</span>
          </div>
          <span className="text-graphite font-semibold">Gaurank</span>
        </a>
        
        {/* Apple-style Desktop Navigation */}
        <nav className="hidden md:flex gap-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative flex items-center gap-3 px-5 py-3 rounded-apple-pill text-sm font-medium transition-all duration-apple ease-apple-ease hover:scale-105 hover:shadow-apple-sm group ${
                  isActive 
                    ? "bg-blue/10 text-blue border border-blue/20 shadow-apple-glow" 
                    : "text-graphite/70 hover:text-graphite hover:bg-silver/30"
                }`}
              >
                <div className={`transition-all duration-apple ease-apple-ease ${
                  isActive ? "text-blue" : "text-graphite/70 group-hover:text-graphite"
                }`}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute inset-0 rounded-apple-pill bg-blue/5 animate-pulse" />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navigation; 
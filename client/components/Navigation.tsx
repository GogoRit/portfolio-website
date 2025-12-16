import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

// Apple-style system icons (improved, more polished)
const AppleIcons = {
  home: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  ),
  timeline: (
    // Briefcase icon for career/experience timeline
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
    </svg>
  ),
  research: (
    // Lightbulb/idea icon for research
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
    </svg>
  ),
  projects: (
    // Code/terminal icon for projects
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
    </svg>
  ),
  now: (
    // Pulse/activity icon for current activities
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
    </svg>
  ),
  skills: (
    // Chip/CPU icon for technical skills
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 4h12v2h-12zM6 18h12v2h-12zM4 6h2v12h-2zM18 6h2v12h-2zM9 9h6v6h-6z"/>
      <path d="M9 3h2v3h-2zM13 3h2v3h-2zM9 18h2v3h-2zM13 18h2v3h-2zM3 9h3v2h-3zM18 9h3v2h-3zM3 13h3v2h-3zM18 13h3v2h-3z"/>
    </svg>
  ),
  contact: (
    // Email icon for contact
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  ),
  menu: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  ),
  close: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  ),
};

const navItems = [
  { label: "Home", href: "#hero", icon: AppleIcons.home },
  { label: "Experience", href: "#timeline", icon: AppleIcons.timeline },
  { label: "Research", href: "#research", icon: AppleIcons.research },
  { label: "Projects", href: "#projects", icon: AppleIcons.projects },
  { label: "Now", href: "#now", icon: AppleIcons.now },
  { label: "Skills", href: "#skills", icon: AppleIcons.skills },
  { label: "Contact", href: "#contact", icon: AppleIcons.contact },
];

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

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

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Global click handler to close mobile menu when clicking anywhere
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (isMobileMenuOpen) {
        // Don't close if clicking on the hamburger button itself
        if (hamburgerRef.current && hamburgerRef.current.contains(e.target as Node)) {
          return;
        }
        // Don't close if clicking inside the mobile menu
        if (mobileMenuRef.current && mobileMenuRef.current.contains(e.target as Node)) {
          return;
        }
        // Close the menu for any other click
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleGlobalClick);
    }

    return () => document.removeEventListener('click', handleGlobalClick);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll function with proper offset
  const smoothScrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      // Use native scrollIntoView with smooth behavior and offset
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  // Handle nav link clicks
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Immediately set the active section to prevent confusion
    setActiveSection(href);
    
    // Add a small delay to ensure the state update is processed
    setTimeout(() => {
      smoothScrollToSection(href);
    }, 10);
    
    // Close mobile menu after clicking a link
    setIsMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Scroll-based active section detection
  useEffect(() => {
    const handleScrollPosition = () => {
      const scrollPosition = window.scrollY + headerHeight + 100; // Offset for better UX
      
      // Get all section elements
      const sections = navItems
        .map((item) => {
          const el = document.querySelector(item.href) as HTMLElement | null;
          if (el) {
            return { id: item.href, top: el.offsetTop, bottom: el.offsetTop + el.offsetHeight };
          }
          return null;
        })
        .filter(Boolean) as { id: string; top: number; bottom: number }[];

      if (sections.length === 0) return;

      // Special case: at the very top
      if (window.scrollY <= 50) {
        setActiveSection("#hero");
        return;
      }

      // Special case: at the very bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        setActiveSection("#contact");
        return;
      }

      // Find the section that contains the current scroll position
      let currentSection = "#hero";
      for (const section of sections) {
        if (scrollPosition >= section.top) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    // Initial check
    handleScrollPosition();

    window.addEventListener("scroll", handleScrollPosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollPosition);
    };
  }, [headerHeight]);

  // Hide navigation on case study pages - use conditional rendering instead of early return
  const isCaseStudyPage = location.pathname.startsWith("/case-study/");
  
  if (isCaseStudyPage) {
    return null;
  }

  return (
    <>
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
            <span className="text-graphite font-semibold">Gaurank Maheshwari</span>
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

          {/* Mobile Hamburger Button with smooth animation */}
          <button
            ref={hamburgerRef}
            className="md:hidden p-2 rounded-apple-pill text-graphite/70 hover:text-graphite hover:bg-silver/30 transition-all duration-300 ease-out"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className={`transition-all duration-300 ease-out transform ${
              isMobileMenuOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
            }`}>
              {isMobileMenuOpen ? AppleIcons.close : AppleIcons.menu}
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer with improved animations */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-out ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop with smooth fade */}
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Mobile Menu with smooth slide animation */}
        <div
          ref={mobileMenuRef}
          className={`absolute top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-apple border-l border-silver/20 shadow-apple-lg transform transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-silver/20">
              <span className="text-lg font-semibold text-graphite">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-apple-pill text-graphite/70 hover:text-graphite hover:bg-silver/30 transition-all duration-300 ease-out hover:scale-110"
                aria-label="Close menu"
              >
                {AppleIcons.close}
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col flex-1 p-6 space-y-4">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-apple-pill text-base font-medium transition-all duration-300 ease-out hover:scale-105 hover:shadow-apple-sm group ${
                      isActive 
                        ? "bg-blue/10 text-blue border border-blue/20 shadow-apple-glow" 
                        : "text-graphite/70 hover:text-graphite hover:bg-silver/30"
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isMobileMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                    }}
                  >
                    <div className={`transition-all duration-300 ease-out ${
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

            {/* Mobile Menu Footer */}
            <div className="p-6 border-t border-silver/20">
              <div className="text-sm text-graphite/60 text-center">
                © 2024 Gaurank
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for slide-in animation */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navigation; 
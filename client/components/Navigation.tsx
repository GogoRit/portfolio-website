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
  menu: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  ),
  close: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  ),
};

const navItems = [
  { label: "Home", href: "#hero", icon: AppleIcons.home },
  { label: "Timeline", href: "#timeline", icon: AppleIcons.timeline },
  { label: "Research", href: "#research", icon: AppleIcons.projects },
  { label: "Projects", href: "#projects", icon: AppleIcons.projects },
  { label: "Now", href: "#now", icon: AppleIcons.now },
  { label: "Skills", href: "#skills", icon: AppleIcons.skills },
  { label: "Contact", href: "#contact", icon: AppleIcons.contact },
];

const Navigation: React.FC = () => {
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

  // Intersection Observer for active section detection
  useEffect(() => {
    const sectionElements = navItems
      .map((item) => document.querySelector(item.href) as HTMLElement | null)
      .filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    // Create separate observers for different section types
    const createObserver = (threshold: number) => new IntersectionObserver(
      (entries) => {
        // Sort entries by their position in the document to ensure proper order
        const sortedEntries = entries.sort((a, b) => {
          const aRect = a.boundingClientRect;
          const bRect = b.boundingClientRect;
          return aRect.top - bRect.top;
        });

        // Find the most appropriate active section
        let newActiveSection = activeSection;
        
        for (const entry of sortedEntries) {
          if (entry.isIntersecting) {
            // Only update if this section is more prominent in the viewport
            const intersectionRatio = entry.intersectionRatio;
            if (intersectionRatio >= threshold) {
              newActiveSection = `#${entry.target.id}`;
              break; // Use the first (topmost) intersecting section
            }
          }
        }
        
        if (newActiveSection !== activeSection) {
          setActiveSection(newActiveSection);
        }
      },
      { 
        threshold, 
        rootMargin: `-${headerHeight + 32}px 0px 0px 0px` 
      }
    );

    // Use different thresholds for different sections
    const longSectionObserver = createObserver(0.4); // For longer sections - higher threshold
    const shortSectionObserver = createObserver(0.2); // For medium sections like Research and Now
    const ultraShortSectionObserver = createObserver(0.15); // For very short sections like Skills and Contact

    sectionElements.forEach((el) => {
      const sectionId = el.id;
      // Use different thresholds based on section content length
      if (sectionId === 'skills' || sectionId === 'contact') {
        ultraShortSectionObserver.observe(el);
      } else if (sectionId === 'research' || sectionId === 'now') {
        shortSectionObserver.observe(el);
      } else {
        longSectionObserver.observe(el);
      }
    });

    // Special handling for Contact section at bottom
    const handleScrollBottom = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        setActiveSection("#contact");
      }
    };

    window.addEventListener("scroll", handleScrollBottom);

    return () => {
      longSectionObserver.disconnect();
      shortSectionObserver.disconnect();
      ultraShortSectionObserver.disconnect();
      window.removeEventListener("scroll", handleScrollBottom);
    };
  }, [headerHeight]);

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
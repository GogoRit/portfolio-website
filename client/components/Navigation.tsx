import React, { useEffect, useState, useRef } from "react";
import {
  Home,
  FolderGit2 as Projects,
  CalendarClock as Timeline,
  Rocket,
  BrainCircuit as Skills,
  Mail,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "#home", icon: <Home className="w-4 h-4" /> },
  { label: "Projects", href: "#projects", icon: <Projects className="w-4 h-4" /> },
  { label: "Timeline", href: "#timeline", icon: <Timeline className="w-4 h-4" /> },
  { label: "Now", href: "#now", icon: <Rocket className="w-4 h-4" /> },
  { label: "Skills", href: "#skills", icon: <Skills className="w-4 h-4" /> },
  { label: "Contact", href: "#contact", icon: <Mail className="w-4 h-4" /> },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const sectionsRef = useRef<HTMLDivElement[]>([]);

  // Track active section for highlighted nav item
  const [activeSection, setActiveSection] = useState<string>("#home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionElements = navItems
      .map((item) => document.querySelector(item.href) as HTMLElement | null)
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -40% 0px" }
    );

    sectionElements.forEach((el) => observer.observe(el));

    const handleScrollBottom = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        setActiveSection("#contact");
      }
    };

    window.addEventListener("scroll", handleScrollBottom);

    // --- Fallback: update activeSection on scroll based on section positions ---
    const handleScrollActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let currentSection = navItems[0].href;
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elTop = rect.top + window.scrollY;
          if (scrollPosition >= elTop) {
            currentSection = item.href;
          }
        }
      }
      // If at (or near) the bottom, always highlight contact
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        currentSection = "#contact";
      }
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScrollActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollBottom);
      window.removeEventListener('scroll', handleScrollActiveSection);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-30 transition-colors duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-background/80 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <a href="#home" className="flex items-center gap-2 text-xl font-bold">
          {/* Logo box */}
          <span className="w-6 h-6 bg-primary rounded-sm inline-block" />
          <span className="gradient-text">Gaurank</span>
        </a>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveSection(item.href)}
                className={`relative text-sm font-medium transition-colors px-3 py-1 rounded-md border border-transparent hover:bg-primary/10 hover:border-primary/20 ${
                  isActive ? "bg-primary/10 border-primary text-primary" : "text-muted-foreground"
                }`}
              >
                <span className="flex items-center gap-1">
                  {item.icon}
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navigation; 
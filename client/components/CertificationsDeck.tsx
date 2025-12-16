import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, FileText, Award } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { certifications, type Certification } from "@/data/certifications";

// Auto-scroll configuration
const AUTO_SCROLL_INTERVAL = 4000; // 4 seconds between advances
const INTERACTION_PAUSE_DURATION = 5000; // 5 seconds pause after user interaction

// Tag colors
const tagColors: Record<string, string> = {
  CUDA: "bg-green-500/20 text-green-600",
  ML: "bg-blue-500/20 text-blue-600",
  RCR: "bg-purple-500/20 text-purple-600",
  DSA: "bg-orange-500/20 text-orange-600",
  Python: "bg-yellow-500/20 text-yellow-700",
  Web: "bg-pink-500/20 text-pink-600",
  DS: "bg-cyan-500/20 text-cyan-600",
};

interface CertCardProps {
  cert: Certification;
  isCenter: boolean;
}

const CertCard: React.FC<CertCardProps> = ({ cert, isCenter }) => {
  const hasCredentialUrl = cert.credentialUrl && cert.credentialUrl.length > 0;
  const hasPdf = cert.pdfPath && cert.pdfPath.length > 0;
  const tagColor = cert.tag ? tagColors[cert.tag] || "bg-gray-500/20 text-gray-600" : "";

  return (
    <div
      className={`
        glass-card p-5 rounded-xl border border-white/20 
        w-[300px] md:w-[360px] h-[210px] flex flex-col justify-between
        ${isCenter ? "shadow-lg" : "shadow-md"}
      `}
    >
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-primary flex-shrink-0" />
            <h4 className="text-sm font-semibold line-clamp-2 leading-tight">
              {cert.title}
            </h4>
          </div>
          {cert.tag && (
            <Badge variant="secondary" className={`text-[10px] px-1.5 py-0.5 ${tagColor}`}>
              {cert.tag}
            </Badge>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground font-medium mb-1">
          {cert.issuer}
        </p>
        
        <p className="text-xs text-muted-foreground">
          {cert.issued}
          {cert.expires && ` · Expires ${cert.expires}`}
        </p>
        
        {cert.credentialId && (
          <p className="text-[10px] text-muted-foreground/70 mt-1 font-mono truncate">
            ID: {cert.credentialId}
          </p>
        )}
      </div>

      {/* Actions - stop propagation to prevent Framer Motion drag/click from swallowing link clicks */}
      <div 
        className="flex gap-2 mt-3 relative z-20"
        onPointerDownCapture={(e) => e.stopPropagation()}
        onClickCapture={(e) => e.stopPropagation()}
      >
        {hasCredentialUrl ? (
          <Button
            size="sm"
            variant="default"
            className="text-xs h-7 flex-1 pointer-events-auto"
            asChild
          >
            <a href={cert.credentialUrl} target="_blank" rel="noreferrer noopener">
              <ExternalLink className="w-3 h-3 mr-1" />
              Verify
            </a>
          </Button>
        ) : hasPdf ? (
          <Button
            size="sm"
            variant="default"
            className="text-xs h-7 flex-1 pointer-events-auto"
            asChild
          >
            <a href={cert.pdfPath} target="_blank" rel="noreferrer noopener">
              <FileText className="w-3 h-3 mr-1" />
              View PDF
            </a>
          </Button>
        ) : (
          <Button size="sm" variant="outline" className="text-xs h-7 flex-1" disabled>
            No credential
          </Button>
        )}
        
        {hasCredentialUrl && hasPdf && (
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-7 pointer-events-auto"
            asChild
          >
            <a href={cert.pdfPath} target="_blank" rel="noreferrer noopener">
              <FileText className="w-3 h-3" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

const CertificationsDeck: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalCerts = certifications.length;

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Navigate function for programmatic index changes
  const navigate = useCallback((newDirection: number, isAutoScroll = false) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return totalCerts - 1;
      if (next >= totalCerts) return 0;
      return next;
    });

    // If this is a manual navigation, pause auto-scroll
    if (!isAutoScroll) {
      pauseAutoScroll();
    }
  }, [totalCerts]);

  // Pause auto-scroll and schedule resume
  const pauseAutoScroll = useCallback(() => {
    setIsPaused(true);
    
    // Clear any existing pause timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    
    // Resume after inactivity period
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, INTERACTION_PAUSE_DURATION);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    // Don't auto-scroll if reduced motion is preferred or paused
    if (prefersReducedMotion || isPaused) {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
      return;
    }

    autoScrollRef.current = setInterval(() => {
      navigate(1, true);
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isPaused, prefersReducedMotion, navigate]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, []);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      navigate(-1);
    } else if (info.offset.x < -threshold) {
      navigate(1);
    }
  };

  // Pause on drag start
  const handleDragStart = () => {
    pauseAutoScroll();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        navigate(-1);
      } else if (e.key === "ArrowRight") {
        navigate(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  // Two-finger trackpad / mouse wheel horizontal scroll support
  const lastWheelTime = useRef(0);
  const lastDirection = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Detect horizontal scroll (deltaX) or shift+vertical scroll
      const deltaX = e.deltaX || (e.shiftKey ? e.deltaY : 0);
      
      // Threshold to prevent accidental triggers
      if (Math.abs(deltaX) < 20) return;

      const now = Date.now();
      const scrollDirection = deltaX > 0 ? 1 : -1;
      
      // Allow immediate navigation if direction changed, otherwise debounce
      const directionChanged = scrollDirection !== lastDirection.current;
      const timeSinceLastScroll = now - lastWheelTime.current;
      
      if (directionChanged || timeSinceLastScroll > 400) {
        lastWheelTime.current = now;
        lastDirection.current = scrollDirection;
        navigate(scrollDirection);
      }

      // Prevent page scroll when interacting with carousel
      e.preventDefault();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [navigate]);

  // Get visible cards (center, left, right, far-left, far-right for wider view)
  const getVisibleIndices = () => {
    const farLeft = (currentIndex - 2 + totalCerts) % totalCerts;
    const left = (currentIndex - 1 + totalCerts) % totalCerts;
    const right = (currentIndex + 1) % totalCerts;
    const farRight = (currentIndex + 2) % totalCerts;
    return { farLeft, left, center: currentIndex, right, farRight };
  };

  const { farLeft, left, center, right, farRight } = getVisibleIndices();

  // Wider spacing for Netflix-style rail
  const cardVariants = {
    farLeft: {
      x: -480,
      scale: 0.7,
      opacity: 0.3,
      zIndex: 0,
      filter: "blur(2px)",
    },
    left: {
      x: -260,
      scale: 0.85,
      opacity: 0.7,
      zIndex: 1,
      filter: "blur(0px)", // Reduced blur for legibility
    },
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      zIndex: 10,
      filter: "blur(0px)",
    },
    right: {
      x: 260,
      scale: 0.85,
      opacity: 0.7,
      zIndex: 1,
      filter: "blur(0px)", // Reduced blur for legibility
    },
    farRight: {
      x: 480,
      scale: 0.7,
      opacity: 0.3,
      zIndex: 0,
      filter: "blur(2px)",
    },
  };

  // Smoother transition for Netflix-like feel (not bouncy)
  const smoothTransition = prefersReducedMotion 
    ? { duration: 0 }
    : { type: "tween", duration: 0.5, ease: "easeInOut" };

  return (
    <div 
      ref={containerRef}
      className="w-full py-4"
      onMouseEnter={pauseAutoScroll}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section header */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-muted-foreground">
          Certifications & Training
        </h3>
        <p className="text-xs text-muted-foreground/70 mt-1">
          {totalCerts} credentials · Swipe or use arrows
        </p>
      </div>

      {/* Carousel container - wider for Netflix-style */}
      <div className="relative flex items-center justify-center">
        {/* Left arrow */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 md:left-8 z-20 h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm shadow-md hover:bg-background hover:scale-110 transition-transform"
          onClick={() => navigate(-1)}
          aria-label="Previous certificate"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Cards container - wider to show more cards */}
        <div
          className="relative h-[240px] w-full max-w-[900px] flex items-center justify-center overflow-hidden"
          tabIndex={0}
          role="region"
          aria-label="Certifications carousel"
          aria-live="polite"
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {/* Far left card (desktop only) */}
            <motion.div
              key={`farLeft-${farLeft}`}
              className="absolute cursor-pointer hidden lg:block"
              variants={cardVariants}
              initial="farLeft"
              animate="farLeft"
              transition={smoothTransition}
              onClick={() => { navigate(-2); }}
            >
              <CertCard cert={certifications[farLeft]} isCenter={false} />
            </motion.div>

            {/* Left card */}
            <motion.div
              key={`left-${left}`}
              className="absolute cursor-pointer hidden md:block"
              variants={cardVariants}
              initial={direction > 0 ? "center" : "farLeft"}
              animate="left"
              transition={smoothTransition}
              onClick={() => navigate(-1)}
            >
              <CertCard cert={certifications[left]} isCenter={false} />
            </motion.div>

            {/* Center card */}
            <motion.div
              key={`center-${center}`}
              className="absolute cursor-grab active:cursor-grabbing"
              variants={cardVariants}
              initial={direction > 0 ? "right" : "left"}
              animate="center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              transition={smoothTransition}
            >
              <CertCard cert={certifications[center]} isCenter={true} />
            </motion.div>

            {/* Right card */}
            <motion.div
              key={`right-${right}`}
              className="absolute cursor-pointer hidden md:block"
              variants={cardVariants}
              initial={direction < 0 ? "center" : "farRight"}
              animate="right"
              transition={smoothTransition}
              onClick={() => navigate(1)}
            >
              <CertCard cert={certifications[right]} isCenter={false} />
            </motion.div>

            {/* Far right card (desktop only) */}
            <motion.div
              key={`farRight-${farRight}`}
              className="absolute cursor-pointer hidden lg:block"
              variants={cardVariants}
              initial="farRight"
              animate="farRight"
              transition={smoothTransition}
              onClick={() => { navigate(2); }}
            >
              <CertCard cert={certifications[farRight]} isCenter={false} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 md:right-8 z-20 h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm shadow-md hover:bg-background hover:scale-110 transition-transform"
          onClick={() => navigate(1)}
          aria-label="Next certificate"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Dot indicators with auto-scroll progress */}
      <div className="flex justify-center gap-1.5 mt-5">
        {certifications.map((_, idx) => (
          <button
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-primary w-6"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-1.5"
            }`}
            onClick={() => {
              const diff = idx - currentIndex;
              setDirection(diff > 0 ? 1 : -1);
              setCurrentIndex(idx);
              pauseAutoScroll();
            }}
            aria-label={`Go to certificate ${idx + 1}`}
          />
        ))}
      </div>

      {/* Auto-scroll indicator (subtle) */}
      {!prefersReducedMotion && (
        <div className="flex justify-center mt-2">
          <span className={`text-[10px] text-muted-foreground/50 transition-opacity duration-300 ${isPaused ? 'opacity-100' : 'opacity-0'}`}>
            Paused
          </span>
        </div>
      )}
    </div>
  );
};

export default CertificationsDeck;



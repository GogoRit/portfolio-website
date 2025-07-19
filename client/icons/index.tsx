import * as React from "react";
import type { SVGProps } from "react";

// Utility factory to simplify simple one-path icons
const createIcon = (d: string) =>
  ({ className = "w-6 h-6 sm:w-8 sm:h-8", ...props }: SVGProps<SVGSVGElement>) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d={d} />
    </svg>
  );

/* -------------------------------------------------------------------------- */
/* Core navigation icons (copied from existing apple-*.svg assets)             */
/* -------------------------------------------------------------------------- */
export const Home = createIcon("M12 3L4 9v12h16V9l-8-6z");
export const Folder = createIcon(
  "M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM20 18H4V8h16v10z"
);
export const Star = createIcon(
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
);
export const Message = createIcon(
  "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
);
export const Cpu = createIcon(
  "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
);

/* -------------------------------------------------------------------------- */
/* SF Symbol-style icons with proper paths                                     */
/* -------------------------------------------------------------------------- */
// Bot/AI assistant icon
export const Bot = createIcon("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z");

// Send/arrow icon
export const Send = createIcon("M2.01 21L23 12 2.01 3 2 10l15 2-15 2z");

// User/person icon
export const User = createIcon("M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z");

// Sparkles/magic icon
export const Sparkles = createIcon("M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z");

// Lightbulb/idea icon
export const Lightbulb = createIcon("M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z");

// Paperclip/attachment icon
export const Paperclip = createIcon("M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z");

// Close/X icon
export const X = createIcon("M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z");

// File text icon
export const FileText = createIcon("M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z");

// Upload icon
export const Upload = createIcon("M9 16h6v-6h4l-7-7-7 7h4zm-4 4h14v-2H5z");

// Chevron icons
export const ChevronDown = createIcon("M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z");
export const ChevronLeft = createIcon("M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z");
export const ChevronRight = createIcon("M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z");
export const ChevronUp = createIcon("M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z");

// Arrow icons
export const ArrowLeft = createIcon("M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z");
export const ArrowRight = createIcon("M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z");

// Check icon
export const Check = createIcon("M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z");

// Circle icon
export const Circle = createIcon("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z");

// Dot icon
export const Dot = createIcon("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z");

// Grip vertical icon
export const GripVertical = createIcon("M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM16 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM16 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM16 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z");

// More horizontal icon
export const MoreHorizontal = createIcon("M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z");

// Panel left icon
export const PanelLeft = createIcon("M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z");

// Search icon
export const Search = createIcon("M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z");

// Calendar icon
export const Calendar = createIcon("M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z");

// Map pin icon
export const MapPin = createIcon("M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z");

// Building icon
export const Building = createIcon("M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z");

// Graduation cap icon
export const GraduationCap = createIcon("M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09v6L12 21l-7-3.82v-6L1 9l11-6z");

// External link icon
export const ExternalLink = createIcon("M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z");

// Download icon
export const Download = createIcon("M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z");

// Message circle icon
export const MessageCircle = createIcon("M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z");

// Github icon
export const Github = createIcon("M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z");

// Linkedin icon
export const Linkedin = createIcon("M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z");

// Hand wave icon
export const HandWave = createIcon("M7 11V7a5 5 0 0110 0v4h2v-4a7 7 0 00-14 0v4h2zm8 0v4a3 3 0 01-6 0v-4h2v4a1 1 0 002 0v-4h2z");

// Menu icon - custom hamburger menu with thicker lines
export const Menu = ({ className = "w-6 h-6 sm:w-8 sm:h-8", ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <rect x="3" y="6" width="18" height="2" rx="1"/>
    <rect x="3" y="11" width="18" height="2" rx="1"/>
    <rect x="3" y="16" width="18" height="2" rx="1"/>
  </svg>
);

// Close icon (alias to X)
export const Close = X;

/* -------------------------------------------------------------------------- */
/* Default export fallback                                                    */
/* -------------------------------------------------------------------------- */
export default {
  Home,
  Folder,
  Star,
  Message,
  Cpu,
  Bot,
  Send,
  User,
  Sparkles,
  Lightbulb,
  Paperclip,
  X,
  FileText,
  Upload,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  Dot,
  GripVertical,
  MoreHorizontal,
  PanelLeft,
  Search,
  Calendar,
  MapPin,
  Building,
  GraduationCap,
  ExternalLink,
  Download,
  MessageCircle,
  Github,
  Linkedin,
  HandWave,
  Menu,
  Close,
}; 
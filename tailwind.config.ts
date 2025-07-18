import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          'San Francisco',
          'Helvetica Neue',
          'Inter',
          'Segoe UI',
          'Roboto',
          'Arial',
          'sans-serif',
        ],
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
      },
      colors: {
        // Apple-inspired palette
        silver: {
          light: "#f5f6fa",
          DEFAULT: "#e5e7eb",
          dark: "#d1d5db",
        },
        graphite: {
          light: "#43464a",
          DEFAULT: "#2c2c2e",
          dark: "#1c1c1e",
        },
        blue: {
          light: "#eaf6ff",
          DEFAULT: "#007aff",
          dark: "#004080",
        },
        green: {
          light: "#e6f9ec",
          DEFAULT: "#30d158",
          dark: "#248a3d",
        },
        pink: {
          light: "#fce4ec",
          DEFAULT: "#ff375f",
          dark: "#c9184a",
        },
        purple: {
          light: "#f3e8ff",
          DEFAULT: "#af52de",
          dark: "#5e239d",
        },
        yellow: {
          light: "#fffbe6",
          DEFAULT: "#ffd60a",
          dark: "#bfa100",
        },
        appleGlass: {
          DEFAULT: "rgba(255,255,255,0.6)",
          dark: "rgba(44,44,46,0.6)",
        },
        appleAccent: {
          DEFAULT: "#64d2ff",
          pastel: "#b6e3ff",
        },
        appleBackground: {
          DEFAULT: "#f8f8f8",
          dark: "#1c1c1e",
        },
        appleForeground: {
          DEFAULT: "#1c1c1e",
          light: "#f8f8f8",
        },
        // Existing color tokens for compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          secondary: "hsl(var(--accent-secondary))",
        },
        glass: {
          DEFAULT: "hsl(var(--glass))",
          border: "hsl(var(--glass-border))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        error: "hsl(var(--error))",
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      boxShadow: {
        'apple-xs': '0 1px 2px 0 rgba(60,60,67,0.03)',
        'apple-sm': '0 2px 8px 0 rgba(60,60,67,0.07)',
        'apple-md': '0 4px 16px 0 rgba(60,60,67,0.10)',
        'apple-lg': '0 8px 32px 0 rgba(60,60,67,0.12)',
        'apple-glow': '0 0 0 4px #007aff33',
      },
      borderRadius: {
        'apple-pill': '9999px',
        'apple-lg': '1.5rem',
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionTimingFunction: {
        'apple-ease': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'apple-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        'apple': '350ms',
      },
      backdropBlur: {
        'apple': '20px',
      },
      spacing: {
        'apple-nav': '0.75rem',
        'apple-section': '4.5rem',
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

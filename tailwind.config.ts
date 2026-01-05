// // tailwind.config.ts
// import type { Config } from "tailwindcss"

// const config: Config = {
//   darkMode: "class", // important for theme toggle with shadcn
//   content: [
//     "./app/**/*.{ts,tsx}",
//     "./components/**/*.{ts,tsx}",
//     "./src/**/*.{ts,tsx}", // keep this if you have a /src folder
//   ],
//   theme: {
//     extend: {
//       borderRadius: {
//         sm: "calc(var(--radius) - 4px)",
//         md: "calc(var(--radius) - 2px)",
//         lg: "var(--radius)",
//         xl: "calc(var(--radius) + 4px)",
//       },
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//         card: "var(--card)",
//         "card-foreground": "var(--card-foreground)",
//         popover: "var(--popover)",
//         "popover-foreground": "var(--popover-foreground)",
//         primary: "var(--primary)",
//         "primary-foreground": "var(--primary-foreground)",
//         secondary: "var(--secondary)",
//         "secondary-foreground": "var(--secondary-foreground)",
//         muted: "var(--muted)",
//         "muted-foreground": "var(--muted-foreground)",
//         accent: "var(--accent)",
//         "accent-foreground": "var(--accent-foreground)",
//         destructive: "var(--destructive)",
//         border: "var(--border)",
//         input: "var(--input)",
//         ring: "var(--ring)",

//         // Optional: if you want to use them directly as Tailwind classes
//         sidebar: "var(--sidebar)",
//         "sidebar-foreground": "var(--sidebar-foreground)",
//         "sidebar-primary": "var(--sidebar-primary)",
//         "sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
//         "sidebar-accent": "var(--sidebar-accent)",
//         "sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
//         "sidebar-border": "var(--sidebar-border)",
//         "sidebar-ring": "var(--sidebar-ring)",

//         "chart-1": "var(--chart-1)",
//         "chart-2": "var(--chart-2)",
//         "chart-3": "var(--chart-3)",
//         "chart-4": "var(--chart-4)",
//         "chart-5": "var(--chart-5)",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// }

// export default config




// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Fonts
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "var(--font-dm-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-sora)", "var(--font-outfit)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 12px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        // Sidebar
        sidebar: "var(--sidebar)",
        "sidebar-foreground": "var(--sidebar-foreground)",
        "sidebar-primary": "var(--sidebar-primary)",
        "sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
        "sidebar-accent": "var(--sidebar-accent)",
        "sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
        "sidebar-border": "var(--sidebar-border)",
        "sidebar-ring": "var(--sidebar-ring)",

        // Charts
        "chart-1": "var(--chart-1)",
        "chart-2": "var(--chart-2)",
        "chart-3": "var(--chart-3)",
        "chart-4": "var(--chart-4)",
        "chart-5": "var(--chart-5)",
      },
      // Box shadows
      boxShadow: {
        "emerald-sm": "0 2px 8px -2px rgba(16, 185, 129, 0.2)",
        "emerald-md": "0 4px 16px -4px rgba(16, 185, 129, 0.25)",
        "emerald-lg": "0 8px 32px -8px rgba(16, 185, 129, 0.3)",
        "emerald-xl": "0 16px 48px -12px rgba(16, 185, 129, 0.35)",
      },
      // Animations
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "fade-in-down": "fadeInDown 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(16, 185, 129, 0.25)" },
          "50%": { boxShadow: "0 0 40px rgba(16, 185, 129, 0.4)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"),require('@tailwindcss/forms'),
],
};

export default config;
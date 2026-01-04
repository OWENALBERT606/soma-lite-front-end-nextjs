


"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "full" | "icon" | "text" | "image";
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  className?: string;
  linkTo?: string;
}

export function Logo({
  variant = "image",
  size = "md",
  showTagline = false,
  className = "",
  linkTo = "/",
}: LogoProps) {
  // Size configurations
  const sizes = {
    sm: {
      icon: "w-8 h-8",
      text: "text-lg",
      tagline: "text-xs",
      house: "w-4 h-4",
      image: { width: 120, height: 40 },
    },
    md: {
      icon: "w-10 h-10",
      text: "text-xl",
      tagline: "text-xs",
      house: "w-5 h-5",
      image: { width: 140, height: 45 },
    },
    lg: {
      icon: "w-12 h-12",
      text: "text-2xl",
      tagline: "text-sm",
      house: "w-6 h-6",
      image: { width: 180, height: 60 },
    },
    xl: {
      icon: "w-16 h-16",
      text: "text-3xl",
      tagline: "text-base",
      house: "w-8 h-8",
      image: { width: 240, height: 80 },
    },
  };

  const currentSize = sizes[size];

  // Logo using actual image file
  const LogoImage = () => (
    <div className={`flex flex-col ${className}`}>
      <Image
        src="/logo-v1.png"
        alt="UG-STAYS"
        width={currentSize.image.width}
        height={currentSize.image.height}
        className="object-contain"
        priority
      />
      {showTagline && (
        <span className="text-sm text-slate-500 dark:text-slate-400 -mt-1">
          Your residential partner...
        </span>
      )}
    </div>
  );

  // Logo Icon (SVG fallback)
  const LogoIcon = () => (
    <div
      className={`${currentSize.icon} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${currentSize.house} text-white`}
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    </div>
  );

  // Logo Text
  const LogoText = () => (
    <div className="flex flex-col">
      <span
        className={`${currentSize.text} font-bold tracking-tight`}
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        UG-STAYS
      </span>
      {showTagline && (
        <span className={`${currentSize.tagline} text-slate-500 -mt-1`}>
          Your residential partner...
        </span>
      )}
    </div>
  );

  // Dark mode text variant
  const LogoTextDark = () => (
    <div className="flex flex-col">
      <span className={`${currentSize.text} font-bold tracking-tight text-white`}>
        UG-STAYS
      </span>
      {showTagline && (
        <span className={`${currentSize.tagline} text-slate-400 -mt-1`}>
          Your residential partner...
        </span>
      )}
    </div>
  );

  // Full logo with icon + text (SVG version)
  const LogoFull = () => (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoIcon />
      <span className="dark:hidden">
        <LogoText />
      </span>
      <span className="hidden dark:block">
        <LogoTextDark />
      </span>
    </div>
  );

  // Determine which variant to render
  const renderLogo = () => {
    switch (variant) {
      case "image":
        return <LogoImage />;
      case "icon":
        return <LogoIcon />;
      case "text":
        return (
          <>
            <span className="dark:hidden">
              <LogoText />
            </span>
            <span className="hidden dark:block">
              <LogoTextDark />
            </span>
          </>
        );
      case "full":
      default:
        return <LogoFull />;
    }
  };

  if (linkTo) {
    return (
      <Link href={linkTo} className="inline-flex shrink-0">
        {renderLogo()}
      </Link>
    );
  }

  return renderLogo();
}

// Standalone Icon for favicon, app icon, etc.
export function LogoIconOnly({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#logoGradient)" />
      <path
        d="M10 17l10-7.5 10 7.5v11a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V17z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M16 30V22h8v8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default Logo;
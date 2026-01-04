// import type { Metadata, Viewport } from "next";
// import { DM_Sans, Outfit, Sora } from "next/font/google";
// import "./globals.css";
// import { Toaster } from "sonner";

// // Primary font - DM Sans: Clean, geometric, highly readable
// const dmSans = DM_Sans({
//   variable: "--font-dm-sans",
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "600", "700"],
// });

// // Display font - Outfit: Modern, friendly, great for headings
// const outfit = Outfit({
//   variable: "--font-outfit",
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "600", "700", "800"],
// });

// // Alternative option - Sora: Geometric, tech-forward feel
// const sora = Sora({
//   variable: "--font-sora",
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "600", "700"],
// });

// export const metadata: Metadata = {
//   title: {
//     default: "UG-STAYS | Your Residential Partner in Uganda",
//     template: "%s | UG-STAYS",
//   },
//   description:
//     "Find verified hostels, apartments, and rental homes across Uganda. From student accommodation to luxury apartments, UG-STAYS is your trusted residential partner.",
//   keywords: [
//     "Uganda rentals",
//     "Kampala apartments",
//     "student hostels Uganda",
//     "short stay Uganda",
//     "Airbnb Uganda",
//     "rental homes Kampala",
//     "accommodation Uganda",
//     "UG-STAYS",
//     "property rental Uganda",
//   ],
//   authors: [{ name: "UG-STAYS" }],
//   creator: "UG-STAYS",
//   publisher: "UG-STAYS",
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
//   metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://ugstays.com"),
//   alternates: {
//     canonical: "/",
//   },
//   openGraph: {
//     type: "website",
//     locale: "en_UG",
//     url: "/",
//     title: "UG-STAYS | Your Residential Partner in Uganda",
//     description:
//       "Find verified hostels, apartments, and rental homes across Uganda. From student accommodation to luxury apartments.",
//     siteName: "UG-STAYS",
//     images: [
//       {
//         url: "/og-image.png",
//         width: 1200,
//         height: 630,
//         alt: "UG-STAYS - Your Residential Partner",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "UG-STAYS | Your Residential Partner in Uganda",
//     description:
//       "Find verified hostels, apartments, and rental homes across Uganda.",
//     images: ["/og-image.png"],
//     creator: "@ugstays",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   icons: {
//     icon: [
//       { url: "/favicon.ico" },
//       { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
//       { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
//     ],
//     apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
//     other: [
//       {
//         rel: "mask-icon",
//         url: "/safari-pinned-tab.svg",
//         color: "#10b981",
//       },
//     ],
//   },
//   manifest: "/site.webmanifest",
// };

// export const viewport: Viewport = {
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "#ffffff" },
//     { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
//   ],
//   width: "device-width",
//   initialScale: 1,
//   maximumScale: 5,
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body
//         className={`${dmSans.variable} ${outfit.variable} ${sora.variable} font-sans antialiased`}
//       >
//         <Toaster
//           position="top-right"
//           toastOptions={{
//             style: {
//               background: "hsl(var(--card))",
//               color: "hsl(var(--card-foreground))",
//               border: "1px solid hsl(var(--border))",
//             },
//             className: "shadow-lg",
//           }}
//           richColors
//           closeButton
//         />
//         {children}
//       </body>
//     </html>
//   );
// }




import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit, Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

// Primary font - DM Sans: Clean, geometric, highly readable
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Display font - Outfit: Modern, friendly, great for headings
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Alternative option - Sora: Geometric, tech-forward feel
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "UG-STAYS | Your Residential Partner in Uganda",
    template: "%s | UG-STAYS",
  },
  description:
    "Find verified hostels, apartments, and rental homes across Uganda. From student accommodation to luxury apartments, UG-STAYS is your trusted residential partner.",
  keywords: [
    "Uganda rentals",
    "Kampala apartments",
    "student hostels Uganda",
    "short stay Uganda",
    "Airbnb Uganda",
    "rental homes Kampala",
    "accommodation Uganda",
    "UG-STAYS",
    "property rental Uganda",
  ],
  authors: [{ name: "UG-STAYS" }],
  creator: "UG-STAYS",
  publisher: "UG-STAYS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://ugstays.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: "/",
    title: "UG-STAYS | Your Residential Partner in Uganda",
    description:
      "Find verified hostels, apartments, and rental homes across Uganda. From student accommodation to luxury apartments.",
    siteName: "UG-STAYS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UG-STAYS - Your Residential Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UG-STAYS | Your Residential Partner in Uganda",
    description:
      "Find verified hostels, apartments, and rental homes across Uganda.",
    images: ["/og-image.png"],
    creator: "@ugstays",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#10b981",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${outfit.variable} ${sora.variable} font-sans antialiased`}
      >
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "hsl(var(--card))",
              color: "hsl(var(--card-foreground))",
              border: "1px solid hsl(var(--border))",
            },
            className: "shadow-lg",
          }}
          richColors
          closeButton
        />
        {children}
      </body>
    </html>
  );
}
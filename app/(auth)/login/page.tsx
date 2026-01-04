
// "use client";

// import React, { useState, Suspense } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useForm } from "react-hook-form";
// import {
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   ArrowRight,
//   Loader2,
//   BookOpen,
//   GraduationCap,
//   Users,
//   BarChart3,
//   Shield,
//   X,
// } from "lucide-react";
// import { toast } from "sonner";
// import Image from "next/image";
// import { getRedirectPath, loginUser } from "@/actions/auth";

// // Types
// interface LoginFormData {
//   email: string;
//   password: string;
//   rememberMe: boolean;
// }

// // Features for the left panel
// const features = [
//   {
//     icon: GraduationCap,
//     title: "Student Management",
//     description: "Complete student lifecycle management",
//   },
//   {
//     icon: BarChart3,
//     title: "Real-time Reports",
//     description: "Instant academic performance tracking",
//   },
//   {
//     icon: Users,
//     title: "Staff Management",
//     description: "Manage teachers and staff efficiently",
//   },
//   {
//     icon: Shield,
//     title: "Secure Access",
//     description: "Role-based permissions for all users",
//   },
// ];

// // Loading component
// function LoginLoading() {
//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
//       <div className="flex flex-col items-center gap-4">
//         <div className="relative">
//           <div className="w-16 h-16 rounded-full border-4 border-[#5B9BD5]/20 border-t-[#5B9BD5] animate-spin" />
//           <BookOpen className="w-6 h-6 text-[#5B9BD5] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
//         </div>
//         <p className="text-slate-500 font-medium">Loading...</p>
//       </div>
//     </div>
//   );
// }

// // Logo Component
// function SomaLiteLogo() {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
//         <BookOpen className="w-6 h-6 text-white" />
//       </div>
//       <div>
//         <h1 className="text-xl font-bold text-white">Soma-Lite</h1>
//         <p className="text-xs text-white/70">Smart School Management</p>
//       </div>
//     </div>
//   );
// }

// // Main Login Content
// function LoginContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const returnUrl = searchParams.get("returnUrl") || searchParams.get("callbackUrl");

//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormData>({
//     defaultValues: {
//       rememberMe: false,
//     },
//   });

//   const onSubmit = async (data: LoginFormData) => {
//     setIsLoading(true);

//     try {
//       // Use server action for login
//       const result = await loginUser({
//         email: data.email,
//         password: data.password,
//       });

//       // Check for errors
//       if (!result.success) {
//         // Handle specific error codes
//         if (result.code === "EMAIL_NOT_VERIFIED") {
//           toast.error("Please verify your email first");
//           router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
//           return;
//         }
//         if (result.code === "ACCOUNT_PENDING") {
//           toast.info("Your account is pending approval");
//           return;
//         }
//         if (result.code === "ACCOUNT_SUSPENDED") {
//           toast.error("Your account has been suspended");
//           return;
//         }
//         throw new Error(result.error || "Login failed");
//       }

//       toast.success("Welcome back!");

//       // Redirect based on return URL or role-based dashboard
//       if (returnUrl && !returnUrl.includes("/login") && !returnUrl.includes("/register")) {
//         router.push(returnUrl);
//       } else {
//         const redirectPath = await getRedirectPath();
//         router.push(redirectPath);
//         // router.replace(returnUrl || "/dashboard");

//       }
//     } catch (error: any) {
//       console.error("Login error:", error);
//       toast.error(error.message || "Login failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex">
//       {/* Left Side - Branding Panel */}
//       <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] relative overflow-hidden">
//         {/* Background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#5B9BD5] via-[#4A8BC2] to-[#3D7AB0]">
//           {/* Decorative Elements */}
//           <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
//           <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
//           <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#F4A460]/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          
//           {/* Grid Pattern */}
//           <div 
//             className="absolute inset-0 opacity-[0.03]"
//             style={{
//               backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
//               backgroundSize: '40px 40px'
//             }}
//           />
//         </div>
//       </div>

//       {/* Right Side - Form */}
//       <div className="flex-1 flex flex-col relative p-6 sm:p-8 lg:p-10">
//         {/* Mobile Logo */}
//         <div className="lg:hidden flex items-center justify-center mb-8">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-[#5B9BD5] rounded-xl flex items-center justify-center">
//               <BookOpen className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-slate-800">Soma-Lite</h1>
//               <p className="text-xs text-slate-500">Smart School Management</p>
//             </div>
//           </div>
//         </div>

//         {/* Form Container */}
//         <div className="flex-1 flex items-center justify-center">
//           <div className="w-full max-w-md">
//             {/* Header */}
//             <div className="text-center mb-8">
//               <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
//                 Sign In to Your Account
//               </h1>
//               <p className="mt-2 text-slate-500">
//                 Enter your credentials to access your dashboard
//               </p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1.5">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                   <input
//                     {...register("email", {
//                       required: "Email is required",
//                       pattern: {
//                         value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                         message: "Please enter a valid email",
//                       },
//                     })}
//                     type="email"
//                     placeholder="you@school.ac.ug"
//                     disabled={isLoading}
//                     className={`w-full pl-10 pr-4 py-3 bg-white border-2 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5B9BD5] focus:ring-4 focus:ring-[#5B9BD5]/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
//                       errors.email ? "border-red-400" : "border-slate-200"
//                     }`}
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
//                     <X className="w-3 h-3" />
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               {/* Password */}
//               <div>
//                 <div className="flex items-center justify-between mb-1.5">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Password
//                   </label>
//                   <Link
//                     href="/forgot-password"
//                     className="text-xs text-[#5B9BD5] hover:text-[#4A8BC2] font-medium transition-colors"
//                   >
//                     Forgot password?
//                   </Link>
//                 </div>
//                 <div className="relative">
//                   <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                   <input
//                     {...register("password", {
//                       required: "Password is required",
//                     })}
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     disabled={isLoading}
//                     className={`w-full pl-10 pr-12 py-3 bg-white border-2 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5B9BD5] focus:ring-4 focus:ring-[#5B9BD5]/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
//                       errors.password ? "border-red-400" : "border-slate-200"
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     disabled={isLoading}
//                     className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors disabled:cursor-not-allowed"
//                   >
//                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
//                     <X className="w-3 h-3" />
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>

//               {/* Remember Me */}
//               <div className="flex items-center gap-3">
//                 <input
//                   {...register("rememberMe")}
//                   type="checkbox"
//                   id="remember"
//                   disabled={isLoading}
//                   className="w-5 h-5 rounded border-2 border-slate-300 text-[#5B9BD5] focus:ring-[#5B9BD5] focus:ring-offset-0 disabled:cursor-not-allowed"
//                 />
//                 <label htmlFor="remember" className="text-sm text-slate-600">
//                   Keep me signed in
//                 </label>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-[#5B9BD5] to-[#4A8BC2] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#5B9BD5]/30 focus:outline-none focus:ring-4 focus:ring-[#5B9BD5]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                     Signing in...
//                   </>
//                 ) : (
//                   <>
//                     Sign In
//                     <ArrowRight className="w-5 h-5" />
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Register Link */}
//             <p className="mt-8 text-center text-sm text-slate-500">
//               Don&apos;t have an account?{" "}
//               <Link
//                 href={returnUrl ? `/register?returnUrl=${encodeURIComponent(returnUrl)}` : "/register"}
//                 className="text-[#5B9BD5] hover:text-[#4A8BC2] font-semibold transition-colors"
//               >
//                 Create one here
//               </Link>
//             </p>

//             {/* Demo Credentials */}
//             <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-xl">
//               <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
//                 Demo Credentials
//               </p>
//               <div className="space-y-1 text-sm">
//                 <p className="text-slate-600">
//                   <span className="text-slate-400">Email:</span>{" "}
//                   <code className="bg-white px-1.5 py-0.5 rounded text-[#5B9BD5] font-mono text-xs">
//                     admin@soma-lite.com
//                   </code>
//                 </p>
//                 <p className="text-slate-600">
//                   <span className="text-slate-400">Password:</span>{" "}
//                   <code className="bg-white px-1.5 py-0.5 rounded text-[#5B9BD5] font-mono text-xs">
//                     Admin@123456
//                   </code>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center text-xs text-slate-400 mt-8">
//           © {new Date().getFullYear()} Soma-Lite. All rights reserved.
//         </div>
//       </div>
//     </div>
//   );
// }

// // Main Page Component with Suspense
// export default function LoginPage() {
//   return (
//     <Suspense fallback={<LoginLoading />}>
//       <LoginContent />
//     </Suspense>
//   );
// }

// hhhhhhhhhhhhhhhhhhhhhhhhhh



"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  BookOpen,
  GraduationCap,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { getRedirectPath, loginUser } from "@/actions/auth"
import { cn } from "@/lib/utils"

// Types
interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

const sliderItems = [
  {
    icon: GraduationCap,
    title: "Student Management",
    description:
      "Streamline the complete student lifecycle from admission to graduation with our intuitive digital platform.",
    image: "/School-Management-system-02-1170x580.jpg",
    
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Gain deep insights into academic performance and school operations with comprehensive real-time reporting.",
    image: "/B74.jpg",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description:
      "Bridge the gap between teachers, students, and parents with seamless communication and collaborative tools.",
    image: "/blog-collaborative-learning-jpg.webp",
  },
]

function LoginLoading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[#5B9BD5]/20 border-t-[#5B9BD5] animate-spin" />
          <BookOpen className="w-6 h-6 text-[#5B9BD5] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-slate-500 font-medium">Loading...</p>
      </div>
    </div>
  )
}

function ImageSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % sliderItems.length)
  const prev = () => setCurrent((prev) => (prev - 1 + sliderItems.length) % sliderItems.length)

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-12 text-white">
      {/* Background Images */}
      {sliderItems.map((item, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out z-0",
            index === current ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#5B9BD5]/90 via-[#4A8BC2]/85 to-[#3D7AB0]/90" />
        </div>
      ))}
      {/* Middle Section - Content Slider */}
      <div className="relative z-10 max-w-lg">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {sliderItems.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="w-16 h-16 bg-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold mb-4 leading-tight">{item.title}</h2>
                <p className="text-lg text-white/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators and Controls */}
        <div className="flex items-center gap-6 mt-12">
          <div className="flex gap-2">
            {sliderItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === current ? "w-8 bg-white" : "w-2 bg-white/30",
                )}
              />
            ))}
          </div>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Login Content
function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get("returnUrl") || searchParams.get("callbackUrl")

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const result = await loginUser({
        email: data.email,
        password: data.password,
      })

      if (!result.success) {
        if (result.code === "EMAIL_NOT_VERIFIED") {
          toast.error("Please verify your email first")
          router.push(`/verify-email?email=${encodeURIComponent(data.email)}`)
          return
        }
        if (result.code === "ACCOUNT_PENDING") {
          toast.info("Your account is pending approval")
          return
        }
        if (result.code === "ACCOUNT_SUSPENDED") {
          toast.error("Your account has been suspended")
          return
        }
        throw new Error(result.error || "Login failed")
      }

      toast.success("Welcome back!")

      if (returnUrl && !returnUrl.includes("/login") && !returnUrl.includes("/register")) {
        router.push(returnUrl)
      } else {
        const redirectPath = await getRedirectPath()
        router.push(redirectPath)
      }
    } catch (error: any) {
      console.error("Login error:", error)
      toast.error(error.message || "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 flex">
      <div className="hidden lg:flex lg:w-[45%] xl:w-[45%] bg-[#5B9BD5] relative overflow-hidden">
        <ImageSlider />
      </div>

      <div className="flex-1 flex flex-col relative p-6 sm:p-8 lg:p-10">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5B9BD5] rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Soma-Lite</h1>
              <p className="text-xs text-slate-500">Smart School Management</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="w-full flex justify-center flex-col items-center">
              <Image width={100} height={100} alt="logo" src="/logo.png"></Image>
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Sign In to Your Account</h1>
              <p className="mt-2 text-slate-500">Enter your credentials to Proceed</p>
            </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email",
                      },
                    })}
                    type="email"
                    placeholder="you@school.ac.ug"
                    disabled={isLoading}
                    className={cn(
                      "w-full pl-10 pr-4 py-3 bg-white border-2 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5B9BD5] focus:ring-4 focus:ring-[#5B9BD5]/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                      errors.email ? "border-red-400" : "border-slate-200",
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-slate-700">Password</label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#5B9BD5] hover:text-[#4A8BC2] font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    className={cn(
                      "w-full pl-10 pr-12 py-3 bg-white border-2 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5B9BD5] focus:ring-4 focus:ring-[#5B9BD5]/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                      errors.password ? "border-red-400" : "border-slate-200",
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors disabled:cursor-not-allowed"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="items-center hidden gap-3">
                <input
                  {...register("rememberMe")}
                  type="checkbox"
                  id="remember"
                  disabled={isLoading}
                  className="w-5 h-5 rounded border-2 border-slate-300 text-[#5B9BD5] focus:ring-[#5B9BD5] focus:ring-offset-0 disabled:cursor-not-allowed"
                />
                <label htmlFor="remember" className="text-sm hidden text-slate-600">
                  Keep me signed in
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-[#5B9BD5] to-[#4A8BC2] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#5B9BD5]/30 focus:outline-none focus:ring-4 focus:ring-[#5B9BD5]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/support"
                className="text-[#5B9BD5] hover:text-[#4A8BC2] font-semibold transition-colors"
              >
                contact support
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400 mt-8">
          © {new Date().getFullYear()} Soma-Lite. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  )
}



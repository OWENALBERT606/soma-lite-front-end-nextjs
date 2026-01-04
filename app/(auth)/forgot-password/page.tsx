"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Mail,
  ArrowRight,
  Loader2,
  BookOpen,
  CheckCircle2,
  ArrowLeft,
  X,
} from "lucide-react";
import { toast } from "sonner";

// Types
interface ForgotPasswordFormData {
  email: string;
}

// Loading component
function ForgotPasswordLoading() {
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
  );
}

// Logo Component
function SomaLiteLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-[#5B9BD5] to-[#4A8BC2] rounded-xl flex items-center justify-center shadow-lg shadow-[#5B9BD5]/25 group-hover:shadow-[#5B9BD5]/40 transition-shadow">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#4CAF50] rounded-full border-2 border-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-[#5B9BD5] leading-none tracking-tight">
          soma-lite
        </span>
        <span className="text-[10px] text-[#F4A460] font-semibold uppercase tracking-wider">
          Smart School Management
        </span>
      </div>
    </Link>
  );
}

// Main Content
function ForgotPasswordContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      // Always show success to prevent email enumeration
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
      toast.success("If an account exists, you'll receive a reset link.");
    } catch (error: any) {
      // Still show success for security
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex flex-col">
        {/* Header */}
        <div className="p-6 sm:p-8">
          <SomaLiteLogo />
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-[#4CAF50]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#4CAF50]" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Check Your Email
            </h1>
            <p className="text-slate-500 mb-2">
              We've sent a password reset link to
            </p>
            <p className="text-[#5B9BD5] font-medium mb-8">{submittedEmail}</p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8">
              <p className="text-sm text-slate-600">
                <span className="font-medium">Note:</span> The link will expire in 30 minutes.
                If you don't see the email, check your spam folder.
              </p>
            </div>

            {/* Back to Login */}
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[#5B9BD5] hover:text-[#4A8BC2] font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex flex-col">
      {/* Header */}
      <div className="p-6 sm:p-8">
        <SomaLiteLogo />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#5B9BD5]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-[#5B9BD5]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Forgot Password?
            </h1>
            <p className="text-slate-500">
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email Address
              </label>
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
                  className={`w-full pl-10 pr-4 py-3 bg-white border-2 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5B9BD5] focus:ring-4 focus:ring-[#5B9BD5]/10 transition-all ${
                    errors.email ? "border-red-400" : "border-slate-200"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-[#5B9BD5] to-[#4A8BC2] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#5B9BD5]/30 focus:outline-none focus:ring-4 focus:ring-[#5B9BD5]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Page Component with Suspense
export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<ForgotPasswordLoading />}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
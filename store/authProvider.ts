"use client";

import { useSessionStore } from "@/store/authStore";
import React, { useEffect } from "react";

// Auth provider component to initialize auth state
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  // const initialize = useSessionStore((state) => state.clear); // Example if needed
  // const isLoading = useSessionStore((state) => state.isLoading);

  // Authentication typically handled by Next-Auth or persist middleware
  
  return children as any; // No JSX needed if returning children directly in .ts
}
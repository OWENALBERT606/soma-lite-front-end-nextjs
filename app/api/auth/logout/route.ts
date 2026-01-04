import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  
  // Clear all auth-related cookies
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("userData");
  cookieStore.delete("user");
  
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}

export async function GET() {
  // Also support GET for direct navigation
  const cookieStore = await cookies();
  
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("userData");
  cookieStore.delete("user");
  
  // Redirect to home page
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
}
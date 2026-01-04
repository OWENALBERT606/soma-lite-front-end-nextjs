
// app/actions/auth.ts
"use server";

import { getDashboardByRole } from "@/lib/role-routing";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/** ========= Axios Instance ========= **/
const BASE_API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "";

if (!BASE_API_URL) {
  console.warn("⚠️ API_URL environment variable is not set.");
}

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

function ensureApiConfigured() {
  if (!BASE_API_URL) {
    throw new Error("API_URL is not configured. Please set API_URL in your .env.local file.");
  }
}

/** ========= Types ========= **/

export interface BackendUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  imageUrl?: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED" | "DEACTIVATED";
  isVerified: boolean;
  createdAt?: string;
  lastLoginAt?: string;
  roles?: UserRoleInfo[];
  schoolAccess?: SchoolAccessInfo[];
}

export interface UserRoleInfo {
  roleId: string;
  roleName: string;
  roleSlug: string;
  schoolId: string | null;
  schoolName?: string;
}

export interface SchoolAccessInfo {
  schoolId: string;
  schoolName: string;
  schoolCode: string;
  roles: string[];
}

interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  code?: string;
  data?: {
    user: BackendUser;
    accessToken: string;
    refreshToken: string;
  };
}

/** ========= Cookie Helpers ========= **/

async function setCookies(
  accessToken: string,
  refreshToken: string,
  user: BackendUser
) {
  const store = await cookies();

  store.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  store.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  store.set("userData", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}

async function clearCookies() {
  const store = await cookies();
  store.delete("accessToken");
  store.delete("refreshToken");
  store.delete("userData");
  store.delete("currentSchoolId");
}

async function getAuthHeaderFromCookies() {
  const store = await cookies();
  const token = store.get("accessToken")?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** ========= SESSION ========= **/

export async function getSession() {
  const store = await cookies();
  const token = store.get("accessToken");
  const userData = store.get("userData");

  if (!token || !userData) return null;

  try {
    return {
      accessToken: token.value,
      refreshToken: store.get("refreshToken")?.value,
      user: JSON.parse(userData.value) as BackendUser,
    };
  } catch {
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}

export async function getSessionUser(): Promise<BackendUser | null> {
  const session = await getSession();
  return session?.user || null;
}

/** ========= LOGIN ========= **/

export async function loginUser(data: {
  email?: string;
  phone?: string;
  password: string;
}): Promise<AuthResponse> {
  try {
    ensureApiConfigured();
    
    const res = await api.post("/auth/login", data);
    const { user, accessToken, refreshToken } = res.data.data;
    
    await setCookies(accessToken, refreshToken, user);
    
    return {
      success: true,
      message: res.data.message || "Login successful",
      data: { user, accessToken, refreshToken },
    };
  } catch (error: any) {
    console.error("Login error:", error?.response?.data || error.message);
    
    const errorData = error?.response?.data;
    return {
      success: false,
      error: errorData?.error || "Login failed. Please try again.",
      code: errorData?.code,
    };
  }
}

/** ========= REGISTER ========= **/

export async function registerUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}): Promise<{ success: boolean; message?: string; error?: string; data?: any }> {
  try {
    ensureApiConfigured();
    
    const res = await api.post("/auth/register", data);
    
    return {
      success: true,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (error: any) {
    console.error("Register error:", error?.response?.data || error.message);
    
    return {
      success: false,
      error: error?.response?.data?.error || "Registration failed. Please try again.",
    };
  }
}

/** ========= LOGOUT ========= **/

export async function logoutUser(): Promise<{ success: boolean }> {
  try {
    const store = await cookies();
    const refreshToken = store.get("refreshToken")?.value;

    // Try to invalidate token on server
    if (refreshToken) {
      try {
        const headers = await getAuthHeaderFromCookies();
        await api.post("/auth/logout", { refreshToken }, { headers });
      } catch {
        // Ignore server errors during logout
      }
    }

    await clearCookies();
    return { success: true };
  } catch {
    await clearCookies();
    return { success: true };
  }
}

/** ========= EMAIL VERIFICATION ========= **/

export async function verifyEmail(data: {
  email: string;
  code: string;
}): Promise<AuthResponse> {
  try {
    ensureApiConfigured();
    
    const res = await api.post("/auth/verify-email", {
      email: data.email.trim().toLowerCase(),
      code: data.code.trim(),
    });
    
    const responseData = res.data.data;
    
    // If tokens are returned, set cookies (auto-login)
    if (responseData?.accessToken) {
      await setCookies(
        responseData.accessToken,
        responseData.refreshToken,
        responseData.user
      );
    }
    
    return {
      success: true,
      message: res.data.message,
      data: responseData,
    };
  } catch (error: any) {
    console.error("Verify email error:", error?.response?.data || error.message);
    
    return {
      success: false,
      error: error?.response?.data?.error || "Verification failed.",
      code: error?.response?.data?.code,
    };
  }
}

export async function resendVerification(email: string): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  try {
    ensureApiConfigured();
    
    const res = await api.post("/auth/resend-verification", {
      email: email.trim().toLowerCase(),
    });
    
    return {
      success: true,
      message: res.data.message || "Verification code sent",
    };
  } catch (error: any) {
    if (error?.response?.data?.error === "Email already verified") {
      return {
        success: false,
        error: "Email already verified",
      };
    }
    return {
      success: true,
      message: "If the email exists, a verification code has been sent",
    };
  }
}

/** ========= PASSWORD RESET ========= **/

export async function forgotPassword(email: string): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    ensureApiConfigured();
    
    await api.post("/auth/forgot-password", {
      email: email.trim().toLowerCase(),
    });
    
    return {
      success: true,
      message: "If that email exists, a reset link has been sent",
    };
  } catch {
    // Always return success to prevent email enumeration
    return {
      success: true,
      message: "If that email exists, a reset link has been sent",
    };
  }
}

export async function resetPassword(data: {
  uid: string;
  token: string;
  newPassword: string;
}): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    ensureApiConfigured();
    
    const res = await api.post("/auth/reset-password", data);
    
    return {
      success: true,
      message: res.data.message || "Password updated successfully",
    };
  } catch (error: any) {
    console.error("Reset password error:", error?.response?.data || error.message);
    
    return {
      success: false,
      error: error?.response?.data?.error || "Reset failed. Link may be invalid or expired.",
    };
  }
}

export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const headers = await getAuthHeaderFromCookies();
    const res = await api.post("/auth/change-password", data, { headers });
    
    return {
      success: true,
      message: res.data.message || "Password changed successfully",
    };
  } catch (error: any) {
    console.error("Change password error:", error?.response?.data || error.message);
    
    return {
      success: false,
      error: error?.response?.data?.error || "Failed to change password.",
    };
  }
}

/** ========= TOKEN REFRESH ========= **/

export async function refreshAccessToken(): Promise<{
  success: boolean;
  accessToken?: string;
  error?: string;
}> {
  try {
    const store = await cookies();
    const refreshToken = store.get("refreshToken")?.value;

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const res = await api.post("/auth/refresh", { refreshToken });
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data.data;

    // Update cookies
    store.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    if (newRefreshToken) {
      store.set("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return { success: true, accessToken: newAccessToken };
  } catch (error: any) {
    console.error("Token refresh error:", error?.response?.data || error.message);
    await clearCookies();
    return {
      success: false,
      error: "Session expired. Please login again.",
    };
  }
}

/** ========= USER PROFILE ========= **/

export async function fetchMe(): Promise<BackendUser | null> {
  try {
    const headers = await getAuthHeaderFromCookies();
    if (!headers.Authorization) return null;

    const res = await api.get("/auth/me", { headers });
    const userData = res.data.data;

    // Update cookie with fresh data
    const store = await cookies();
    store.set("userData", JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return userData;
  } catch (error: any) {
    console.error("fetchMe error:", error?.response?.data || error.message);

    // If unauthorized, try to refresh token
    if (error?.response?.status === 401) {
      const refreshed = await refreshAccessToken();
      if (refreshed.success) {
        return fetchMe();
      }
    }

    return null;
  }
}

export async function updateProfile(data: {
  firstName?: string;
  lastName?: string;
  phone?: string;
  imageUrl?: string;
}): Promise<{ success: boolean; data?: BackendUser; error?: string }> {
  try {
    const headers = await getAuthHeaderFromCookies();
    const res = await api.patch("/auth/me", data, { headers });
    const userData = res.data.data;

    // Update cookie
    const store = await cookies();
    store.set("userData", JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true, data: userData };
  } catch (error: any) {
    console.error("Update profile error:", error?.response?.data || error.message);
    return {
      success: false,
      error: error?.response?.data?.error || "Failed to update profile.",
    };
  }
}

/** ========= REDIRECT HELPERS ========= **/

export async function getRedirectPath(): Promise<string> {
  const session = await getSession();
  if (!session) return "/login";

  return getDashboardByRole(session.user.roles ?? []);
}

/** ========= AUTH GUARDS ========= **/

export async function requireAuth(returnUrl?: string) {
  const session = await getSession();

  if (!session) {
    const loginUrl = returnUrl
      ? `/login?returnUrl=${encodeURIComponent(returnUrl)}`
      : "/login";
    redirect(loginUrl);
  }

  return session;
}

export async function requireRole(allowedRoles: string[], returnUrl?: string) {
  const session = await requireAuth(returnUrl);
  const userRoles = session.user.roles?.map((r) => r.roleSlug) || [];

  const hasRequiredRole = allowedRoles.some((role) => userRoles.includes(role));

  if (!hasRequiredRole) {
    redirect(getDashboardByRole(session.user.roles || []));
  }

  return session;
}

export async function requirePlatformAdmin() {
  return requireRole(["platform_admin"]);
}

export async function requireSchoolAdmin() {
  return requireRole(["platform_admin", "school_admin"]);
}

/** ========= ADMIN ACTIONS ========= **/

export async function getAllUsers(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) {
  try {
    const headers = await getAuthHeaderFromCookies();
    const res = await api.get("/users", { headers, params });
    return res.data;
  } catch (error: any) {
    console.error("getAllUsers error:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.error || "Failed to fetch users");
  }
}

export async function approveUser(userId: string): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();
    const res = await api.post(`/auth/approve/${userId}`, {}, { headers });
    revalidatePath("/admin/users");
    return {
      success: true,
      message: res.data.message || "User approved successfully",
    };
  } catch (error: any) {
    console.error("approveUser error:", error?.response?.data || error.message);
    return {
      success: false,
      error: error?.response?.data?.error || "Failed to approve user",
    };
  }
}

export async function suspendUser(
  userId: string,
  reason?: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const headers = await getAuthHeaderFromCookies();
    const res = await api.post(`/auth/suspend/${userId}`, { reason }, { headers });
    revalidatePath("/admin/users");
    return {
      success: true,
      message: res.data.message || "User suspended",
    };
  } catch (error: any) {
    console.error("suspendUser error:", error?.response?.data || error.message);
    return {
      success: false,
      error: error?.response?.data?.error || "Failed to suspend user",
    };
  }
}

export async function reactivateUser(userId: string): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();
    const res = await api.post(`/auth/reactivate/${userId}`, {}, { headers });
    revalidatePath("/admin/users");
    return {
      success: true,
      message: res.data.message || "User reactivated",
    };
  } catch (error: any) {
    console.error("reactivateUser error:", error?.response?.data || error.message);
    return {
      success: false,
      error: error?.response?.data?.error || "Failed to reactivate user",
    };
  }
}
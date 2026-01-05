"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

/** ========= Axios Instance ========= **/
const BASE_API_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

/** ========= Types ========= **/

export type UserStatus = "PENDING" | "ACTIVE" | "SUSPENDED";

export interface User {
  id: string;
  staffId?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  imageUrl?: string | null;
  status: UserStatus;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;

  userRoles?: {
    role: {
      id: string;
      name: string;
      slug: string;
    };
    school?: {
      id: string;
      name: string;
    } | null;
  }[];
}

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  staffId?: string;
  imageUrl?: string;
  roles?: string[];
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  imageUrl?: string;
  status?: UserStatus;
}

/** ========= Helpers ========= **/

async function getAuthHeaderFromCookies() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

async function getSchoolHeader() {
  const cookieStore = await cookies();
  const schoolId = cookieStore.get("currentSchoolId")?.value;
  return schoolId ? { schoolId } : {};
}

/** ========= USER CRUD ========= **/

/**
 * Get all users
 */
export async function getUsers(params?: {
  status?: UserStatus;
}): Promise<{
  success: boolean;
  data?: User[];
  error?: string;
}> {
  try {
    const headers = {
      ...(await getAuthHeaderFromCookies()),
      ...(await getSchoolHeader()),
    };

    const res = await api.get("/users", {
      headers,
      params,
    });

    return {
      success: true,
      data: res.data.data,
    };
  } catch (error: any) {
    console.error("getUsers error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.message || "Failed to fetch users",
    };
  }
}

/**
 * Get user by ID
 */
export async function getUserById(
  userId: string
): Promise<{
  success: boolean;
  data?: User;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();

    const res = await api.get(`/users/${userId}`, { headers });

    return {
      success: true,
      data: res.data.data,
    };
  } catch (error: any) {
    console.error("getUserById error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.message || "Failed to fetch user",
    };
  }
}

/**
 * Create user
 */
export async function createUser(
  data: CreateUserData
): Promise<{
  success: boolean;
  data?: User;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();

    const res = await api.post("/users", data, { headers });

    revalidatePath("/dashboard/users");

    return {
      success: true,
      data: res.data.data,
    };
  } catch (error: any) {
    console.error("createUser error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.message || "Failed to create user",
    };
  }
}

/**
 * Update user
 */
export async function updateUser(
  userId: string,
  data: UpdateUserData
): Promise<{
  success: boolean;
  data?: User;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();

    const res = await api.patch(`/users/${userId}`, data, { headers });

    revalidatePath(`/dashboard/users/${userId}`);
    revalidatePath("/dashboard/users");

    return {
      success: true,
      data: res.data.data,
    };
  } catch (error: any) {
    console.error("updateUser error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.message || "Failed to update user",
    };
  }
}

/**
 * Verify user
 */
export async function verifyUser(
  userId: string
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();

    const res = await api.post(`/users/${userId}/verify`, {}, { headers });

    revalidatePath(`/dashboard/users/${userId}`);
    revalidatePath("/dashboard/users");

    return {
      success: true,
      message: res.data.message || "User verified successfully",
    };
  } catch (error: any) {
    console.error("verifyUser error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.message || "Failed to verify user",
    };
  }
}

/**
 * Delete user
 */
export async function deleteUser(
  userId: string
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();

    const res = await api.delete(`/users/${userId}`, { headers });

    revalidatePath("/dashboard/users");

    return {
      success: true,
      message: res.data.message || "User deleted successfully",
    };
  } catch (error: any) {
    console.error("deleteUser error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.message || "Failed to delete user",
    };
  }
}

// app/actions/roles.ts
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

export interface Role {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  permissions: string[];
  isSystem: boolean;
  schoolId?: string | null;
  createdAt: string;
  updatedAt: string;
  userRoles?: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  }[];
}

export interface CreateRoleData {
  name: string;
  slug?: string;
  description?: string;
  permissions?: string[];
  schoolId?: string | null;
  isSystem?: boolean;
}

export interface UpdateRoleData {
  name?: string;
  description?: string;
  permissions?: string[];
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

/** ========= ROLE CRUD ========= **/

/**
 * Get all roles (optionally filtered by school)
 */
export async function getRoles(params?: {
  schoolId?: string;
}): Promise<{
  success: boolean;
  data?: Role[];
  error?: string;
}> {
  try {
    const headers = {
      ...(await getAuthHeaderFromCookies()),
      ...(await getSchoolHeader()),
    };

    const res = await api.get("/roles", {
      headers,
      params,
    });

    return {
      success: true,
      data: res.data.data,
    };
  } catch (error: any) {
    console.error("getRoles error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.message || "Failed to fetch roles",
    };
  }
}

/**
 * Get role by ID
 */
export async function getRoleById(
  roleId: string
): Promise<{
  success: boolean;
  data?: Role;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();

    const res = await api.get(`/roles/${roleId}`, { headers });

    return {
      success: true,
      data: res.data.data,
    };
  } catch (error: any) {
    console.error("getRoleById error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.message || "Failed to fetch role",
    };
  }
}

/**
 * Create a new role
 */
export async function createRole(
  data: CreateRoleData
): Promise<{
  success: boolean;
  data?: Role;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();

    const res = await api.post("/roles", data, { headers });

    revalidatePath("/dashboard/roles");

    return {
      success: true,
      data: res.data.data,
    };
  } catch (error: any) {
    console.error("createRole error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.message || "Failed to create role",
    };
  }
}

/**
 * Update role (name, description, permissions)
 */
export async function updateRole(
  roleId: string,
  data: UpdateRoleData
): Promise<{
  success: boolean;
  data?: Role;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();

    const res = await api.put(`/roles/${roleId}`, data, { headers });

    revalidatePath(`/dashboard/roles/${roleId}`);
    revalidatePath("/dashboard/roles");

    return {
      success: true,
      data: res.data.data,
    };
  } catch (error: any) {
    console.error("updateRole error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.message || "Failed to update role",
    };
  }
}

/**
 * Delete role
 */
export async function deleteRole(
  roleId: string
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();

    const res = await api.delete(`/roles/${roleId}`, { headers });

    revalidatePath("/dashboard/roles");

    return {
      success: true,
      message: res.data.message || "Role deleted successfully",
    };
  } catch (error: any) {
    console.error("deleteRole error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.message || "Failed to delete role",
    };
  }
}

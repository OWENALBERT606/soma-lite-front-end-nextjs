// app/actions/schools.ts
"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

/** ========= Axios Instance ========= **/
const BASE_API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

/** ========= Types ========= **/

export interface School {
  id: string;
  code: string;
  slug: string;
  name: string;
  motto?: string;
  vision?: string;
  mission?: string;
  email?: string;
  email2?: string;
  phone?: string;
  phone2?: string;
  phone3?: string;
  website?: string;
  poBox?: string;
  address?: string;
  district?: string;
  county?: string;
  subCounty?: string;
  parish?: string;
  village?: string;
  logo?: string;
  badge?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  headerImage?: string;
  reportCardLogo?: string;
  schoolType: "DAY" | "BOARDING" | "DAY_AND_BOARDING";
  schoolLevel: "PRIMARY" | "SECONDARY" | "PRIMARY_AND_SECONDARY" | "TERTIARY";
  curriculum: "UGANDA_NATIONAL" | "CAMBRIDGE" | "IB" | "AMERICAN" | "HYBRID";
  ownership: "GOVERNMENT" | "PRIVATE" | "COMMUNITY" | "RELIGIOUS";
  registrationNo?: string;
  licenseNo?: string;
  establishedYear?: number;
  gradingSystem: "PRIMARY_UGANDA" | "SECONDARY_UGANDA" | "PERCENTAGE" | "GPA";
  attendanceType: "DAILY" | "SUBJECT_WISE" | "BOTH";
  termStructure: "THREE_TERMS" | "TWO_SEMESTERS" | "FOUR_QUARTERS";
  academicYearStart: "JANUARY" | "FEBRUARY" | "SEPTEMBER";
  isActive: boolean;
  isVerified: boolean;
  adminId: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    students: number;
    teachers: number;
    classes: number;
    subjects: number;
  };
}

export interface CreateSchoolData {
  name: string;
  motto?: string;
  email?: string;
  phone?: string;
  address?: string;
  district?: string;
  schoolType?: "DAY" | "BOARDING" | "DAY_AND_BOARDING";
  schoolLevel?: "PRIMARY" | "SECONDARY" | "PRIMARY_AND_SECONDARY" | "TERTIARY";
  curriculum?: "UGANDA_NATIONAL" | "CAMBRIDGE" | "IB" | "AMERICAN" | "HYBRID";
  ownership?: "GOVERNMENT" | "PRIVATE" | "COMMUNITY" | "RELIGIOUS";
  // Admin user details (optional - if creating new admin)
  adminEmail?: string;
  adminFirstName?: string;
  adminLastName?: string;
  adminPhone?: string;
}

export interface UpdateSchoolData extends Partial<Omit<School, "id" | "code" | "slug" | "createdAt" | "updatedAt" | "_count">> {}

/** ========= Helpers ========= **/

async function getAuthHeaderFromCookies() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

async function getSchoolHeader() {
  const cookieStore = await cookies();
  const schoolId = cookieStore.get("currentSchoolId")?.value;
  return schoolId ? { "X-School-Id": schoolId } : {};
}

/** ========= SCHOOL CRUD ========= **/

/**
 * Get all schools (Platform Admin sees all, users see their schools)
 */
export async function getSchools(params?: {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}): Promise<{
  success: boolean;
  data?: {
    schools: School[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();
    const res = await api.get("/schools", { headers, params });
    return {
      success: true,
      data: res.data.data,
    };
  } catch (error: any) {
    console.error("getSchools error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.error || "Failed to fetch schools",
    };
  }
}

/**
 * Get school by ID
 */
export async function getSchoolById(schoolId: string): Promise<{
  success: boolean;
  data?: School;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();
    const res = await api.get(`/schools/${schoolId}`, { headers });
    return {
      success: true,
      data: res.data.data,
    };
  } catch (error: any) {
    console.error("getSchoolById error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.error || "Failed to fetch school",
    };
  }
}

/**
 * Create a new school (Platform Admin only)
 */
export async function createSchool(data: CreateSchoolData): Promise<{
  success: boolean;
  data?: School;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();
    const res = await api.post("/schools", data, { headers });
    revalidatePath("/admin/schools");
    return {
      success: true,
      data: res.data.data,
    };
  } catch (error: any) {
    console.error("createSchool error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.error || "Failed to create school",
    };
  }
}

/**
 * Update school details
 */
export async function updateSchool(
  schoolId: string,
  data: UpdateSchoolData
): Promise<{
  success: boolean;
  data?: School;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();
    const res = await api.patch(`/schools/${schoolId}`, data, { headers });
    revalidatePath(`/admin/schools/${schoolId}`);
    revalidatePath("/admin/schools");
    revalidatePath("/school/settings");
    return {
      success: true,
      data: res.data.data,
    };
  } catch (error: any) {
    console.error("updateSchool error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.error || "Failed to update school",
    };
  }
}

/**
 * Activate a school (Platform Admin only)
 */
export async function activateSchool(schoolId: string): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();
    const res = await api.post(`/schools/${schoolId}/activate`, {}, { headers });
    revalidatePath("/admin/schools");
    return {
      success: true,
      message: res.data.message || "School activated",
    };
  } catch (error: any) {
    console.error("activateSchool error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.error || "Failed to activate school",
    };
  }
}

/**
 * Deactivate a school (Platform Admin only)
 */
export async function deactivateSchool(schoolId: string): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  try {
    const headers = await getAuthHeaderFromCookies();
    const res = await api.post(`/schools/${schoolId}/deactivate`, {}, { headers });
    revalidatePath("/admin/schools");
    return {
      success: true,
      message: res.data.message || "School deactivated",
    };
  } catch (error: any) {
    console.error("deactivateSchool error:", error?.response?.data || error);
    return {
      success: false,
      error: error?.response?.data?.error || "Failed to deactivate school",
    };
  }
}

/** ========= SCHOOL BRANDING ========= **/

/**
 * Update school branding (logo, colors, etc.)
 */
export async function updateSchoolBranding(
  schoolId: string,
  data: {
    logo?: string;
    badge?: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    headerImage?: string;
    reportCardLogo?: string;
  }
): Promise<{
  success: boolean;
  data?: School;
  error?: string;
}> {
  return updateSchool(schoolId, data);
}

/** ========= SCHOOL SETTINGS ========= **/

/**
 * Update school academic settings
 */
export async function updateSchoolSettings(
  schoolId: string,
  data: {
    gradingSystem?: "PRIMARY_UGANDA" | "SECONDARY_UGANDA" | "PERCENTAGE" | "GPA";
    attendanceType?: "DAILY" | "SUBJECT_WISE" | "BOTH";
    termStructure?: "THREE_TERMS" | "TWO_SEMESTERS" | "FOUR_QUARTERS";
    academicYearStart?: "JANUARY" | "FEBRUARY" | "SEPTEMBER";
  }
): Promise<{
  success: boolean;
  data?: School;
  error?: string;
}> {
  return updateSchool(schoolId, data);
}

/** ========= CURRENT SCHOOL CONTEXT ========= **/

/**
 * Get current school from cookie or first available
 */
export async function getCurrentSchool(): Promise<{
  success: boolean;
  data?: School;
  error?: string;
}> {
  try {
    const cookieStore = await cookies();
    const currentSchoolId = cookieStore.get("currentSchoolId")?.value;

    if (currentSchoolId) {
      return getSchoolById(currentSchoolId);
    }

    // If no current school, get user's first school
    const schoolsResult = await getSchools({ limit: 1 });
    if (schoolsResult.success && schoolsResult.data?.schools.length) {
      const firstSchool = schoolsResult.data.schools[0];

      // Set as current school
      cookieStore.set("currentSchoolId", firstSchool.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });

      return {
        success: true,
        data: firstSchool,
      };
    }

    return {
      success: false,
      error: "No school access",
    };
  } catch (error: any) {
    console.error("getCurrentSchool error:", error);
    return {
      success: false,
      error: "Failed to get current school",
    };
  }
}

/**
 * Set current school context
 */
export async function setCurrentSchool(schoolId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const cookieStore = await cookies();
    cookieStore.set("currentSchoolId", schoolId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to set school context" };
  }
}
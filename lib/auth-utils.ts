import { UserRoleInfo } from "@/actions/auth";


/**
 * Get redirect path based on user roles
 */
export function getRedirectPathByRole(roles: UserRoleInfo[] | string): string {
  // Handle single role string (backwards compatibility)
  if (typeof roles === "string") {
    switch (roles) {
      case "platform_admin":
        return "/admin/dashboard";
      case "school_admin":
        return "/school/dashboard";
      case "head_teacher":
      case "deputy_head":
      case "dos":
        return "/academics/dashboard";
      case "bursar":
        return "/finance/dashboard";
      case "teacher":
      case "class_teacher":
        return "/teacher/dashboard";
      case "librarian":
        return "/library/dashboard";
      case "store_keeper":
        return "/inventory/dashboard";
      case "parent":
        return "/parent/dashboard";
      case "student":
        return "/student/dashboard";
      default:
        return "/dashboard";
    }
  }

  // Handle array of roles
  if (!roles || roles.length === 0) {
    return "/dashboard";
  }

  const roleSlugs = roles.map((r) => r.roleSlug);

  if (roleSlugs.includes("platform_admin")) return "/admin/dashboard";
  if (roleSlugs.includes("school_admin")) return "/school/dashboard";
  if (roleSlugs.some((r) => ["head_teacher", "deputy_head", "dos"].includes(r))) {
    return "/academics/dashboard";
  }
  if (roleSlugs.includes("bursar")) return "/finance/dashboard";
  if (roleSlugs.some((r) => ["teacher", "class_teacher"].includes(r))) {
    return "/teacher/dashboard";
  }
  if (roleSlugs.includes("librarian")) return "/library/dashboard";
  if (roleSlugs.includes("store_keeper")) return "/inventory/dashboard";
  if (roleSlugs.includes("parent")) return "/parent/dashboard";
  if (roleSlugs.includes("student")) return "/student/dashboard";

  return "/dashboard";
}

/**
 * Get role display name
 */
export function getRoleDisplayName(roleSlug: string): string {
  const roleNames: Record<string, string> = {
    platform_admin: "Platform Administrator",
    school_admin: "School Administrator",
    head_teacher: "Head Teacher",
    deputy_head: "Deputy Head Teacher",
    dos: "Director of Studies",
    bursar: "Bursar",
    teacher: "Teacher",
    class_teacher: "Class Teacher",
    librarian: "Librarian",
    store_keeper: "Store Keeper",
    secretary: "Secretary",
    parent: "Parent",
    student: "Student",
  };

  return roleNames[roleSlug] || roleSlug;
}

/**
 * Get role badge color
 */
export function getRoleBadgeColor(roleSlug: string): string {
  const colors: Record<string, string> = {
    platform_admin: "bg-purple-100 text-purple-800",
    school_admin: "bg-blue-100 text-blue-800",
    head_teacher: "bg-indigo-100 text-indigo-800",
    deputy_head: "bg-indigo-100 text-indigo-800",
    dos: "bg-cyan-100 text-cyan-800",
    bursar: "bg-green-100 text-green-800",
    teacher: "bg-amber-100 text-amber-800",
    class_teacher: "bg-orange-100 text-orange-800",
    librarian: "bg-pink-100 text-pink-800",
    store_keeper: "bg-gray-100 text-gray-800",
    secretary: "bg-teal-100 text-teal-800",
    parent: "bg-lime-100 text-lime-800",
    student: "bg-sky-100 text-sky-800",
  };

  return colors[roleSlug] || "bg-gray-100 text-gray-800";
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(
  userRoles: UserRoleInfo[] | undefined,
  allowedRoles: string[]
): boolean {
  if (!userRoles) return false;
  return userRoles.some((r) => allowedRoles.includes(r.roleSlug));
}

/**
 * Check if user has a specific role
 */
export function hasRole(
  userRoles: UserRoleInfo[] | undefined,
  roleSlug: string
): boolean {
  if (!userRoles) return false;
  return userRoles.some((r) => r.roleSlug === roleSlug);
}

/**
 * Check if user is platform admin
 */
export function isPlatformAdmin(userRoles: UserRoleInfo[] | undefined): boolean {
  return hasRole(userRoles, "platform_admin");
}

/**
 * Check if user is school admin or higher
 */
export function isSchoolAdmin(userRoles: UserRoleInfo[] | undefined): boolean {
  return hasAnyRole(userRoles, ["platform_admin", "school_admin"]);
}

/**
 * Check if user is a teacher (any type)
 */
export function isTeacher(userRoles: UserRoleInfo[] | undefined): boolean {
  return hasAnyRole(userRoles, [
    "platform_admin",
    "school_admin",
    "head_teacher",
    "deputy_head",
    "dos",
    "teacher",
    "class_teacher",
  ]);
}

/**
 * Get user's highest priority role
 */
export function getPrimaryRole(userRoles: UserRoleInfo[] | undefined): string {
  if (!userRoles || userRoles.length === 0) return "user";

  const priorityOrder = [
    "platform_admin",
    "school_admin",
    "head_teacher",
    "deputy_head",
    "dos",
    "bursar",
    "class_teacher",
    "teacher",
    "librarian",
    "store_keeper",
    "secretary",
    "parent",
    "student",
  ];

  for (const role of priorityOrder) {
    if (userRoles.some((r) => r.roleSlug === role)) {
      return role;
    }
  }

  return userRoles[0]?.roleSlug || "user";
}

/**
 * Format user status
 */
export function formatUserStatus(status: string): {
  label: string;
  color: string;
} {
  const statuses: Record<string, { label: string; color: string }> = {
    ACTIVE: { label: "Active", color: "bg-green-100 text-green-800" },
    INACTIVE: { label: "Inactive", color: "bg-gray-100 text-gray-800" },
    PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    SUSPENDED: { label: "Suspended", color: "bg-red-100 text-red-800" },
    DEACTIVATED: { label: "Deactivated", color: "bg-slate-100 text-slate-800" },
  };

  return statuses[status] || { label: status, color: "bg-gray-100 text-gray-800" };
}

/**
 * Get initials from name
 */
export function getInitials(firstName?: string, lastName?: string): string {
  const first = firstName?.charAt(0)?.toUpperCase() || "";
  const last = lastName?.charAt(0)?.toUpperCase() || "";
  return `${first}${last}` || "??";
}

/**
 * Get full name
 */
export function getFullName(firstName?: string, lastName?: string): string {
  return [firstName, lastName].filter(Boolean).join(" ") || "Unknown User";
}
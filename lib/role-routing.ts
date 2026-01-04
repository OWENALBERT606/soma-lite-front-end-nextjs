// lib/role-routing.ts

import { UserRoleInfo } from "@/actions/auth";

export function getDashboardByRole(roles: UserRoleInfo[]): string {
  if (!roles || roles.length === 0) return "/dashboard";

  if (roles.some(r => r.roleSlug === "platform_admin")) {
    return "/admin/dashboard";
  }

  if (roles.some(r => r.roleSlug === "school_admin")) {
    return "/school/dashboard";
  }

  if (roles.some(r =>
    ["head_teacher", "deputy_head", "dos"].includes(r.roleSlug)
  )) {
    return "/academics/dashboard";
  }

  if (roles.some(r => r.roleSlug === "bursar")) {
    return "/finance/dashboard";
  }

  if (roles.some(r =>
    ["teacher", "class_teacher"].includes(r.roleSlug)
  )) {
    return "/teacher/dashboard";
  }

  if (roles.some(r => r.roleSlug === "librarian")) {
    return "/library/dashboard";
  }

  if (roles.some(r => r.roleSlug === "parent")) {
    return "/parent/dashboard";
  }

  if (roles.some(r => r.roleSlug === "student")) {
    return "/student/dashboard";
  }

  return "/dashboard";
}

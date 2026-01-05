// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { createUser, updateUser, User } from "@/actions/users"
// import { Role } from "@/actions/roles"

// interface UserFormProps {
//   user?: User | null
//   roles: Role[]
//   isLoading?: boolean
// }

// export function UserForm({ user, roles, isLoading }: UserFormProps) {
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [formData, setFormData] = useState({
//     firstName: user?.firstName || "",
//     lastName: user?.lastName || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//     password: "",
//     staffId: user?.staffId || "",
//     selectedRole: user?.userRoles?.[0]?.role.id || "",
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleRoleChange = (value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       selectedRole: value,
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setError(null)

//     try {
//       if (user) {
//         // Update user
//         const result = await updateUser(user.id, {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           phone: formData.phone,
//         })

//         if (result.success) {
//           router.push("/dashboard/users")
//         } else {
//           setError(result.error || "Failed to update user")
//         }
//       } else {
//         // Create user
//         if (!formData.password) {
//           setError("Password is required for new users")
//           setIsSubmitting(false)
//           return
//         }

//         const result = await createUser({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//           staffId: formData.staffId || undefined,
//           roles: formData.selectedRole ? [formData.selectedRole] : undefined,
//         })

//         if (result.success) {
//           router.push("/dashboard/users")
//         } else {
//           setError(result.error || "Failed to create user")
//         }
//       }
//     } catch (err) {
//       setError("An unexpected error occurred")
//       console.error(err)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Card className="w-full max-w-2xl">
//       <CardHeader>
//         <CardTitle>{user ? "Edit User" : "Create New User"}</CardTitle>
//         <CardDescription>
//           {user ? "Update the user information below" : "Fill in the details to create a new user"}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="firstName">First Name</Label>
//               <Input
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 placeholder="John"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="lastName">Last Name</Label>
//               <Input
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 placeholder="Doe"
//                 required
//               />
//             </div>
//           </div>

//         <div className="grid grid-cols-2 gap-2 w-full justify-between">
//               <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="john@example.com"
//               disabled={!!user}
//               required={!user}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="phone">Phone Number</Label>
//             <Input
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="+1234567890"
//               required
//             />
//           </div>

          
//           {!user && (
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter a strong password"
//                 required
//               />
//             </div>
//           )}

//           <div className="space-y-2">
//             <Label htmlFor="staffId">Staff ID (Optional)</Label>
//             <Input
//               id="staffId"
//               name="staffId"
//               value={formData.staffId}
//               onChange={handleChange}
//               placeholder="STAFF-001"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="role">User Role</Label>
//             <Select value={formData.selectedRole} onValueChange={handleRoleChange}>
//               <SelectTrigger id="role">
//                 <SelectValue placeholder="Select a role" />
//               </SelectTrigger>
//               <SelectContent>
//                 {roles.map((role) => (
//                   <SelectItem key={role.id} value={role.id}>
//                     {role.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//         </div>

          

//           <div className="flex gap-2 w-2/3 pt-4">
//             <Button type="submit" disabled={isSubmitting || isLoading} className="w-full">
//               {isSubmitting ? "Saving..." : user ? "Update User" : "Create User"}
//             </Button>
//             <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createUser, updateUser, User, UserStatus } from "@/actions/users";
import { Role } from "@/actions/roles";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface UserFormProps {
  user?: User | null;
  roles: Role[];
  isLoading?: boolean;
}

export function UserForm({ user, roles, isLoading }: UserFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    password: "",
    staffId: user?.staffId || "",
    status: user?.status || "PENDING",
    selectedRole: user?.userRoles?.[0]?.role.id || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, selectedRole: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value as UserStatus }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (user) {
        // Update existing user - send ALL fields
        const updateData: {
          firstName: string;
          lastName: string;
          email: string;
          phone: string;
          staffId?: string | null;
          status: UserStatus;
          roles?: string[];
          password?: string;
        } = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          staffId: formData.staffId || null,
          status: formData.status as UserStatus,
          roles: formData.selectedRole ? [formData.selectedRole] : [],
        };

        // Only include password if it was changed
        if (formData.password.trim()) {
          updateData.password = formData.password;
        }

        const result = await updateUser(user.id, updateData);

        if (result.success) {
          router.push("/dashboard/users");
          router.refresh();
        } else {
          setError(result.error || "Failed to update user");
        }
      } else {
        // Create new user
        if (!formData.password) {
          setError("Password is required for new users");
          setIsSubmitting(false);
          return;
        }

        const result = await createUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          staffId: formData.staffId || undefined,
          roles: formData.selectedRole ? [formData.selectedRole] : undefined,
        });

        if (result.success) {
          router.push("/dashboard/users");
          router.refresh();
        } else {
          setError(result.error || "Failed to create user");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{user ? "Edit User" : "Create New User"}</CardTitle>
        <CardDescription>
          {user
            ? "Update the user information below"
            : "Fill in the details to create a new user"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Password{" "}
              {!user && <span className="text-red-500">*</span>}
              {user && (
                <span className="text-muted-foreground text-xs">
                  (Leave blank to keep current password)
                </span>
              )}
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={user ? "Enter new password" : "Enter password"}
                value={formData.password}
                onChange={handleChange}
                required={!user}
                disabled={isSubmitting}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Staff ID and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="staffId">Staff ID (Optional)</Label>
              <Input
                id="staffId"
                name="staffId"
                placeholder="Enter staff ID"
                value={formData.staffId}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            {/* Status - Only show for editing */}
            {user && (
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={handleStatusChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="SUSPENDED">Suspended</SelectItem>
                    <SelectItem value="DEACTIVATED">Deactivated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <Label htmlFor="role">User Role</Label>
            <Select
              value={formData.selectedRole}
              onValueChange={handleRoleChange}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : user ? (
                "Update User"
              ) : (
                "Create User"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

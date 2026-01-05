
// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useForm, type SubmitHandler } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormDescription,
//   FormMessage,
// } from "@/components/ui/form"
// import { Badge } from "@/components/ui/badge"

// import { Plus, X } from "lucide-react"


// // -----------------------------------------------------------------------------
// // Zod Schema (Single Source of Truth)
// // -----------------------------------------------------------------------------
// const roleSchema = z.object({
//   name: z.string().min(2, "Role name must be at least 2 characters"),
//   slug: z
//     .string()
//     .min(2, "Slug must be at least 2 characters")
//     .regex(/^[a-z0-9_]+$/, "Slug can only contain lowercase letters, numbers, and underscores"),
//   description: z.string().optional(),
//   permissions: z.array(z.string()),
// })

// // Inferred type (DO NOT manually create interfaces for forms)
// export type RoleFormData = z.infer<typeof roleSchema>


// // -----------------------------------------------------------------------------
// // Props
// // -----------------------------------------------------------------------------
// interface RoleFormProps {
//   initialData?: Partial<RoleFormData>
//   onSubmit: SubmitHandler<RoleFormData>
//   isSubmitting: boolean
//   isSystemRole?: boolean
// }


// // -----------------------------------------------------------------------------
// // Component
// // -----------------------------------------------------------------------------
// export default function RoleForm({
//   initialData,
//   onSubmit,
//   isSubmitting,
//   isSystemRole = false,
// }: RoleFormProps) {
//   const [newPermission, setNewPermission] = useState("")

//   const form = useForm<RoleFormData>({
//     resolver: zodResolver(roleSchema),
//     defaultValues: {
//       name: initialData?.name ?? "",
//       slug: initialData?.slug ?? "",
//       description: initialData?.description ?? "",
//       permissions: initialData?.permissions ?? [],
//     },
//   })

//   const permissions = form.watch("permissions")

//   // ---------------------------------------------------------------------------
//   // Permission handlers
//   // ---------------------------------------------------------------------------
//   const handleAddPermission = () => {
//     const value = newPermission.trim()
//     if (!value || permissions.includes(value)) return

//     form.setValue("permissions", [...permissions, value], {
//       shouldValidate: true,
//     })
//     setNewPermission("")
//   }

//   const handleRemovePermission = (index: number) => {
//     form.setValue(
//       "permissions",
//       permissions.filter((_, i) => i !== index),
//       { shouldValidate: true }
//     )
//   }

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault()
//       handleAddPermission()
//     }
//   }

//   // ---------------------------------------------------------------------------
//   // Render
//   // ---------------------------------------------------------------------------
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

//         {/* Role Name */}
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Role Name</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="e.g. School Administrator"
//                   disabled={isSystemRole}
//                   {...field}
//                 />
//               </FormControl>
//               <FormDescription>Human-readable role name</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Slug */}
//         <FormField
//           control={form.control}
//           name="slug"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Slug</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="e.g. school_admin"
//                   disabled={isSystemRole}
//                   {...field}
//                 />
//               </FormControl>
//               <FormDescription>
//                 System identifier (lowercase, numbers, underscores)
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Description */}
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Describe what this role can do..."
//                   {...field}
//                 />
//               </FormControl>
//               <FormDescription>Optional</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Permissions */}
//         <FormItem>
//           <FormLabel>Permissions</FormLabel>

//           <div className="space-y-3">
//             <div className="flex gap-2">
//               <Input
//                 placeholder="e.g. create:users"
//                 value={newPermission}
//                 onChange={(e) => setNewPermission(e.target.value)}
//                 onKeyDown={handleKeyDown}
//               />
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={handleAddPermission}
//                 className="gap-2"
//               >
//                 <Plus className="w-4 h-4" />
//                 Add
//               </Button>
//             </div>

//             {permissions.length > 0 && (
//               <div className="flex flex-wrap gap-2">
//                 {permissions.map((permission, index) => (
//                   <Badge key={permission} variant="secondary" className="gap-1.5">
//                     {permission}
//                     <button
//                       type="button"
//                       onClick={() => handleRemovePermission(index)}
//                       className="hover:text-destructive"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   </Badge>
//                 ))}
//               </div>
//             )}

//             <FormDescription>
//               Examples: <code>create:users</code>, <code>edit:posts</code>,{" "}
//               <code>delete:roles</code>
//             </FormDescription>
//           </div>
//         </FormItem>

//         {/* Actions */}
//         <div className="flex gap-3 pt-6 border-t">
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? "Saving..." : "Save Role"}
//           </Button>

//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => window.history.back()}
//           >
//             Cancel
//           </Button>
//         </div>

//       </form>
//     </Form>
//   )
// }



"use client"

import type React from "react"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"

import { Plus, X } from "lucide-react"


// -----------------------------------------------------------------------------
// Zod Schema (Single Source of Truth)
// -----------------------------------------------------------------------------
const roleSchema = z.object({
  name: z.string().min(2, "Role name must be at least 2 characters"),
  description: z.string().optional(),
  permissions: z.array(z.string()),
})

// Inferred type
export type RoleFormData = z.infer<typeof roleSchema>


// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------
interface RoleFormProps {
  initialData?: Partial<RoleFormData>
  onSubmit: SubmitHandler<RoleFormData>
  isSubmitting: boolean
  isSystemRole?: boolean
}


// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
export default function RoleForm({
  initialData,
  onSubmit,
  isSubmitting,
  isSystemRole = false,
}: RoleFormProps) {
  const [newPermission, setNewPermission] = useState("")

  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      permissions: initialData?.permissions ?? [],
    },
  })

  const permissions = form.watch("permissions")

  // ---------------------------------------------------------------------------
  // Permission handlers
  // ---------------------------------------------------------------------------
  const handleAddPermission = () => {
    const value = newPermission.trim()
    if (!value || permissions.includes(value)) return

    form.setValue("permissions", [...permissions, value], {
      shouldValidate: true,
    })
    setNewPermission("")
  }

  const handleRemovePermission = (index: number) => {
    form.setValue(
      "permissions",
      permissions.filter((_, i) => i !== index),
      { shouldValidate: true }
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddPermission()
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* Role Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. School Administrator"
                  disabled={isSystemRole}
                  {...field}
                />
              </FormControl>
              <FormDescription>Human-readable role name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe what this role can do..."
                  {...field}
                />
              </FormControl>
              <FormDescription>Optional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Permissions */}
        <FormItem>
          <FormLabel>Permissions</FormLabel>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="e.g. create:users"
                value={newPermission}
                onChange={(e) => setNewPermission(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddPermission}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>

            {permissions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {permissions.map((permission, index) => (
                  <Badge key={permission} variant="secondary" className="gap-1.5">
                    {permission}
                    <button
                      type="button"
                      onClick={() => handleRemovePermission(index)}
                      className="hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            <FormDescription>
              Examples: <code>create:users</code>, <code>edit:posts</code>,{" "}
              <code>delete:roles</code>
            </FormDescription>
          </div>
        </FormItem>

        {/* Actions */}
        <div className="flex gap-3 pt-6 border-t">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Role"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
        </div>

      </form>
    </Form>
  )
}

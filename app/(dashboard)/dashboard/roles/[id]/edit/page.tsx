"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Loader } from "lucide-react"
import { toast } from "sonner"
import { getRoleById, Role, updateRole, UpdateRoleData } from "@/actions/roles"
import RoleForm from "../../components/roles-form"

export default function EditRolePage() {
  const router = useRouter()
  const params = useParams()
  const roleId = params.id as string
  const [role, setRole] = useState<Role | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchRole()
  }, [roleId])

  const fetchRole = async () => {
    try {
      setLoading(true)
      const result = await getRoleById(roleId)

      if (result.success && result.data) {
        setRole(result.data)
      } else {
        toast.error(result.error || "Failed to load role")
        router.push("/dashboard/roles")
      }
    } catch (error) {
      toast.error("Failed to load role")
      console.error(error)
      router.push("/dashboard/roles")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (data: UpdateRoleData) => {
    try {
      setIsSubmitting(true)
      const result = await updateRole(roleId, data)

      if (result.success) {
        toast.success("Role updated successfully")
        router.push("/dashboard/roles")
      } else {
        toast.error(result.error || "Failed to update role")
      }
    } catch (error) {
      toast.error("Failed to update role")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!role) {
    return (
      <div className="flex-1 space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Role not found</h1>
          <Link href="/dashboard/roles">
            <Button className="mt-4">Back to Roles</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div>
        <Link href="/dashboard/roles">
          <Button variant="ghost" className="gap-2 -ml-4 mb-4">
            <ChevronLeft className="w-4 h-4" />
            Back to Roles
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Role</h1>
        <p className="text-muted-foreground mt-2">Update role details and permissions</p>
      </div>

      {/* Form Card */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Role Details</CardTitle>
          <CardDescription>Modify the role name, system identifier, and associated permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <RoleForm
            initialData={{
              name: role.name,            //   description: role.description,
              permissions: role.permissions,
            }}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isSystemRole={role.isSystem}
          />
        </CardContent>
      </Card>
    </div>
  )
}

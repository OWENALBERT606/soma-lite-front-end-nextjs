"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Edit, Trash2, Loader } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { deleteRole, getRoleById, Role } from "@/actions/roles"

export default function RoleDetailPage() {
  const router = useRouter()
  const params = useParams()
  const roleId = params.id as string
  const [role, setRole] = useState<Role | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const result = await deleteRole(roleId)

      if (result.success) {
        toast.success("Role deleted successfully")
        router.push("/dashboard/roles")
      } else {
        toast.error(result.error || "Failed to delete role")
      }
    } catch (error) {
      toast.error("Failed to delete role")
      console.error(error)
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
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
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{role.name}</h1>
            <p className="text-muted-foreground mt-2">Role ID: {role.id}</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/dashboard/roles/${role.id}/edit`}>
              <Button className="gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </Link>
            {!role.isSystem && (
              <Button variant="destructive" className="gap-2" onClick={() => setShowDeleteDialog(true)}>
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{role.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Slug</p>
              <p className="font-mono text-sm">{role.slug}</p>
            </div>
            {role.description && (
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p>{role.description}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              {role.isSystem ? (
                <Badge className="bg-blue-600">System Role</Badge>
              ) : (
                <Badge variant="outline">Custom Role</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Metadata */}
        <Card>
          <CardHeader>
            <CardTitle>Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <p>{new Date(role.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p>{new Date(role.updatedAt).toLocaleDateString()}</p>
            </div>
            {role.schoolId && (
              <div>
                <p className="text-sm text-muted-foreground">School ID</p>
                <p className="font-mono text-sm">{role.schoolId}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
          <CardDescription>
            {role.permissions.length} permission{role.permissions.length !== 1 ? "s" : ""} assigned
          </CardDescription>
        </CardHeader>
        <CardContent>
          {role.permissions.length === 0 ? (
            <p className="text-muted-foreground">No permissions assigned to this role</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {role.permissions.map((permission) => (
                <Badge key={permission} variant="secondary">
                  {permission}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the "{role.name}" role? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

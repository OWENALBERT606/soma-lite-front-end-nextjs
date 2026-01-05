"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Trash2, Edit, Plus, Loader } from "lucide-react"
import { deleteRole, getRoles, Role } from "@/actions/roles"

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      setLoading(true)
      const result = await getRoles()

      if (result.success && result.data) {
        setRoles(result.data)
      } else {
        toast.error(result.error || "Failed to load roles")
      }
    } catch (error) {
      toast.error("Failed to load roles")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      setIsDeleting(true)
      const result = await deleteRole(deleteId)

      if (result.success) {
        toast.success("Role deleted successfully")
        setRoles(roles.filter((r) => r.id !== deleteId))
        setDeleteId(null)
      } else {
        toast.error(result.error || "Failed to delete role")
      }
    } catch (error) {
      toast.error("Failed to delete role")
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roles</h1>
          <p className="text-muted-foreground mt-2">Manage system and organization roles</p>
        </div>
        <Link href="/dashboard/roles/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Role
          </Button>
        </Link>
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Roles</CardTitle>
          <CardDescription>
            {roles.length} role{roles.length !== 1 ? "s" : ""} in your system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b bg-muted/50">
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No roles created yet
                    </TableCell>
                  </TableRow>
                ) : (
                  roles.map((role) => (
                    <TableRow key={role.id} className="border-b hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{role.slug}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.length === 0 ? (
                            <span className="text-muted-foreground text-sm">—</span>
                          ) : (
                            role.permissions.slice(0, 2).map((perm) => (
                              <Badge key={perm} variant="secondary" className="text-xs">
                                {perm}
                              </Badge>
                            ))
                          )}
                          {role.permissions.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{role.permissions.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {role.isSystem ? (
                          <Badge className="bg-blue-600">System</Badge>
                        ) : (
                          <Badge variant="outline">Custom</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/roles/${role.id}/edit`}>
                            <Button variant="ghost" size="sm" className="gap-2">
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                          </Link>
                          {!role.isSystem && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => setDeleteId(role.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this role? This action cannot be undone.
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

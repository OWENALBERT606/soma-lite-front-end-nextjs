import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { getUsers } from "@/actions/users"
import { UserTable } from "./components/user-table"

async function UserListContent() {
  const result = await getUsers()

  if (!result.success) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-medium">{result.error}</p>
      </div>
    )
  }

  return <UserTable users={result.data || []} />
}

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-2">Manage system users and their roles</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/users/create">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div className="text-center py-12">Loading users...</div>}>
        <UserListContent />
      </Suspense>
    </div>
  )
}

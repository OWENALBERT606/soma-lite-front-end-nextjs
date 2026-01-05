import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { getUserById } from "@/actions/users"
import { getRoles } from "@/actions/roles"
import { UserForm } from "../components/user-form"

interface UserDetailPageProps {
  params: Promise<{ id: string }>
}

async function UserDetailContent({ userId }: { userId: string }) {
  const [userResult, rolesResult] = await Promise.all([getUserById(userId), getRoles()])

  if (!userResult.success || !userResult.data) {
    return (
      <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <AlertCircle className="w-5 h-5 text-yellow-600" />
        <p className="text-yellow-700">{userResult.error || "User not found"}</p>
      </div>
    )
  }

  if (!rolesResult.success) {
    return (
      <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <p className="text-red-700">{rolesResult.error}</p>
      </div>
    )
  }

  return <UserForm user={userResult.data} roles={rolesResult.data || []} />
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params

  return (
    <div className="space-y-6 flex flex-col justify-start items-start ">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard/users">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </Link>
      </Button>

      <Suspense fallback={<div className="text-center py-12">Loading user...</div>}>
        <UserDetailContent userId={id} />
      </Suspense>
    </div>
  )
}

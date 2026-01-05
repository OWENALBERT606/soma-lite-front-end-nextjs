import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { UserForm } from "../components/user-form"
import { getRoles } from "@/actions/roles"

async function CreateUserContent() {
  const rolesResult = await getRoles()

  if (!rolesResult.success) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-medium">{rolesResult.error}</p>
      </div>
    )
  }

  return <UserForm roles={rolesResult.data || []} />
}

export default function CreateUserPage() {
  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard/users">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </Link>
      </Button>

      <Suspense fallback={<div className="text-center py-12">Loading form...</div>}>
        <CreateUserContent />
      </Suspense>
    </div>
  )
}

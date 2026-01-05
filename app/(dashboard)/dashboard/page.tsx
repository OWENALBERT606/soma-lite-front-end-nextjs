import React from 'react'
import { SuperAdminDashboard } from './components/dashboard'

export default function page() {
  return (
    <div>
       <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          <SuperAdminDashboard />
        </div>
    </div>
  )
}

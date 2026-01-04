"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Home,
  Hotel,
  Calendar,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

const UserSidebar = () => {
  return (
    <aside className="sticky top-0 h-screen w-64 bg-background dark:bg-background/90 border-r border-border">
      <div className="p-6 flex items-center gap-2">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
          <AvatarFallback>ET</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">Emma Thompson</span>
          <span className="text-xs text-muted-foreground">Premium Member</span>
        </div>
      </div>
      <nav className="mt-4 px-3">
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center p-2 rounded-md bg-primary/10 text-primary hover:bg-primary/15"
            >
              <Home className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/bookings"
              className="flex items-center p-2 rounded-md hover:bg-muted"
            >
              <Hotel className="h-5 w-5 mr-2" />
              My Bookings
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/trips"
              className="flex items-center p-2 rounded-md hover:bg-muted"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Trip Planner
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/messages"
              className="flex items-center p-2 rounded-md hover:bg-muted"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Messages
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/payments"
              className="flex items-center p-2 rounded-md hover:bg-muted"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Methods
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center p-2 rounded-md hover:bg-muted"
            >
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default UserSidebar;

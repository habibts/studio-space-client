"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { LayoutDashboard, PlusCircle, List, Calendar } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

interface UserProfileDropdownProps {
  user: { name?: string | null; email?: string | null; image?: string | null };
}

export default function UserProfileDropdown({ user }: UserProfileDropdownProps) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-col items-center gap-0.5">
        <div className="flex items-center gap-1">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} className="object-cover" />
            <AvatarFallback className="bg-orange-500 text-white font-bold flex items-center justify-center">
              {(user.name || "U").charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
        <span className="max-w-[120px] truncate text-[10px] text-muted-foreground">{user.email}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              <span className="font-medium break-words">{user.name}</span>
              <span className="text-xs text-muted-foreground break-words whitespace-normal">{user.email}</span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/dashboard")}>
          <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/studios/add-studio")}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Studio
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/my-listings")}>
          <List className="mr-2 h-4 w-4" /> My Studio Listings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/my-bookings")}>
          <Calendar className="mr-2 h-4 w-4" /> My Bookings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await authClient.signOut();
            toast.add({ title: "Logged out successfully", description: "You have been signed out.", type: "success" });
            router.push("/");
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
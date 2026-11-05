"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LayoutDashboard, PlusCircle, List, Calendar, ChevronDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
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
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await authClient.signOut();
      toast.success("Logged out successfully!");
      router.push("/");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Logout failed. Please try again.");
      setLoggingOut(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.image || ""} alt={user.name || "User"} className="object-cover" />
              <AvatarFallback className="bg-[#F59E0B] text-white font-bold flex items-center justify-center">
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
          <DropdownMenuItem onClick={handleLogout} disabled={loggingOut}>
            {loggingOut && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loggingOut ? "Signing out..." : "Logout"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {loggingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
            <p className="text-sm text-muted-foreground">Signing out...</p>
          </div>
        </div>
      )}
    </>
  );
}
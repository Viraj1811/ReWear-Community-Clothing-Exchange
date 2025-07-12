"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Gem, LayoutDashboard, LogOut, User } from "lucide-react";

export default function AuthButton({ mobile = false }: { mobile?: boolean }) {
  const { isAuthenticated, user, logout } = useAuth();

  if (mobile) {
    return isAuthenticated && user ? (
      <div className="flex flex-col space-y-2">
         <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://placehold.co/100x100.png`} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button variant="ghost" asChild className="justify-start">
            <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
          </Button>
          <Button variant="ghost" onClick={logout} className="text-red-500 hover:text-red-600 justify-start">
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
      </div>
    ) : (
      <div className="flex flex-col space-y-2">
        <Button asChild><Link href="/login">Log In</Link></Button>
        <Button asChild variant="outline"><Link href="/signup">Sign Up</Link></Button>
      </div>
    );
  }

  return isAuthenticated && user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://placehold.co/100x100.png`} alt={user.name} data-ai-hint="person" />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center"><Gem className="mr-2 h-4 w-4 text-primary" /> Points</div>
                <span>{user.points}</span>
            </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" asChild>
        <Link href="/login">Log In</Link>
      </Button>
      <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
        <Link href="/signup">Sign Up</Link>
      </Button>
    </div>
  );
}

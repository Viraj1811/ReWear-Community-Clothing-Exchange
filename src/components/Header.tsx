"use client";

import Link from "next/link";
import { Recycle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthButton from "./AuthButton";
import { useAuth } from "@/lib/auth";
import React from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Button variant="ghost" asChild>
        <Link href={href}>{children}</Link>
    </Button>
);

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <SheetClose asChild>
        <Link href={href} className="block px-4 py-2 text-lg rounded-md hover:bg-accent">
            {children}
        </Link>
    </SheetClose>
);

export default function Header() {
    const { isAuthenticated } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Recycle className="h-6 w-6 text-primary" />
                    <span className="font-headline font-bold text-lg">ReWear Revolution</span>
                </Link>

                <div className="hidden md:flex flex-1 items-center space-x-2">
                    <NavLink href="/browse">Browse</NavLink>
                    {isAuthenticated && (
                        <>
                            <NavLink href="/dashboard">Dashboard</NavLink>
                            <NavLink href="/items/new">List an Item</NavLink>
                        </>
                    )}
                </div>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <div className="hidden md:block">
                        <AuthButton />
                    </div>
                     <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="p-4">
                                    <div className="flex flex-col space-y-4">
                                       <MobileNavLink href="/browse">Browse</MobileNavLink>
                                        {isAuthenticated && (
                                            <>
                                                <MobileNavLink href="/dashboard">Dashboard</MobileNavLink>
                                                <MobileNavLink href="/items/new">List an Item</MobileNavLink>
                                            </>
                                        )}
                                        <div className="pt-4 border-t">
                                            <AuthButton mobile />
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}

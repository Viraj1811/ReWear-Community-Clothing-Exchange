import { Recycle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-muted/50 mt-12">
            <div className="container py-8 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <Recycle className="h-5 w-5 text-primary" />
                    <span className="font-headline text-md">ReWear Revolution</span>
                </div>
                <div className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} ReWear Revolution. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Gem, PlusCircle, Settings, Edit } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { userItems, swapHistory } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();       

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="font-headline text-2xl">Profile</CardTitle>
                    <Button variant="ghost" size="icon"><Settings className="w-5 h-5"/></Button>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                    <Avatar className="w-24 h-24 mb-4">
                        <AvatarImage src="https://placehold.co/100x100.png" alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Points Balance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center text-5xl font-bold text-primary">
                        <Gem className="w-10 h-10 mr-4"/>
                        {user.points}
                    </div>
                    <p className="text-center text-muted-foreground mt-2">Use points to redeem items from other users.</p>
                </CardContent>
            </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline text-2xl">Your Items</CardTitle>
                        <CardDescription>Items you have listed for swapping.</CardDescription>
                    </div>
                    <Button asChild><Link href="/items/new"><PlusCircle className="mr-2 h-4 w-4"/> List New Item</Link></Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Points</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userItems.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Image src={item.image} alt={item.title} width={64} height={64} className="rounded-md object-cover aspect-square"/>
                                    </TableCell>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell>{item.points}</TableCell>
                                    <TableCell><Badge variant={item.status === 'Available' ? 'default' : 'secondary'}>{item.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon"><Edit className="w-4 h-4"/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Swap History</CardTitle>
                    <CardDescription>Your ongoing and completed swaps.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="ongoing">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                        </TabsList>
                        <TabsContent value="ongoing">
                             <p className="text-muted-foreground p-8 text-center">You have no ongoing swaps.</p>
                        </TabsContent>
                        <TabsContent value="completed">
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Item Sent</TableHead>
                                        <TableHead>Item Received</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {swapHistory.filter(s => s.status === 'Completed').map(swap => (
                                        <TableRow key={swap.id}>
                                            <TableCell>{swap.date}</TableCell>
                                            <TableCell>{swap.itemSent.title}</TableCell>
                                            <TableCell>{swap.itemReceived?.title}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

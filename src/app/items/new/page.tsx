"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useTransition } from "react";
import { moderateContent } from "@/ai/flows/content-moderation";
import Image from "next/image";
import { useAuth } from '@/lib/auth';
import { useEffect } from 'react';

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z.string().min(20, "Description must be at least 20 characters."),
  category: z.string({ required_error: "Please select a category." }),
  type: z.string().min(2, "Type is required."),
  size: z.string().min(1, "Size is required."),
  condition: z.string({ required_error: "Please select the condition." }),
  tags: z.string().optional(),
  image: z.any().refine((files) => files?.length === 1, "Image is required."),
});

type FormValues = z.infer<typeof formSchema>;

const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
});

export default function NewItemPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      size: "",
      tags: "",
    },
  });

  async function onSubmit(values: FormValues) {
    const file = values.image[0];
    if (!file) return;

    const photoDataUri = await toBase64(file);

    startTransition(async () => {
        try {
            const moderationResult = await moderateContent({
                photoDataUri,
                title: values.title,
                description: values.description,
            });

            if (!moderationResult.isAppropriate) {
                toast({
                    title: "Content Moderation Failed",
                    description: moderationResult.reason || "Your listing was flagged as inappropriate.",
                    variant: "destructive",
                });
                return;
            }

            // Mock submission
            toast({
                title: "Success!",
                description: `Your item "${values.title}" has been listed.`,
            });
            router.push("/dashboard");

        } catch (error) {
            console.error("Error during moderation or submission:", error);
            toast({
                title: "An Error Occurred",
                description: "Could not process your request. Please try again.",
                variant: "destructive",
            });
        }
    });
  }
  
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">List a New Item</CardTitle>
          <CardDescription>Fill out the details below to add a new piece to your collection.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Item Image</FormLabel>
                    <FormControl>
                        <Input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                                field.onChange(e.target.files);
                                if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setImagePreview(reader.result as string);
                                    }
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                    {imagePreview && <Image src={imagePreview} alt="Image preview" width={200} height={200} className="mt-4 rounded-md object-cover" />}
                    </FormItem>
                )}
                />

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., Vintage Blue Denim Jacket" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                        <Textarea placeholder="Describe your item, its condition, and any unique features." className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Tops">Tops</SelectItem>
                                <SelectItem value="Bottoms">Bottoms</SelectItem>
                                <SelectItem value="Dresses">Dresses</SelectItem>
                                <SelectItem value="Outerwear">Outerwear</SelectItem>
                                <SelectItem value="Accessories">Accessories</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Item Type</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., T-Shirt, Jeans" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Size</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., M, 10, 42" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="condition"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Condition</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="New with tags">New with tags</SelectItem>
                                <SelectItem value="Excellent">Excellent</SelectItem>
                                <SelectItem value="Good">Good</SelectItem>
                                <SelectItem value="Fair">Fair</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., vintage, denim, 80s (comma separated)" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />


              <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                {isPending ? "Submitting for Review..." : "List Item"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

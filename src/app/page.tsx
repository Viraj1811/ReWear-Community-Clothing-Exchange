import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { featuredItems } from "@/lib/data";
import { ArrowRight, Recycle, Shirt, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                    Join the ReWear Revolution
                  </h1>
                  <p className="max-w-[600px] text-foreground/80 md:text-xl">
                    Give your wardrobe a second life. Swap, discover, and redefine your style with our community of fashion lovers.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/signup">
                      Start Swapping
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/browse">Browse Items</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x600.png"
                width="600"
                height="600"
                alt="Hero"
                data-ai-hint="stylish clothes"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section id="featured" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">Featured Items</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent>
                {featuredItems.map((item) => (
                  <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="h-full transition-shadow duration-300 hover:shadow-xl">
                        <CardContent className="flex aspect-square items-center justify-center p-0 relative overflow-hidden rounded-t-lg">
                           <Image src={item.image} alt={item.title} width={400} height={400} className="object-cover w-full h-full" data-ai-hint={item.aiHint}/>
                        </CardContent>
                        <div className="p-4 bg-card">
                           <h3 className="font-headline text-lg font-semibold">{item.title}</h3>
                           <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                           <Button asChild variant="link" className="px-0 mt-2">
                             <Link href={`/items/${item.id}`}>View Item <ArrowRight className="ml-1 h-4 w-4" /></Link>
                           </Button>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A simple, point-based system for a fair and fun swapping experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center p-4 rounded-lg">
                 <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                       <Shirt className="h-10 w-10 text-primary" />
                    </div>
                 </div>
                <h3 className="font-headline text-lg font-bold">1. List Your Items</h3>
                <p className="text-sm text-muted-foreground">Upload photos and descriptions of clothes you're ready to part with. Our system helps you assign a point value.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg">
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                       <Users className="h-10 w-10 text-primary" />
                    </div>
                 </div>
                <h3 className="font-headline text-lg font-bold">2. Browse & Swap</h3>
                <p className="text-sm text-muted-foreground">Explore items from other members. Use your points to "buy" items you love or propose a direct swap.</p>
              </div>
               <div className="grid gap-1 text-center p-4 rounded-lg">
                 <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                       <Recycle className="h-10 w-10 text-primary" />
                    </div>
                 </div>
                <h3 className="font-headline text-lg font-bold">3. Redefine Your Style</h3>
                <p className="text-sm text-muted-foreground">Receive your new pieces and enjoy your refreshed wardrobe. It's sustainable, affordable, and fun.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

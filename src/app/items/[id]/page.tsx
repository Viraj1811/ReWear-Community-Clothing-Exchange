import { allItems, type Item } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Gem, Heart, Tag, Weight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = allItems.find((i) => i.id === params.id);

  if (!item) {
    notFound();
  }

  const images = [item.image, "https://placehold.co/600x600.png", "https://placehold.co/600x600.png"];

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
           <Carousel className="w-full">
            <CarouselContent>
              {images.map((img, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <Image
                        src={img}
                        alt={`${item.title} - view ${index + 1}`}
                        width={600}
                        height={600}
                        className="aspect-square object-cover w-full"
                        data-ai-hint={item.aiHint}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3" />
            <CarouselNext className="right-3" />
          </Carousel>
        </div>
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <h1 className="font-headline text-3xl md:text-4xl font-bold">{item.title}</h1>
            <div className="flex items-center text-2xl font-semibold text-primary">
                <Gem className="w-6 h-6 mr-2" />
                {item.points} Points
            </div>
            <p className="text-muted-foreground text-lg">{item.description}</p>
          </div>

          <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl">Item Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2"><Tag className="w-4 h-4 text-muted-foreground" /><strong>Category:</strong> {item.category}</div>
                <div className="flex items-center gap-2"><Tag className="w-4 h-4 text-muted-foreground" /><strong>Type:</strong> {item.type}</div>
                <div className="flex items-center gap-2"><Tag className="w-4 h-4 text-muted-foreground" /><strong>Size:</strong> {item.size}</div>
                <div className="flex items-center gap-2"><Tag className="w-4 h-4 text-muted-foreground" /><strong>Condition:</strong> {item.condition}</div>
            </CardContent>
          </Card>

          <div className="flex items-center space-x-2">
            <span className="font-medium">Tags:</span>
            {item.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
          </div>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={item.uploader.avatar} alt={item.uploader.name} />
                        <AvatarFallback>{item.uploader.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{item.uploader.name}</p>
                        <p className="text-xs text-muted-foreground">Member since 2023</p>
                    </div>
                </div>
                 <Button variant="outline" size="sm">View Profile</Button>
            </CardContent>
          </Card>


          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Heart className="mr-2 h-5 w-5"/> Request Swap
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
               <Gem className="mr-2 h-5 w-5"/> Redeem with Points
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Item } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Gem } from "lucide-react";

export function ItemCard({ item }: { item: Item }) {
  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
      <Link href={`/items/${item.id}`} className="block">
        <CardHeader className="p-0">
          <Image
            src={item.image}
            alt={item.title}
            width={400}
            height={400}
            className="aspect-square object-cover w-full"
            data-ai-hint={item.aiHint}
          />
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-headline text-lg font-semibold tracking-tight">
          <Link href={`/items/${item.id}`}>{item.title}</Link>
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{item.size} - {item.condition}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center font-semibold text-primary">
          <Gem className="w-4 h-4 mr-1.5"/>
          {item.points} Points
        </div>
        <Button asChild variant="secondary" size="sm">
          <Link href={`/items/${item.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { Property, properties } from "@/data/properties";

const featuredHotels: Property[] = properties.slice(0, 4);

interface FeaturedHotelsProps {
  hotels?: Property[];
}

const FeaturedHotels = ({ hotels = featuredHotels }: FeaturedHotelsProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-3xl font-bold mb-3">Featured Hotels</h2>
          <p className="text-muted-foreground max-w-2xl">
            Discover our handpicked selection of exceptional accommodations
            around the world, offering unforgettable experiences and
            unparalleled comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <Card
              key={hotel.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={hotel.image || "/placeholder.svg"}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                {hotel.featured && (
                  <Badge className="absolute top-2 right-2 bg-primary">
                    Featured
                  </Badge>
                )}
              </div>
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold">{hotel.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground text-sm mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {hotel.location}
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                {hotel.description && (
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {hotel.description}
                  </p>
                )}
                <p className="text-xl font-bold">
                  ${hotel.price}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    / night
                  </span>
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/hotel/${hotel.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels;

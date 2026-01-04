import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const destinations = [
  {
    id: 1,
    name: "Santorini",
    country: "Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2069&auto=format&fit=crop",
    properties: 48,
    trending: true,
  },
  {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop",
    properties: 124,
    trending: true,
  },
  {
    id: 3,
    name: "Amalfi Coast",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?q=80&w=2070&auto=format&fit=crop",
    properties: 67,
    trending: false,
  },
  {
    id: 4,
    name: "Dubai",
    country: "UAE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
    properties: 215,
    trending: true,
  },
  {
    id: 5,
    name: "Kyoto",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    properties: 92,
    trending: false,
  },
  {
    id: 6,
    name: "Maldives",
    country: "Maldives",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2074&auto=format&fit=crop",
    properties: 78,
    trending: true,
  },
];

const TrendingDestinations = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((destination) => (
        <Link href={`/destinations/${destination.id}`} key={destination.id}>
          <Card className="overflow-hidden h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-64 overflow-hidden">
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold">{destination.name}</h3>
                <p className="text-white/80">{destination.country}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">
                    {destination.properties} properties
                  </span>
                  {destination.trending && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/80 text-white hover:bg-primary"
                    >
                      Trending
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default TrendingDestinations;

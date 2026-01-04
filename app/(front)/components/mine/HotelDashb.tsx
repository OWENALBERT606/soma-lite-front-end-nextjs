import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, Hotel, MapPin } from "lucide-react";
import UserSidebar from "./user-sidebar";

export default function DashboardPage() {
  const upcomingBookings = [
    {
      id: "LUX-25789",
      hotel: "The Grand Palace Hotel",
      location: "Paris, France",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      checkIn: "Mar 15, 2025",
      checkOut: "Mar 20, 2025",
      status: "confirmed",
      price: 2520,
    },
    {
      id: "LUX-26544",
      hotel: "Azure Beach Resort",
      location: "Maldives",
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
      checkIn: "Jun 10, 2025",
      checkOut: "Jun 17, 2025",
      status: "pending",
      price: 4760,
    },
  ];

  const pastBookings = [
    {
      id: "LUX-24532",
      hotel: "Mountain View Lodge",
      location: "Swiss Alps",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
      checkIn: "Dec 10, 2024",
      checkOut: "Dec 15, 2024",
      status: "completed",
      price: 1600,
    },
    {
      id: "LUX-23789",
      hotel: "Sakura Ryokan",
      location: "Kyoto, Japan",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
      checkIn: "Oct 5, 2024",
      checkOut: "Oct 10, 2024",
      status: "completed",
      price: 1950,
    },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      <UserSidebar />

      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, Emma</h1>
              <p className="text-muted-foreground mt-1">
                Manage your bookings and account settings
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button>
                <Hotel className="mr-2 h-4 w-4" />
                Book a New Stay
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Upcoming Stays
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Loyalty Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,250</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Spent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$10,830</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="upcoming" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
              <TabsTrigger value="past">Past Stays</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{booking.hotel}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {booking.location}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : "outline"
                          }
                        >
                          {booking.status === "confirmed"
                            ? "Confirmed"
                            : "Pending"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex gap-4">
                        <img
                          src={booking.image || "/placeholder.svg"}
                          alt={booking.hotel}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              Check-in:{" "}
                              <span className="font-medium">
                                {booking.checkIn}
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              Check-out:{" "}
                              <span className="font-medium">
                                {booking.checkOut}
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              Total:{" "}
                              <span className="font-medium">
                                ${booking.price}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">Manage Booking</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="past">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{booking.hotel}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {booking.location}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex gap-4">
                        <img
                          src={booking.image || "/placeholder.svg"}
                          alt={booking.hotel}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              Check-in:{" "}
                              <span className="font-medium">
                                {booking.checkIn}
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              Check-out:{" "}
                              <span className="font-medium">
                                {booking.checkOut}
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              Total:{" "}
                              <span className="font-medium">
                                ${booking.price}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="secondary" size="sm">
                        Write Review
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>
                Based on your previous stays and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-lg overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop"
                      alt="Luxury Hotel"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                      <h3 className="font-bold">Riverside Suites</h3>
                      <p className="text-sm text-white/80">London, UK</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2089&auto=format&fit=crop"
                      alt="Luxury Hotel"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                      <h3 className="font-bold">Ocean View Resort</h3>
                      <p className="text-sm text-white/80">Bali, Indonesia</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop"
                      alt="Luxury Hotel"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                      <h3 className="font-bold">Desert Oasis</h3>
                      <p className="text-sm text-white/80">Dubai, UAE</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

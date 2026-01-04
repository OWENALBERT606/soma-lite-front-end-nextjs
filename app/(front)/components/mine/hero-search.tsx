"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Search, Home, CreditCard, Calendar } from "lucide-react";

const HeroSearch = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [budget, setBudget] = useState("");
  const [moveInDate, setMoveInDate] = useState("");

  const districts = ["Kampala", "Wakiso", "Mukono", "Entebbe", "Jinja", "Mbarara"];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (propertyType !== "all") params.append("category", propertyType);
    if (budget) params.append("maxBudget", budget);
    if (moveInDate) params.append("date", moveInDate);
    
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="glass-card rounded-xl p-2 md:p-3 max-w-5xl shadow-2xl">
      <div className="flex flex-col md:flex-row items-center gap-2">
        {/* Location Dropdown */}
        <div className="relative flex-1 w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50 z-10" />
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-lg bg-white/5 border-none text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer text-sm font-medium"
          >
            <option value="" className="text-slate-900">Where are you going?</option>
            {districts.map(d => (
              <option key={d} value={d} className="text-slate-900">{d}</option>
            ))}
          </select>
        </div>

        {/* Separator */}
        <div className="hidden md:block w-px h-8 bg-white/10" />

        {/* Property Type Select */}
        <div className="relative flex-1 w-full md:w-auto">
          <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50 z-10" />
          <select
            id="type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-lg bg-white/5 border-none text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer text-sm font-medium"
          >
            <option value="all" className="text-slate-900">Property Type</option>
            <option value="rentals" className="text-slate-900">Rentals</option>
            <option value="hostels" className="text-slate-900">Hostels</option>
            <option value="apartments" className="text-slate-900">Apartments</option>
            <option value="short-stay" className="text-slate-900">Short Stay</option>
          </select>
        </div>

        {/* Separator */}
        <div className="hidden md:block w-px h-8 bg-white/10" />

        {/* Move-in Date */}
        <div className="relative flex-1 w-full md:w-auto">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50 z-10 pointer-events-none" />
          <Input
            id="move-in"
            type="date"
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
            placeholder="Check-in date"
            className="w-full h-12 pl-10 bg-white/5 border-none text-white placeholder:text-white/40 [color-scheme:dark] focus:ring-2 focus:ring-emerald-500/50 rounded-lg text-sm"
          />
        </div>

        {/* Search Button */}
        <Button 
          size="lg" 
          className="w-full md:w-auto px-10 h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};


export default HeroSearch;


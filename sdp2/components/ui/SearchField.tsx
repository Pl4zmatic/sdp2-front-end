"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SearchFieldProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
  label?: string;
  debounceTime?: number;
  className?: string;
}

export default function SearchField({
  placeholder = "Search...",
  onSearch,
  label,
  debounceTime = 300,
  className = "",
}: SearchFieldProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Kleine vertraging van de zoekterm om te zorgen dat de zoekopdracht niet te vaak wordt uitgevoerd
  // (is goed als we later API calls toevoegen, dan wordt het niet te vaak aangeroepen)
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch, debounceTime]);

  return (
    <div className={`${className}`}>
      {label && (
        <Label htmlFor="search" className="text-white mb-2 block">
          {label}
        </Label>
      )}
      <div className="relative w-full max-w-lg">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white dark:text-gray-400"
          size={18}
        />
        <Input
          id="search"
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-delawareRed dark:bg-navy shadow-md dark:border-lightestNavy text-white placeholder:text-white dark:placeholder:text-white focus:border-delawareRed focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
        />
      </div>
    </div>
  );
}

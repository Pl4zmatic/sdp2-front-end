"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SearchFieldProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
  label?: string;
  debounceTime?: number;
  className?: string;
  customStyles?: {
    input?: string;
    icon?: string;
  };
}

export default function SearchField({
  placeholder = "Search...",
  onSearch,
  label,
  debounceTime = 300,
  className = "",
  customStyles = {},
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
      <div className="relative w-full">
        <span
          className={`absolute ${customStyles.icon || "left-3 top-1/2 transform -translate-y-1/2 text-gray-400"}`}
        >
          🔍
        </span>
        <Input
          id="search"
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={
            customStyles.input ||
            "pl-10 bg-neutral-100 text-black/40 dark:bg-navy shadow-md dark:border-lightestNavy placeholder:text-black/30 dark:text-white dark:placeholder:text-white focus:border-delawareRed focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
          }
        />
      </div>
    </div>
  );
}

import { useState } from "react";
import { Icon } from "@iconify/react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

/**
 * SearchBar component for searching chains and protocols
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search chains, protocols...",
  onSearch,
  className = "",
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Icon
          icon="mdi:magnify"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bodyTextDim"
          width={20}
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full bg-bgColor border border-borderColor rounded-lg pl-12 pr-4 py-3 text-bodyText placeholder-bodyTextDim focus:outline-none focus:border-primary transition-colors"
        />
      </div>
    </form>
  );
};



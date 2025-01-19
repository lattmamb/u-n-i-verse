import { Search } from "lucide-react";

export const SearchBar = () => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search..."
      className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-48 backdrop-blur-sm"
    />
    <Search className="absolute right-3 top-2.5 text-white/50 w-5 h-5" />
  </div>
);
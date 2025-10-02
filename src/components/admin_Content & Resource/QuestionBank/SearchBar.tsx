import React from "react";

interface SearchBarProps {
  placeholder?: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder || "Search..."}
      onChange={(e) => onChange(e.target.value)}
      className="w-full py-3 px-4 sm:px-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded border border-slate-300 bg-white"
    />
  );
};


export default SearchBar;

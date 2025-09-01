import React, { useState, useRef } from "react";
import { Search } from "lucide-react";

/**
 * Standalone search input component that maintains its own state
 * to avoid re-rendering and focus issues
 */
const SearchInput = ({
  onSearchChange
}: {
  onSearchChange: (value: string) => void
}) => {
  // Internal state to maintain focus
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onSearchChange(newValue);
  };

  // Handle clearing the input
  const handleClear = () => {
    setInputValue("");
    onSearchChange("");
    // Refocus the input after clearing
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
        placeholder="Search decisions or KPIs..."
        value={inputValue}
        onChange={handleChange}
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          type="button"
          data-search-clear
        >
          <span className="text-gray-400 hover:text-gray-500">×</span>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
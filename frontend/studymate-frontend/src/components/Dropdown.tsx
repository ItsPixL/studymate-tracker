// ./components/Dropdown.tsx

// Import Modules
import { useState, useRef, useEffect } from "react";

// Define Types
type Option = {
  label: string;
  value: string;
};

type types = {
  label: string;
  options: Option[];
  selected: Option | null;
  onSelect: (option: Option) => void;
};

// Export Dropdown
export default function Dropdown({
  label,
  options,
  selected,
  onSelect,
}: types) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: Option) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-transparent border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-slate-900 w-64 text-left"
      >
        {selected ? selected.label : label}
        <span className="float-right">▾</span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-48 bg-slate-800 border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-slate-900 cursor-pointer rounded-md"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';

import type { CustomSelectProps } from '@/interface/customSelect.interface';

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  name,
  error,
  disabled,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value) || options[0];

  const selectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={selectRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor={name}>
        {label}
      </label>

      <button
        id={name}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 border rounded-xl transition-all outline-none
          ${isOpen ? 'ring-2 ring-indigo-500 border-indigo-500' : 'border-gray-200'}
          ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-200' : 'hover:bg-white'}
          ${error ? 'border-red-500 ring-red-200' : ''}
        `}
      >
        <div className="flex items-center text-gray-700">
          {selectedOption?.icon}
          <span className="ml-2 text-sm font-medium">{selectedOption?.label}</span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`flex items-center px-4 py-3 cursor-pointer transition-colors
                ${value === option.value ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}
              `}
            >
              {option.icon}
              <span className="ml-2 text-sm font-medium">{option.label}</span>
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-500 italic">{error}</p>}
    </div>
  );
};

export default CustomSelect;

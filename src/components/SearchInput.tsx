import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchInputProps {
  onSearch: (value: string) => void;
}

export function SearchInput({ onSearch }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  return (
    <div className="relative max-w-xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar personagem..."
        className="input w-full pl-10 pr-3 py-3 text-lg"
      />
    </div>
  );
} 
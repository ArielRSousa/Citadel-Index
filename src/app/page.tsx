'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '@/services/api';
import { Character } from '@/types/character';
import { CharacterCard } from '@/components/CharacterCard';
import { CharacterModal } from '@/components/CharacterModal';
import { Pagination } from '@/components/Pagination';
import { SearchInput } from '@/components/SearchInput';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['characters', page, search],
    queryFn: () => getCharacters(page, search),
    retry: 1,
    keepPreviousData: true,
    staleTime: 5000, // Mantém os dados em cache por 5 segundos
  });

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (isError) {
    return (
      <div className="min-h-screen p-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Rick and Morty Characters
          </h1>
          <div className="bg-red-900/50 border border-red-500 rounded-md p-4 text-center">
            <p className="text-red-200">
              {error instanceof Error 
                ? error.message 
                : 'Ocorreu um erro ao carregar os personagens. Por favor, tente novamente.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Rick and Morty Characters
        </h1>

        <div className="mb-8">
          <SearchInput onSearch={handleSearch} />
        </div>

        {isLoading && !data ? (
          <LoadingSpinner />
        ) : (
          <>
            {data?.results.length === 0 ? (
              <div className="text-center text-gray-400 py-8 bg-gray-800/50 rounded-lg border border-gray-700">
                Nenhum personagem encontrado com esse nome.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.results.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    onClick={setSelectedCharacter}
                  />
                ))}
              </div>
            )}

            {data && data.info.pages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={data.info.pages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        <CharacterModal
          character={selectedCharacter}
          isOpen={!!selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      </div>
    </div>
  );
} 
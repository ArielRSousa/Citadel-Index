import { Character } from '@/types/character';
import Image from 'next/image';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

export function CharacterCard({ character, onClick }: CharacterCardProps) {
  const statusColor = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  }[character.status];

  return (
    <div
      onClick={() => onClick(character)}
      className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 hover:border-green-500 transition-all duration-300 cursor-pointer group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="p-4">
        <div className="relative">
          <Image
            src={character.image}
            alt={character.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <div className="absolute top-2 right-2 bg-gray-900/80 px-2 py-1 rounded text-xs text-green-400 border border-green-500/50">
            ID: {character.id}
          </div>
        </div>
        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
          {character.name}
        </h2>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <span className="text-gray-400 w-24">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              character.status === 'Alive' ? 'bg-green-500/20 text-green-400' :
              character.status === 'Dead' ? 'bg-red-500/20 text-red-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {character.status}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-400 w-24">Espécie:</span>
            <span className="text-white">{character.species}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-400 w-24">Origem:</span>
            <span className="text-white truncate">{character.origin.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 
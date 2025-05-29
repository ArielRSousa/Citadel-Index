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
      className="card cursor-pointer transform hover:scale-105 transition-transform duration-300"
      onClick={() => onClick(character)}
    >
      <div className="relative h-48 w-full">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white truncate">
          {character.name}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <div className={`w-2 h-2 rounded-full ${statusColor}`} />
          <span className="text-sm text-gray-300">
            {character.status} - {character.species}
          </span>
        </div>
      </div>
    </div>
  );
} 
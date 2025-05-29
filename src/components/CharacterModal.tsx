import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Character } from '@/types/character';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CharacterModal({ character, isOpen, onClose }: CharacterModalProps) {
  if (!character) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } transition-opacity duration-300`}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative bg-gray-800/90 border border-gray-700 rounded-lg max-w-2xl w-full transform transition-all duration-300 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-white">
              {character?.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <Image
                src={character?.image || ''}
                alt={character?.name || ''}
                width={300}
                height={300}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute top-2 right-2 bg-gray-900/80 px-2 py-1 rounded text-xs text-green-400 border border-green-500/50">
                ID: {character?.id}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Informações do Registro</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-400 w-24">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      character?.status === 'Alive' ? 'bg-green-500/20 text-green-400' :
                      character?.status === 'Dead' ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {character?.status}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400 w-24">Espécie:</span>
                    <span className="text-white">{character?.species}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400 w-24">Gênero:</span>
                    <span className="text-white">{character?.gender}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Localização</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 block mb-1">Origem:</span>
                    <span className="text-white">{character?.origin.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-1">Localização Atual:</span>
                    <span className="text-white">{character?.location.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-800 p-6 shadow-xl transition-all border border-gray-700">
                <div className="absolute right-4 top-4">
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative h-64 w-64 flex-shrink-0">
                    <Image
                      src={character.image}
                      alt={character.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <Dialog.Title className="text-2xl font-bold text-white mb-4">
                      {character.name}
                    </Dialog.Title>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Status</h4>
                        <p className="mt-1 text-white">{character.status}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Espécie</h4>
                        <p className="mt-1 text-white">{character.species}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Gênero</h4>
                        <p className="mt-1 text-white">{character.gender}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Origem</h4>
                        <p className="mt-1 text-white">{character.origin.name}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Localização</h4>
                        <p className="mt-1 text-white">{character.location.name}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Episódios</h4>
                        <p className="mt-1 text-white">{character.episode.length} episódios</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 
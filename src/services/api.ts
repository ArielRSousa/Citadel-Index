import axios, { AxiosError } from 'axios';
import { CharacterResponse } from '@/types/character';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const getCharacters = async (page: number = 1, search?: string) => {
  try {
    const { data } = await api.get<CharacterResponse>('/character', {
      params: {
        page,
        name: search || undefined,
      },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
      }
      throw new Error('Erro ao buscar personagens. Por favor, tente novamente.');
    }
    throw error;
  }
};

export const getCharacterById = async (id: number) => {
  try {
    const { data } = await api.get(`/character/${id}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        throw new Error('Personagem não encontrado.');
      }
      throw new Error('Erro ao buscar detalhes do personagem. Por favor, tente novamente.');
    }
    throw error;
  }
}; 
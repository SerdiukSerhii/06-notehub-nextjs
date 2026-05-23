import axios from 'axios';
import type { Note, NewNoteBody } from '../types/note';

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = 'https://notehub-public.goit.study/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const PER_PAGE = 12;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (search: string, page: number): Promise<FetchNotesResponse> => {
  const res = await api.get<FetchNotesResponse>(`/notes`, {
    params: {
      search,
      page,
      perPage: PER_PAGE,
    },
  });

  return res.data;
};

export const createNote = async (newNote: NewNoteBody) => {
  const res = await api.post<Note>('/notes', newNote);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const res = await api.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${noteId}`);
  return res.data;
};

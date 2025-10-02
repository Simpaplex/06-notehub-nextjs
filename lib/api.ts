import axios from 'axios';
import type { CreateNoteRequest, Note } from '../types/note';

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesResponce {
  notes: Note[];
  totalPages: number;
}

async function fetchNotes(searchValue: string, currentPage: number) {
  const responce = await axios.get<FetchNotesResponce>("/notes", {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
    params: {
      search: searchValue,
      page: currentPage,
      perPage: 12,
    },
  });

  return responce.data;
}

async function createNote(formValue: CreateNoteRequest) {
  const responce = await axios.post<Note>("/notes", formValue, {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });

  return responce.data;
}

async function deleteNote(noteId: string) {
  const res = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });
  return res.data;
}

async function fetchNoteById(noteId: string) {
  const responce = await axios.get<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });

  return responce.data;
}

export { fetchNotes, createNote, deleteNote, fetchNoteById };

// import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import NoteListItem from '../NoteListItem/NoteListItem';
import styles from './NoteList.module.css';
import toast from 'react-hot-toast';
import { deleteNote } from '@/lib/api';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      toast.success('Note deleted');
      queryClient.invalidateQueries({ queryKey: ['notesList'] });
    },
    onError: error => {
      toast.error(`${error.message}`);
    },
  });

  function handleDelete(noteId: string) {
    mutation.mutate(noteId);
  }

  return (
    <ul className={styles.list}>
      {notes.map(item => (
        <NoteListItem note={item} key={item.id} onDelete={handleDelete} />
      ))}
    </ul>
  );
}

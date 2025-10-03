// import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import styles from './NoteList.module.css';
import toast from 'react-hot-toast';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';

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

  function handleDelete(noteId:string) {
    mutation.mutate(noteId);
  }

  return (
    <ul className={styles.list}>
      {notes.map(item => (
      <li key={item.id} className={styles.listItem}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.content}>{item.content}</p>
        <div className={styles.footer}>
        <span className={styles.tag}>{item.tag}</span>
        <Link href={`./notes/${item.id}`}>View details</Link>
        <button
          className={styles.button}
          onClick={() => handleDelete(item.id)}>
          Delete</button>
        </div>
      </li>
      ))}
    </ul>
  );
}
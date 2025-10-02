import Link from "next/link";
import type { Note } from "../../types/note";
import styles from './NoteListItem.module.css'

interface NoteListItemProps{
  note: Note;
  onDelete: (noteId:string) => void
}

export default function NoteListItem({ note, onDelete}: NoteListItemProps) {
  return (
    <li className={styles.listItem}>
      <h2 className={styles.title}>{note.title}</h2>
      <p className={styles.content}>{note.content}</p>
      <div className={styles.footer}>
        <span className={styles.tag}>{note.tag}</span>
        <Link href={`./notes/${note.id}`}>View details</Link>
        <button
          className={styles.button}
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
'use client'

import styles from './NoteDetails.module.css';
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>()
  
  const { data, isError, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    data && (
      <>
        <div className={styles.header}>
          <h2>{data?.title}</h2>
        </div>
        <p className={styles.content}>{data?.content}</p>
        <p className={styles.date}>Created date: {data?.createdAt}</p>
        {isError && <p>Something went wrong.</p>}
        {isLoading && <p>Loading note, please wait...</p>}
      </>
    )
  );
}
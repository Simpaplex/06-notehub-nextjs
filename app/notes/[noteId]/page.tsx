import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import styles from "./NoteDetails.module.css"

interface NoteDetailsProps{
  params: Promise<{ noteId: string }>
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { noteId } = await params;
  
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  }
  )
  
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NoteDetailsClient />
        </HydrationBoundary>
      </div>
    </div>
  );
  
}
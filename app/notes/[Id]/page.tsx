import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import styles from "./NoteDetails.module.css"

interface NoteDetailsProps{
  params: Promise<{ id: string }>
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
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
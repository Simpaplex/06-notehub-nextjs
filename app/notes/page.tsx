import styles from './NotesPage.module.css';
import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';

interface NotesProps{
  params: Promise<{searchValue: string, currentPage: number}>
}

export default async function Notes({params}: NotesProps) {
  const { searchValue, currentPage } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notesList', searchValue, currentPage],
    queryFn: () => fetchNotes(searchValue, currentPage),
    });


  return (
    <div className={styles.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
      </HydrationBoundary>
    </div>
  );
}


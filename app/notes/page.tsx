import styles from './NotesPage.module.css';
import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';


export default async function Notes() {
  const queryClient = new QueryClient();
  const searchValue: string = '';
  const currentPage: number = 1;
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


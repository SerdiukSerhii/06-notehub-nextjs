'use client';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import Modal from '@/components/Modal/Modal';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteForm from '@/components/NoteForm/NoteForm';
import { fetchNotes } from '@/lib/api';

import css from './NotesPage.module.css';

function NotesClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isFetching } = useQuery({
    queryKey: ['notes', { search: searchQuery, page: currentPage }],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  // ----------Оновлює пошук і скидає сторінку на першу----------
  const handleSearch = useDebouncedCallback((newSearchValue: string) => {
    setSearchQuery(newSearchValue);
    setCurrentPage(1);
  }, 1000);

  return (
    <section>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            inputValue={searchQuery}
            onChange={handleSearch}
          />

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className={css.button}
          >
            Create note +
          </button>
        </header>

        {isFetching && <p>Loading...</p>}

        {notes.length > 0 && <NoteList notes={notes} />}

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </div>
    </section>
  );
}

export default NotesClient;

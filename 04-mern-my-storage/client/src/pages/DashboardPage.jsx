import { useSelector } from 'react-redux';
/* =============================
📦 Custom Imports
============================= */
import { userSelector } from '@features/user/userSlice.js';
import { NoteForm, NoteList } from '@features/notes/components/index.js';
import { CategorySelect } from '@features/category/components/index.js';
import { categorySelector } from '@features/category/categorySlice.js';
import { BookForm, BookList } from '@features/books/components/index.js';
import { MovieForm, MovieList } from '@features/movies/components/index.js';
/* =============================
📦 Component - DashboardPage
============================= */
export default function DashboardPage() {
  /* =============================
   📦 Section - Hooks & Variables:
   ============================= */
  const { user } = useSelector(userSelector);
  const category = useSelector(categorySelector);
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <div className='grid gap-2 px-3 container mx-auto max-w-6xl sm:gap-4'>
    <h1 className='font-bold text-xl md:text-3xl text-center'>👋 {user.firstName}, Dashboard</h1>
    <CategorySelect />
    {category === 'notes' &&
      <>
        <NoteForm />
        <NoteList />
      </>
    }
    {category === 'books' &&
      <>
        <BookForm />
        <BookList />
      </>
    }
    {category === 'movies' &&
      <>
        <MovieForm />
        <MovieList />
      </>
    }
  </div>;
}

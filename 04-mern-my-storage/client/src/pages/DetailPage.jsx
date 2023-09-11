import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
/* =============================
📦 Custom Imports
============================= */
import { booksSelector, resetBooksState } from '@features/books/booksSlice.js';
import { API_BOOKS, API_MOVIES } from '@api/api.js';
import { moviesSelector, resetMoviesState } from '@features/movies/moviesSlice.js';
/* =============================
📦 Component - DetailPage
============================= */
export default function DetailPage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { entry: book, error: bookError, message: bookMessage } = useSelector(booksSelector);
  const { entry: movie, error: movieError, message: movieMessage } = useSelector(moviesSelector);
  const { state: { category } } = useLocation();
  let content = null;
  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (bookError || movieError) {
      toast.error(bookMessage || movieMessage);
    }
    if (category === 'books') {
      dispatch(API_BOOKS.GET_SINGLE(id))
        .then(() => dispatch(resetBooksState()));
    }
    if (category === 'movies') {
      dispatch(API_MOVIES.GET_SINGLE(id))
        .then(() => dispatch(resetMoviesState()));
    }
  }, [dispatch, id, category, bookError, bookMessage, movieError, movieMessage]);
  /* =============================
  📦 Section - Rendering:
  ============================= */
  if (category === 'movies' && movie) {
    content = <>
      <h1 className='font-bold text-lg xl:text-3xl'>{movie.name}</h1>
      <div className='grid gap-2 md:grid-cols-[250px_1fr] md:items-start md:gap-6'>
        <img className='max-w-[250px] md:max-w-full w-full'
             src={movie.poster ?? '/assets/images/placeholder.png'}
             alt={movie.name}
        />
        <div className='grid gap-2'>
          <p><span className='font-medium'>Year Of Production</span>:{' '}{movie.yearProduction}</p>
          <p><span className='font-medium'>Country</span>:{' '}{movie.country}</p>
          <p><span className='font-medium'>Slogan</span>:{' '}{movie.slogan}</p>
          <p><span className='font-medium'>Directed</span>:{' '}{movie.directed}</p>
          <p><span className='font-medium'>Time</span>:{' '}{movie.time}</p>
          <p>
            <span className='font-medium'>Genre</span>:{' '}
            {movie.genre.length !== 0 && movie.genre.map((m, idx) =>
              <span key={idx}>{m}{m !== movie.genre[movie.genre.length - 1] ? ', ' : ''}</span>,
            )}
          </p>
          <p>
            <span className='font-medium'>Date Of Viewing</span>:{' '}
            {new Date(movie.dateViewing).toISOString().substring(0, 10).toString()}
          </p>
          <p><span className='font-medium'>Status</span>:{' '} {movie.status}</p>
        </div>
      </div>
    </>;
  }
  if (category === 'books' && book) {
    content = <>
      <h1 className='font-bold text-lg xl:text-3xl'>
        {book.name}
      </h1>
      <div className='grid gap-2 md:grid-cols-[250px_1fr] md:items-start md:gap-6'>
        <img
          className='max-w-[250px] md:max-w-full w-full'
          src={book.poster ?? '/assets/images/placeholder.png'}
          alt={book.name}
        />
        <div className='grid gap-2'>
          <p><span className='font-medium'>Author</span>:{' '}{book.author}</p>
          <p><span className='font-medium'>Publisher</span>:{' '}{book.publisher}</p>
          <p><span className='font-medium'>Series</span>:{' '}{book.series ?? '-'}</p>
          <p><span className='font-medium'>Year Of Publication</span>:{' '}{book.yearPublication}</p>
          <p>
            <span className='font-medium'>Date Of Reading</span>:{' '}
            {new Date(book.dateReading).toISOString().substring(0, 10).toString()}
          </p>
          <p><span className='font-medium'>Status</span>:{' '} {book.status}</p>
          <p><span className='font-medium'>ISBN</span>:{' '} {book.isbn}</p>
          <p><span className='font-medium'>Number Of Pages</span>:{' '} {book.numberPages}</p>
          <p><a href={book.source} target='_blank' className='font-medium'>Book Source</a></p>
          <p><span className='font-medium'>Book Description</span>:{' '} {book.description}</p>
          {book.quotes.length !== 0 && <>
            <p><span className='font-medium'>Book Quotes</span>:</p>
            <ul>{book.quotes.map((quote, idx) => <li key={idx}>📋 {quote}</li>)}</ul>
          </>}
        </div>
      </div>
    </>;
  }
  return <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className='grid gap-2 max-w-4xl w-full mx-auto px-3'>
      <button className='btn btn-primary max-w-max' onClick={() => navigate(-1)}>Back</button>
      {content}
    </div>
  </motion.div>;
}

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ErrorMessage } from '@ui/index.js';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { RiImageAddFill } from 'react-icons/all.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
/* =============================
📦 Custom Imports
============================= */
import { booksSelector, resetBooksState } from '@features/books/booksSlice.js';
import { moviesSelector, resetMoviesState } from '@features/movies/moviesSlice.js';
import { API_BOOKS, API_MOVIES } from '@api/api.js';
import FormGroup from '@ui/form/FormGroup.jsx';
import { defaultValues, validateSchema } from '@/utils/validateSchema.js';
import convertBase64 from '@/utils/convertBase64.js';
/* =============================
📦 Component - EditPage
============================= */
export default function EditPage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  let content = null;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { entry: book, error: bookError, message: bookMessage } = useSelector(booksSelector);
  const { entry: movie, error: movieError, message: movieMessage } = useSelector(moviesSelector);
  const { state: { category } } = useLocation();
  const { register, handleSubmit, formState: { errors, isValid, dirtyFields }, reset, setValue } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(category === 'books' ? validateSchema.book : validateSchema.movie)),
    defaultValues: category === 'books' ? defaultValues.book : defaultValues.movie,
  });
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

  useEffect(() => {
    if (category === 'books' && book) {
      setValue('description', book.description);
      setValue('name', book.name);
      setValue('author', book.author);
      setValue('publisher', book.publisher);
      setValue('series', book.series);
      setValue('yearPublication', book.yearPublication);
      book.dateReading && setValue('dateReading', new Date(book.dateReading).toISOString().substring(0, 10));
      setValue('status', book.status);
      setValue('isbn', book.isbn);
      setValue('numberPages', book.numberPages);
      setValue('source', book.source);
      setValue('quotes', book.quotes.join(', '));
    }
    if (category === 'movies' && movie) {
      setValue('name', movie.name);
      setValue('yearProduction', movie.yearProduction);
      setValue('country', movie.country);
      setValue('genre', movie.genre.join(', '));
      setValue('slogan', movie.slogan);
      setValue('directed', movie.directed);
      setValue('time', movie.time);
      setValue('review', movie.review);
      movie.dateViewing && setValue('dateViewing', new Date(movie.dateViewing).toISOString().substring(0, 10));
      setValue('status', movie.status);
    }
  }, [id, dispatch, category, movie, book]);

  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = async (formData) => {
    if (category === 'movies') {
      const genre = formData.genre.split(',');
      dispatch(API_MOVIES.UPDATE({
        id: movie._id, data: {
          ...formData,
          poster: formData.poster ? await convertBase64(formData.poster[0]) : movie.poster,
          genre,
        },
      }))
        .then(() => {
          dispatch(resetMoviesState());
          navigate(-1);
        });
    }
    if (category === 'books') {
      const quotes = formData.quotes.split(',');
      dispatch(API_BOOKS.UPDATE({
        id: book._id, data: {
          ...formData,
          poster: formData.poster ? await convertBase64(formData.poster[0]) : book.poster,
          quotes,
        },
      }))
        .then(() => {
          dispatch(resetBooksState());
          navigate(-1);
        });
    }
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  if (category === 'movies' && movie) {
    content = <>
      <h1 className='font-bold text-lg xl:text-3xl'>Update: {movie.name}</h1>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup type='text' name='name' label='Name' placeholder='Enter Movie Name' register={register}
                   errors={errors} dirtyFields={dirtyFields} />
        <FormGroup type='number' name='yearProduction' label='Year Of Publication'
                   placeholder='Enter Movie Publication Year' register={register} />
        <FormGroup type='text' name='country' label='Country' placeholder='Enter Country' register={register} />
        <FormGroup type='text' name='genre' label='Genre' placeholder='For example: thriller, drama'
                   register={register} />
        <FormGroup type='text' name='slogan' label='Slogan' placeholder='Enter Movie Slogan' register={register} />
        <FormGroup type='text' name='directed' label='Directed' placeholder='Enter Movie Directed'
                   register={register} />
        <FormGroup type='text' name='time' label='Time' placeholder='Enter Movie Time' register={register} />
        <FormGroup type='date' name='dateViewing' label='Date Of Viewing' register={register} />
        <label className='form-group'>
          <span className='form-label'>Select Status</span>
          <select className='input' name='status'{...register('status')}>
            <option>Select status</option>
            {['No started', 'Completed', 'In Progress'].map(option =>
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.substring(1)}
              </option>,
            )}
          </select>
        </label>
        <FormGroup type='textarea' name='review' label='Review' placeholder='Enter Your Review' register={register} />
        <label className='form-group'>
          <span className='form-label'>Movie Poster</span>
          <input multiple={false} type='file' name='poster' className='hidden' {...register('poster')} />
          <RiImageAddFill size={70} />
        </label>
        <button disabled={!isValid} className='btn btn-primary'>Update Movie</button>
        {Object.keys(errors).length !== 0 && (
          <div className='border-2 rounded border-red-600 p-2 bg-red-50 max-w-max'>
            <ErrorMessage errors={errors} field={'name'} />
            <ErrorMessage errors={errors} field={'author'} />
            <ErrorMessage errors={errors} field={'description'} />
          </div>
        )}
      </form>
    </>;
  }
  if (category === 'books' && book) {
    content = <>
      <h1 className='font-bold text-lg xl:text-3xl'>Update: {book.name}</h1>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup type='text' name='name' label='Name' placeholder='Enter Book Name' register={register}
                   errors={errors} dirtyFields={dirtyFields} />
        <FormGroup type='text' name='author' label='Author' placeholder='Enter Book Author' register={register}
                   errors={errors} dirtyFields={dirtyFields} />
        <FormGroup type='text' name='publisher' label='Publisher' placeholder='Enter Book Publisher'
                   register={register} />
        <FormGroup type='text' name='series' label='Series' placeholder='Enter Book Series' register={register} />
        <FormGroup type='number' name='yearPublication' label='Year Of Publication'
                   placeholder='Enter Book Publication Year' register={register} />
        <FormGroup type='date' name='dateReading' label='Date Of Reading' register={register} />
        <label className='form-group'>
          <span className='form-label'>Select Status</span>
          <select className='input' name='status'{...register('status')}>
            <option>Select status</option>
            {['No started', 'Completed', 'In Progress'].map(option =>
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.substring(1)}
              </option>,
            )}
          </select>
        </label>
        <FormGroup type='text' name='isbn' label='ISBN' placeholder='Enter Book ISBN' register={register} />
        <FormGroup type='number' name='numberPages' label='Enter Number Of Pages' placeholder='ISBN'
                   register={register} />
        <FormGroup type='text' name='source' label='Source' placeholder='Enter Book Source' register={register} />
        <FormGroup type='textarea' label='Description' name='description' placeholder='Enter Book Description'
                   register={register} errors={errors} dirtyFields={dirtyFields} />
        <FormGroup type='textarea' label='Quotes' name='quotes' placeholder='Enter Book Quotes' register={register} />
        <label className='form-group'>
          <span className='form-label'>Book Poster</span>
          <input multiple={false} type='file' name='poster' className='hidden' {...register('poster')} />
          <RiImageAddFill size={70} />
        </label>
        <button disabled={!isValid} className='btn btn-primary'>Update Book</button>
        {Object.keys(errors).length !== 0 && (
          <div className='border-2 rounded border-red-600 p-2 bg-red-50 max-w-max'>
            <ErrorMessage errors={errors} field={'name'} />
            <ErrorMessage errors={errors} field={'author'} />
            <ErrorMessage errors={errors} field={'description'} />
          </div>
        )}
      </form>
    </>;
  }
  return <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className='grid gap-2 px-3 container mx-auto max-w-6xl sm:gap-4'>
      <button className='btn btn-primary max-w-max' onClick={() => navigate(-1)}>Back</button>
      {content}
    </div>
  </motion.div>;
}

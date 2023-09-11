import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { BiDislike, BiLike, FiX } from 'react-icons/all.js';

/* =============================
📦 Custom Imports
============================= */
import { postsSelector, resetPostsState } from '../features/posts/postsSlice.js';
import { API } from '../api/api.js';
import { schema } from '../utils/validateSchema.js';
import { authSelector } from '../features/auth/authSlice.js';
import { FormGroup } from '../components/ui/index.js';

/* =============================
📦 Component - PostsPage
============================= */
export default function PostsPage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { entries, error, message } = useSelector(postsSelector.all);
  const { user } = useSelector(authSelector.all);
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object({
      text: schema.required,
    })),
    defaultValues: {
      text: '',
    },
  });

  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
    }
    dispatch(API.posts.getAll()).then(() => dispatch(resetPostsState()));
  }, [dispatch, error, message]);

  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = (data) => {
    dispatch(API.posts.create(data));
    toast.success('🎊 New post created!');
    reset();
  };

  const onDelete = (id) => {
    dispatch(API.posts.delete(id));
    toast.success('Post deleted!');
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <div className='container px-3 py-14 max-w-4xl mx-auto flex flex-col items-start gap-4'>
      {/* Go Back */}
      <button className='button button-secondary' onClick={() => navigate(-1)}>
        Go Back
      </button>
      {/* Title */}
      <h1 className='font-bold text-lg xl:text-3xl'>Posts</h1>
      <p>👋 Welcome to the community!</p>
      {/* Form */}
      <form className='form flex flex-col items-start' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          type='textarea'
          name='text'
          label='Create a new post'
          placeholder='Create a new post'
          register={register}
          errors={errors}
        />
        <button disabled={!isValid} type='submit' className='button button-secondary'>Submit</button>
      </form>
      {/* Posts */}
      {entries.length !== 0
        ? <ul className='grid gap-4 w-full'>
          {entries.map(post =>
            <li className='bg-white p-3 shadow border rounded-md md:grid md:grid-cols-[auto_1fr] md:gap-5 md:p-5'
                key={post._id}>
              {/* Image */}
              <div className='grid gap-2 place-items-center md:pr-10'>
                <img className='rounded-full w-[100px]' src={post.avatar} alt={post.name} />
                <h3>{post.name}</h3>
              </div>
              {/* Content */}
              <div className='grid gap-2.5 place-items-center md:place-items-start'>
                <p>{post.text}</p>
                <p className='text-gray-600 text-sm'>Posted
                  on {new Date(post.date).toLocaleDateString().split(',')[0]}</p>
                <div className='flex flex-wrap gap-1.5'>
                  <button className='button button-default p-1 px-2' onClick={() => dispatch(API.posts.like(post._id))}>
                    <BiLike className='flex-shrink-0' size={20} />
                    {post.likes.length > 0 && post.likes.length}
                  </button>
                  <button className='button button-default p-1 px-2'
                          onClick={() => dispatch(API.posts.dislike(post._id))}>
                    <BiDislike size={20} />
                  </button>
                  <Link className='button button-secondary' to={`/post/${post._id}`}>
                    Discussion {post.comments.length !== 0 &&
                    <span className='bg-white rounded text-neutral-700 px-2 py-0.5'>{post.comments.length}</span>}
                  </Link>
                  {post.user === user._id &&
                    <button className='button p-1 px-2 bg-red-400 text-white' onClick={() => onDelete(post._id)}>
                      <FiX size={20} />
                    </button>}
                </div>
              </div>
            </li>,
          )}
        </ul>
        : <p>No posts yet</p>
      }
    </div>
  );
}

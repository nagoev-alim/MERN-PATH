import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { FiX } from 'react-icons/all.js';
import { useParams } from 'react-router-dom';
/* =============================
📦 Custom Imports
============================= */
import { postsSelector, resetPostsState } from '../features/posts/postsSlice.js';
import { API } from '../api/api.js';
import { FormGroup } from '../components/ui/index.js';
import { useForm } from 'react-hook-form';
import { schema } from '../utils/validateSchema.js';
import { authSelector } from '../features/auth/authSlice.js';

/* =============================
📦 Component - PostPage
============================= */
export default function PostPage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const { id } = useParams();
  const { entry: post, error, message } = useSelector(postsSelector.all);
  const { user } = useSelector(authSelector.all);
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object({ text: schema.required })),
    defaultValues: { text: '' },
  });

  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
    }

    dispatch(API.posts.getById(id)).then(() => dispatch(resetPostsState()));
  }, [dispatch, error, message]);
  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = ({ text }) => {
    dispatch(API.posts.addComment({ id, text }));
    reset();
  };

  const onDelete = (commentId) => {
    dispatch(API.posts.deleteComment({
      postId: id,
      commentId,
    }));
    toast.success('Comment deleted!');
  };

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    post && <div className='container px-3 py-14 max-w-4xl mx-auto flex flex-col items-start gap-4'>
      {/* */}
      <div className='bg-white p-3 w-full shadow border rounded-md md:grid md:grid-cols-[auto_1fr] md:gap-5 md:p-5'>
        <div className='grid gap-2 place-items-center md:pr-10 md:items-start'>
          <img className='rounded-full w-[100px]' src={post.avatar} alt={post.name} />
          <h3>{post.name}</h3>
        </div>
        <div className='grid gap-2.5 place-items-center md:place-items-start'>
          <p>{post.text}</p>
        </div>
      </div>
      {/*  */}
      <h3 className='text-xl font-medium'>Leave A Comment</h3>
      <form className='form flex flex-col items-start' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          type='textarea'
          name='text'
          placeholder='Comment on this post'
          register={register}
          errors={errors}
        />
        <button disabled={!isValid} type='submit' className='button button-secondary'>Submit</button>
      </form>
      {/*  */}
      {post.comments.length !== 0
        ? <div className='grid gap-4 w-full'>
          {post.comments.map(comment => (
            <div key={comment._id}
                 className='bg-white p-3 shadow border rounded-md md:grid md:grid-cols-[auto_1fr] md:gap-5 md:p-5 md:items-start'>
              <div className='grid gap-2 place-items-center md:pr-10'>
                <img className='rounded-full w-[100px]' src={post.avatar} alt={post.name} />
                <h3>{comment.name}</h3>
              </div>
              <div className='grid gap-2.5 place-items-center md:place-items-start'>
                <p>{comment.text}</p>
                <p className='text-gray-600 text-sm'>Posted
                  on {new Date(comment.date).toLocaleDateString().split(',')[0]}</p>
                {comment.user === user._id &&
                  <button className='button p-1 px-2 bg-red-400 text-white' onClick={() => onDelete(comment._id)}>
                    <FiX size={20} />
                  </button>
                }
              </div>
            </div>
          ))}
        </div>
        : <p>Post have not any comments</p>
      }
    </div>
  );
}

import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* =============================
📦 Custom Imports
============================= */
import FormGroup from '@ui/form/FormGroup.jsx';
import { ErrorMessage } from '@ui/index.js';
import { API_TODO } from '@api/api.js';
import { defaultValues, validateSchema } from '@/utils/validateSchema.js';
import { resetTodoState } from '@features/todo/todoSlice.js';
/* =============================
📦 Component - UrlForm
============================= */
export default function TodoForm({ home }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid, dirtyFields }, setValue, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(validateSchema.todo)),
    defaultValues: defaultValues.todo,
  });
  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = (data) => {
    dispatch(API_TODO.CREATE(data))
      .then(() => {
        dispatch(resetTodoState());
        reset();
      });
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <FormGroup
        type='text'
        name='title'
        placeholder='For example, buy concert tickets'
        register={register}
        errors={errors}
        dirtyFields={dirtyFields}
      />
      <button disabled={!isValid} className='btn btn-primary'>Add Todo</button>
      {Object.keys(errors).length !== 0 && (
        <div className='border-2 rounded border-red-600 p-2 bg-red-50 max-w-max'>
          <ErrorMessage errors={errors} field={'Title'} />
        </div>
      )}
    </form>
  );
}

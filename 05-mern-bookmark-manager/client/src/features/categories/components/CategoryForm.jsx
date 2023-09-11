import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* =============================
📦 Custom Imports
============================= */
import FormGroup from '@ui/form/FormGroup.jsx';
import { ErrorMessage } from '@ui/index.js';
import { API_CATEGORIES } from '@api/api.js';
import { defaultValues, validateSchema } from '@/utils/validateSchema.js';
import { resetCategoriesState } from '@features/categories/categoriesSlice.js';
/* =============================
📦 Component - CategoryForm
============================= */
export default function CategoryForm({ toggleModalWindow }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid, dirtyFields }, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(validateSchema.category)),
    defaultValues: defaultValues.category,
  });
  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = async (data) => {
    dispatch(API_CATEGORIES.CREATE(data))
      .then(() => {
        dispatch(resetCategoriesState());
        toggleModalWindow(reset);
      });
  };
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <form className='form' onSubmit={handleSubmit(onSubmit)}>
    <h1 className='form-title'>Add Category</h1>
    <FormGroup
      type='text'
      name='title'
      placeholder='Category'
      register={register}
      errors={errors}
      dirtyFields={dirtyFields}
    />
    <button disabled={!isValid} className='btn btn-primary hover:scale-100'>Create</button>
    {Object.keys(errors).length !== 0 && (
      <div className='border-2 rounded border-red-600 p-2 bg-red-50'>
        <ErrorMessage errors={errors} field={'title'} />
      </div>
    )}
  </form>;
}

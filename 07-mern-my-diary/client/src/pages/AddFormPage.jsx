// 🔳 Imports:
// 🔳 Custom Imports:
import { DiaryAddForm } from '@features/diary/components/index.js';

// 🟥 Component: SignPage
const AddFormPage = () => {
  // 🟪 Rendering:
  return (
    <div className='grid min-h-full place-items-center p-3'>
      <div className='max-w-2xl w-full'>
        <DiaryAddForm/>
      </div>
    </div>
  );
};

export default AddFormPage;

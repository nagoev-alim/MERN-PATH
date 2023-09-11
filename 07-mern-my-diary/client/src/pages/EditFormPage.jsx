// 🔳 Imports:
// 🔳 Custom Imports:
import { DiaryEditForm } from '@features/diary/components/index.js';

// 🟥 Component: SignPage
const EditFormPage = () => {
  // 🟪 Rendering:
  return (
    <div className='grid min-h-full place-items-center p-3'>
      <div className='max-w-2xl w-full'>
        <DiaryEditForm/>
      </div>
    </div>
  );
};

export default EditFormPage;

import { useSelector } from 'react-redux';
/* =============================
📦 Custom Imports
============================= */
import { userSelector } from '@features/user/userSlice.js';
import { TodoFilter, TodoForm, TodoList } from '@features/todo/components/index.js';
/* =============================
📦 Component - DashboardPage
============================= */
export default function DashboardPage() {
  /* =============================
   📦 Section - Hooks & Variables:
   ============================= */
  const { user } = useSelector(userSelector);
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <div className='grid gap-2 px-3 container mx-auto max-w-2xl sm:gap-4'>
    <h1 className='font-bold text-xl md:text-3xl text-center'>👋 {user.name} Dashboard</h1>
    <TodoForm />
    <TodoFilter />
    <TodoList />
  </div>;
}

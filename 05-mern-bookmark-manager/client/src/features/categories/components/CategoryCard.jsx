import { Link } from 'react-router-dom';
import { CgFolder } from 'react-icons/all.js';
/* =============================
📦 Component - CategoryCard
============================= */
export default function CategoryCard({ item }) {
  return <div className='grid gap-3'>
    <Link to={`/category/${item._id}`} className='card flex items-center bg-neutral-100 border-neutral-300'>
      <CgFolder size={25} />
      {item.title}
    </Link>
  </div>;
}

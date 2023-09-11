import { AnimatePresence, motion } from 'framer-motion';
/* =============================
📦 Custom Imports
============================= */
import { UrlCard } from '@features/url/components/index.js';
/* =============================
📦 Component - UrlList
============================= */
export default function UrlList({ items, home }) {
  let content = null;
  if (home) {
    content = items.length !== 0 && (
      <AnimatePresence>
        <div className='grid gap-3'>
          {items.map(entry =>
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              layout
            >
              <UrlCard key={entry._id} item={entry} home={home} />
            </motion.div>,
          )}
        </div>
      </AnimatePresence>
    );
  } else {
    content = items.length !== 0 ?
      (<AnimatePresence>
        <div className='grid gap-3'>
          {items.map(entry =>
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              layout
            >
              <UrlCard key={entry._id} item={entry} home={home} />
            </motion.div>,
          )}
        </div>
      </AnimatePresence>)
      : <p className='font-medium text-center'>You have not any saved links.</p>;
  }

  return content;
}

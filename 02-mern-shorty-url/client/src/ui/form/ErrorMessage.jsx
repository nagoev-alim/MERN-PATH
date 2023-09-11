/* =============================
📦 Component - ErrorMessages
============================= */
export default function ErrorMessage({ errors, field }) {
  return errors?.[field]
    ? <div
      className='error-message'
      dangerouslySetInnerHTML={{ __html: errors?.[field]?.message }}
    />
    : null;
}

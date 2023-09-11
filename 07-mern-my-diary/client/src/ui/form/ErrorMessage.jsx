// 🟥 Component: ErrorMessage
const ErrorMessage = ({ errors, field }) => {
  // 🟨 Variables & Hooks:
  let content = null;

  // 🟪 Rendering:
  if (errors?.[field]) {
    content = <div className='error-message' dangerouslySetInnerHTML={{ __html: errors?.[field]?.message }} />;
  }
  return content;
};

export default ErrorMessage;

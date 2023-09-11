/* =============================
📦 Component - Input
============================= */
export default function Input({ children, register, type, options, name, ...rest }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  let input;

  switch (type) {
    case 'textarea': {
      input = register ? <textarea {...rest} {...register(name)} /> : <textarea {...rest} />;
      break;
    }
    case 'checkbox': {
      input = register ? <input type={type} {...rest} {...register(name)} /> : <input {...rest} />;
      break;
    }
    case 'select': {
      input = register ? <select {...rest} {...register(name)}>
        <option value=''>Select Professional Status</option>
        {options.map(option => <option key={option}>{option}</option>)}
      </select> : <select {...rest}></select>;
      break;
    }
    default: {
      input = register ? <input type={type} name={name} {...rest} {...register(name)} /> :
        <input type={type} name={name} {...rest} />;
      break;
    }
  }
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <>
      {children}
      {input}
    </>
  );
}

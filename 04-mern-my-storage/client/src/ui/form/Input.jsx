/* =============================
📦 Component - Input
============================= */
export default function Input({ children, register, type, options, name,onChange, ...rest }) {
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
        <option value=''>Select option</option>
        {options.map(option => <option key={option}>{option}</option>)}
      </select> :
        <select {...rest}>
          <option value=''>Select option</option>
          {options.map(option => <option key={option}>{option.charAt(0).toUpperCase() + option.substring(1)}</option>)}
        </select>;
      break;
    }
    default: {
      input = register ? <input type={type} name={name} {...rest} {...register(name)} /> :
        <input type={type} name={name} {...rest} />;
      break;
    }
  }
  return <>
    {children}
    {input}
  </>
}

// 🔳 Custom Imports:
import capitalStr from '@/utils/capitalStr.js';

// 🟥 Component: Input
const Input = ({ children, register, type, options, name, onChange, ...rest }) => {
  // 🟨 Variables & Hooks:
  let input;

  // 🟪 Rendering:
  switch (type) {
    case 'textarea': {
      input = register
        ? (<textarea {...rest} {...register(name)} />)
        : (<textarea {...rest} />);
      break;
    }
    case 'checkbox': {
      input = register
        ? (<input type={type} {...rest} {...register(name)} />)
        : (<input {...rest} />);
      break;
    }
    case 'select': {
      input = register
        ? (
          <select {...rest} {...register(name)}>
            <option value=''>Select option</option>
            {options.map(option => <option key={option}>{option}</option>)}
          </select>
        )
        : (
          <select {...rest}>
            <option value=''>Select option</option>
            {options.map(option => <option key={option}>{capitalStr(option)}</option>)}
          </select>
        );
      break;
    }
    default: {
      input = register
        ? (<input type={type} name={name} {...rest} {...register(name)} />)
        : (<input type={type} name={name} {...rest} />);
      break;
    }
  }

  return <>
    {children}
    {input}
  </>;
};

export default Input;

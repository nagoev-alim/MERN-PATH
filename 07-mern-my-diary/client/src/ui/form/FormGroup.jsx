// 🔳 Custom Imports:
import { Input } from '@ui/index.js';

// 🟥 Component: FormGroup
const FormGroup = ({ className, placeholder, dirtyFields, register, type, label, name, errors, options }) => {
  // 🟨 Variables & Hooks:
  let content = null;

  // 🟪 Rendering:
  if (dirtyFields) {
    content = <Input
      className={`input ${errors[name] && 'border-red-500'} ${dirtyFields[name] && !errors[name] && 'border-green-500'} ${className || ''}`}
      type={type}
      name={name}
      placeholder={placeholder}
      register={register}
      options={options}
    >
      {label && <span className='form-label'>{label}</span>}
    </Input>;
  } else if (errors) {
    content = <Input
      className={`input ${errors[name] && 'border-red-500'} ${className || ''}`}
      type={type}
      name={name}
      placeholder={placeholder}
      register={register}
      options={options}
    >
      {label && <span className='form-label'>{label}</span>}
    </Input>;
  } else {
    content = <Input
      className={`input ${className || ''}`}
      type={type}
      name={name}
      placeholder={placeholder}
      register={register}
      options={options}
    >
      {label && <span className='form-label'>{label}</span>}
    </Input>;
  }

  return <label className='form-group'>{content}</label>;
};

export default FormGroup;

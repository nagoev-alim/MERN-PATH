/* =============================
📦 Custom Imports
============================= */
import { ErrorMessage, Input } from './index.js';

/* =============================
📦 Component - FormGroup
============================= */
export default function FormGroup({ className, type, placeholder, label, name, register, errors, options }) {
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <label className='form-group'>
      <Input
        className={`input ${className || ''}`}
        type={type}
        name={name}
        placeholder={placeholder}
        register={register}
        options={options}
      >
        {label && <span className='form-group-label form-label'>{label}</span>}
      </Input>
      <ErrorMessage errors={errors} field={name} />
    </label>
  );
}

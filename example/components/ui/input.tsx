import { FC } from 'react';


export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Input: FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        fontSize: '1.5rem',
        padding: '5px 8px',
        borderRadius: '0.5rem',
        outline: 'none',
        marginRight: '10px',
        borderStyle: 'solid',
        borderWidth: '2px',
      }}
    />
  );
};

import { CSSProperties, FC, PropsWithChildren } from 'react';


export interface ButtonProps extends PropsWithChildren {
  onClick: () => void;
}

const style: CSSProperties = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#fff',
  color: '#000',
  cursor: 'pointer',
};


export const Button: FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick} style={style}>
      {children}
    </button>
  );
};

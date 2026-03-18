import { CSSProperties, FC, PropsWithChildren } from 'react';


const style: CSSProperties = {
  fontSize: '20px',
  margin: 0,
};

export const Text: FC<PropsWithChildren> = ({ children }) => {
  return (
    <p style={style}>
      {children}
    </p>
  );
};

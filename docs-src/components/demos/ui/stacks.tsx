import { CSSProperties, FC, PropsWithChildren } from 'react';


const hStyle: CSSProperties = {
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
};

export const HStack: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div style={hStyle}>
      {children}
    </div>
  );
};


const vStyle: CSSProperties = {
  display: 'flex',
  gap: '20px',
};

export const VStack: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div style={vStyle}>
      {children}
    </div>
  );
};

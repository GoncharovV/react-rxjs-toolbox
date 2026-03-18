import { FC, PropsWithChildren } from 'react';


export interface FrameProps extends PropsWithChildren {
}

export const Frame: FC<FrameProps> = ({ children }) => {
  return (
    <div style={{ border: '1px dashed #ccc', padding: '15px', borderRadius: '8px' }}>
      {children}
    </div>
  );
};

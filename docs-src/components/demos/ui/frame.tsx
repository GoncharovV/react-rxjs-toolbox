import { CSSProperties, FC, PropsWithChildren } from 'react';


const style: CSSProperties = {
  border: '1px dashed var(--ifm-color-emphasis-400)',
  padding: '20px',
  borderRadius: '8px',
  marginTop: '12px',
  marginBottom: '12px',
};

export const Frame: FC<PropsWithChildren> = ({ children }) => (
  <div style={style}>{children}</div>
);

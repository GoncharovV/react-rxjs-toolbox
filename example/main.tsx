import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ObservableTicker } from './components/observable-ticker';

import '@goncharovv/layout/dist/styles/index.css';
import './index.css';


const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <ObservableTicker />
  </StrictMode>,
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { VStack } from '@goncharovv/layout';

import { ObservableSearch } from './components/observable-search';
import { ObservableTicker } from './components/observable-ticker';

import '@goncharovv/layout/dist/styles/index.css';
import './index.css';


const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <VStack spacing="medium-m" align="center">
      <ObservableTicker />

      <ObservableSearch />
    </VStack>
  </StrictMode>,
);

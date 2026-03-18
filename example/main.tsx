import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { VStack } from '@goncharovv/layout';

import { DistinctObservable } from './components/distinct-observable';
import { TodosWidget } from './components/global-observable-state';
import { ObservableSearch } from './components/observable-search';
import { ObservableSubject } from './components/observable-subject';
import { ObservableTicker } from './components/observable-ticker';

import '@goncharovv/layout/dist/styles/index.css';
import './index.css';


const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <VStack spacing="medium-m" align="center">
      <DistinctObservable />
      <ObservableTicker />

      <ObservableSearch />

      <TodosWidget />

      <ObservableSubject />
    </VStack>
  </StrictMode>,
);

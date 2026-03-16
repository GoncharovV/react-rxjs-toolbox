import { FC } from 'react';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { VStack } from '@goncharovv/layout';

import { useDistinctDerivedValue, useObservable, useObservableState } from '../../dist/index.mjs';


const TODOS = [
  { id: 1, title: 'Buy groceries' },
  { id: 2, title: 'Buy a new phone' },
  { id: 3, title: 'Buy a new car' },
  { id: 4, title: 'Develop a new app' },
  { id: 5, title: 'Buy a new boat' },
  { id: 6, title: 'Buy a new plane' },
  { id: 7, title: 'Build a react-rxjs-toolbox' },
  { id: 8, title: 'Buy a new bike' },
  { id: 9, title: 'Buy a new horse' },
  { id: 10, title: 'Write react DI library' },
];

function getTodos(search: string) {
  return of(TODOS.filter((todo) => todo.title.includes(search)));
}

const search$ = new BehaviorSubject<string>('');

const filteredTodos$ = search$.pipe(
  switchMap((search) => getTodos(search)),
);

export const TodosWidget = () => {
  return (
    <VStack spacing="medium-s" align="center">
      <TodoSearch />

      <TodosCount />

      <TodoList />
    </VStack>
  );
};

const TodoSearch: FC = () => {
  const [search, setSearch] = useObservableState(search$);

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search"
    />
  );
};

const TodoList: FC = () => {
  const todos = useObservable(filteredTodos$, []);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

const TodosCount: FC = () => {
  const count = useDistinctDerivedValue(filteredTodos$, (todos) => todos.length);

  return <p>Count: {count}</p>;
};

import { useObservable, useObservableState } from 'react-rxjs-toolbox';
import { BehaviorSubject, of, switchMap } from 'rxjs';

import { DemoFrame } from './DemoFrame';
import { Input, Text, VStack } from './ui';


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

export const UseObservableStateDemo = () => {
  return (
    <DemoFrame>
      <VStack>
        <SearchInput />

        <TodoList />
      </VStack>
    </DemoFrame>
  );
};

const SearchInput = () => {
  const [search, setSearch] = useObservableState(search$);

  return <Input value={search} onChange={setSearch} placeholder="Search todo..." />;
};

const TodoList = () => {
  const todos = useObservable(filteredTodos$, []);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Text>{todo.title}</Text>
        </li>
      ))}
    </ul>
  );
};

import { v4 as uuidv4 } from "uuid";

import { TodoAction, TodoActionTypes, TodoState } from "../../types";

export const initialState: TodoState = {
  todos: [
    {
      id: "5a2a4bc8-3764-4896-ac87-26e812aef677",
      title: "Тестовое задание",
      done: false,
      createdAt: new Date(),
    },
    {
      id: "99390b3c-c898-4381-aa57-1a687a8c34d4",
      title: "Прекрасный код",
      done: true,
      createdAt: new Date(),
    },
    {
      id: "2177e82c-2d83-446e-b069-429a20412764",
      title: "Покрытие тестами",
      done: false,
      createdAt: new Date(),
    },
  ],
};

export const todoReducer = (
  state: TodoState = initialState,
  action: TodoAction
) => {
  switch (action.type) {
    case TodoActionTypes.CREATE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: uuidv4(),
            title: action.payload.title,
            createdAt: new Date(),
            done: false,
          },
        ],
      };
    case TodoActionTypes.DONE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, done: !todo.done } : todo
        ),
      };
    }
    case TodoActionTypes.DELETE_TODOS:
      return { ...state, todos: state.todos.filter(({ done }) => !done) };
    default:
      return state;
  }
};

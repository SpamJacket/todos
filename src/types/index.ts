export interface Todo {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date;
}

export interface TodoState {
  todos: Todo[];
}

export enum TodoActionTypes {
  CREATE_TODO = "CREATE_TODO",
  DONE_TODO = "DONE_TODO",
  DELETE_TODOS = "DELETE_TODOS",
}

export interface CreateTodoAction {
  type: TodoActionTypes.CREATE_TODO;
  payload: {
    title: string;
  };
}

export interface DoneTodoAction {
  type: TodoActionTypes.DONE_TODO;
  payload: {
    id: string;
  };
}

export interface DeleteTodosAction {
  type: TodoActionTypes.DELETE_TODOS;
}

export type TodoAction = CreateTodoAction | DoneTodoAction | DeleteTodosAction;

export interface Store {
  todoStore: TodoState;
}

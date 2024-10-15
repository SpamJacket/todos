import { CreateTodoAction, DoneTodoAction, TodoActionTypes } from "../../types";

export const createTodo = (payload: CreateTodoAction["payload"]) => ({
  type: TodoActionTypes.CREATE_TODO,
  payload,
});

export const doneTodo = (payload: DoneTodoAction["payload"]) => ({
  type: TodoActionTypes.DONE_TODO,
  payload,
});

export const deleteTodos = () => ({
  type: TodoActionTypes.DELETE_TODOS,
});

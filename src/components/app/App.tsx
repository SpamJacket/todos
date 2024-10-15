import { useSelector } from "react-redux";

import styles from "./App.module.css";

import { TodoList } from "../todoList/TodoList";

import { Store } from "../../types";

export const App = () => {
  const { todos } = useSelector((store: Store) => store.todoStore);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>todos</h1>
      <section className={styles.section}>
        <TodoList todos={todos} />
        <div className={styles.sectionFooter} />
        <div className={styles.sectionFooter} />
      </section>
    </main>
  );
};

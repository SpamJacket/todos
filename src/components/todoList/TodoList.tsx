import {
  useMemo,
  useState,
  KeyboardEvent,
  ChangeEvent,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { Button, Collapse, IconButton, List, Typography } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import styles from "./TodoList.module.css";

import { Tabs } from "../tabs/Tabs";
import { TodoItem } from "../todoItem/TodoItem";

import { Todo } from "../../types";
import { createTodo, deleteTodos } from "../../store/actions";

interface TodoListProps {
  todos: Todo[];
}

export const TodoList = ({ todos }: TodoListProps) => {
  const dispatch = useDispatch();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [newTodoValue, setNewTodoValue] = useState("");
  const [tabValue, setTabValue] = useState("All");

  const handleArrowClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNewTodoValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoValue(e.target.value);
  };

  const handleTabChange = (newTabValue: string) => {
    setTabValue(newTabValue);
  };

  const handleEnterPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTodoValue.trim()) {
      dispatch(createTodo({ title: newTodoValue }));
      setNewTodoValue("");
    }
  };

  const handleCompletedDelete = () => {
    dispatch(deleteTodos());
  };

  const sortedTodos = useMemo(() => {
    return todos.sort(
      ({ createdAt: createdAtA }, { createdAt: createdAtB }) => {
        return createdAtB.getTime() - createdAtA.getTime();
      }
    );
  }, [todos]);

  const filteredTodos = useMemo(() => {
    switch (tabValue) {
      case "All":
        return sortedTodos;
      case "Active":
        return sortedTodos.filter(({ done }) => !done);
      case "Completed":
        return sortedTodos.filter(({ done }) => done);
      default:
        return sortedTodos;
    }
  }, [sortedTodos, tabValue]);

  const activeCounter = useMemo(() => {
    return todos.reduce((count, todo) => {
      return !todo.done ? count + 1 : count;
    }, 0);
  }, [todos]);

  const iconSizes = useMemo(
    () =>
      screenWidth > 650
        ? { width: 30, height: 30 }
        : screenWidth > 375
        ? { width: 24, height: 24 }
        : { width: 20, height: 20 },
    [screenWidth]
  );

  const footerTextSize = useMemo(
    () =>
      screenWidth > 650
        ? { fontSize: 16 }
        : screenWidth > 375
        ? { fontSize: 14 }
        : { fontSize: 12 },
    [screenWidth]
  );

  return (
    <>
      <div className={styles.header}>
        <IconButton size="small" onClick={handleArrowClick}>
          <KeyboardArrowDownOutlinedIcon sx={iconSizes} />
        </IconButton>
        <input
          className={styles.input}
          value={newTodoValue}
          onChange={handleNewTodoValueChange}
          onKeyDown={handleEnterPressed}
          placeholder="What needs to be done?"
        />
      </div>
      <Collapse
        in={isCollapsed}
        timeout="auto"
        unmountOnExit
        sx={{ width: "100%" }}
      >
        <List sx={{ padding: 0 }}>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </List>
      </Collapse>
      <div className={styles.footer}>
        <Typography
          variant="body1"
          sx={{ color: "#848484", ...footerTextSize }}
          className={styles.counter}
        >{`${activeCounter} items left`}</Typography>
        <Tabs
          value={tabValue}
          onValueChange={handleTabChange}
          availableTabs={["All", "Active", "Completed"]}
          extraClass={styles.tabs}
        />
        <Button
          sx={{
            color: "#848484",
            padding: 0,
            textTransform: "none",
            ...footerTextSize,
          }}
          onClick={handleCompletedDelete}
          className={styles.clearButton}
        >
          Clear completed
        </Button>
      </div>
    </>
  );
};

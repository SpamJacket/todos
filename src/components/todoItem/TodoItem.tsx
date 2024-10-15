import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { ListItem, ListItemIcon, Typography } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

import { Todo } from "../../types";

import { doneTodo } from "../../store/actions";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useDispatch();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTodoDone = () => {
    dispatch(doneTodo({ id: todo.id }));
  };

  const iconSizes = useMemo(
    () =>
      screenWidth > 650
        ? { width: 30, height: 30 }
        : screenWidth > 375
        ? { width: 24, height: 24 }
        : { width: 20, height: 20 },
    [screenWidth]
  );

  return (
    <ListItem sx={{ padding: "20px 10px", borderBottom: "1px solid #dfdfdf" }}>
      <ListItemIcon
        sx={{
          minWidth: "unset",
          cursor: "pointer",
          marginRight: screenWidth > 650 ? 3 : screenWidth > 375 ? 2 : 1,
        }}
        onClick={handleTodoDone}
      >
        {todo.done ? (
          <CheckCircleOutlineOutlinedIcon
            sx={{ ...iconSizes, color: "#7ac1b1" }}
          />
        ) : (
          <CircleOutlinedIcon sx={{ ...iconSizes, color: "#dfdfdf" }} />
        )}
      </ListItemIcon>
      <Typography
        variant="body1"
        sx={{
          fontSize: screenWidth > 650 ? 22 : screenWidth > 375 ? 20 : 18,
          color: "#525252",
          wordBreak: "break-word",
          ...(todo.done
            ? { textDecoration: "line-through", opacity: 0.3 }
            : {}),
        }}
      >
        {todo.title}
      </Typography>
    </ListItem>
  );
};

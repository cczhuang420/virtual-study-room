import { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [hideCompleted, setHideCompleted] = useState(false);

  useEffect(() => {
    // TODO: fetch tasks from server

    setTasks([
      { id: 1, name: "Task 1", completed: false },
      { id: 2, name: "Task 2", completed: false },
      { id: 3, name: "Task 3", completed: false },
      { id: 4, name: "Task 4", completed: false },
      { id: 5, name: "Task 5", completed: false },
    ]);

    setCompletedTasks([
      { id: 6, name: "Task 6", completed: true },
      { id: 7, name: "Task 7", completed: true },
      { id: 8, name: "Task 8", completed: true },
      { id: 9, name: "Task 9", completed: true },
      { id: 10, name: "Task 10", completed: true },
    ]);
  }, []);

  const handleHideCompleted = () => {
    setHideCompleted(!hideCompleted);
  };

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + completedTasks.length + 1,
      name: "New Task",
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleTaskComplete = (id) => {
    let newUpdatedTasks = [...tasks];
    let newUpdatedCompletedTasks = [...completedTasks];

    const taskIndex = newUpdatedTasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      newUpdatedTasks[taskIndex].completed =
        !newUpdatedTasks[taskIndex].completed;
      newUpdatedCompletedTasks.push(newUpdatedTasks[taskIndex]);
      newUpdatedTasks.splice(taskIndex, 1);
    } else {
      const completedTaskIndex = newUpdatedCompletedTasks.findIndex(
        (task) => task.id === id
      );
      newUpdatedCompletedTasks[completedTaskIndex].completed =
        !newUpdatedCompletedTasks[completedTaskIndex].completed;
      newUpdatedTasks.push(newUpdatedCompletedTasks[completedTaskIndex]);
      newUpdatedCompletedTasks.splice(completedTaskIndex, 1);
    }

    setTasks(newUpdatedTasks);
    setCompletedTasks(newUpdatedCompletedTasks);

    // TODO: send updated tasks to server
  };

  return (
    <Box
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "10px",
        padding: "2vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "black",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: '10px'
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "rgba(0,0,0,0)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255,255,255,.4)",
        }
      }}
    >
      {/* title */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h3">My Tasks</Typography>
        <Button
          variant="outlined"
          sx={{ color: "black", borderColor: "black" }}
          onClick={handleHideCompleted}
        >
          hide completed
        </Button>
      </Box>
      <Divider sx={{ my: 2, borderBottomWidth: 3, bgcolor: "black" }} />
      {/* tasks to do */}
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Checkbox
              checked={task.completed}
              onChange={() => handleTaskComplete(task.id)}
            />
            <ListItemText primary={task.name} />
          </ListItem>
        ))}
      </List>

      {/* complete tasks */}
      {!hideCompleted && (
        <>
          {tasks.length > 0 && completedTasks.length > 0 && (
            <Divider sx={{ my: 1, borderBottomWidth: 3 }} />
          )}
          <List>
            {completedTasks.map((task) => (
              <ListItem key={task.id}>
                <Checkbox
                  color="secondary"
                  checked={task.completed}
                  onChange={() => handleTaskComplete(task.id)}
                />
                <ListItemText
                  primary={
                    <Typography
                      color="secondary"
                      variant="body1"
                      style={{ textDecoration: "line-through" }}
                    >
                      {task.name}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          variant="text"
          sx={{ color: "black", borderColor: "black" }}
          onClick={handleAddTask}
          startIcon={<AddIcon />}
        >
          Add Task
        </Button>
      </Box>
    </Box>
  );
}

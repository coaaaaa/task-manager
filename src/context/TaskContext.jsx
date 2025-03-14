import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      return [];
    }
  });

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const debounce = useCallback((func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }, []);

  useEffect(() => {
    const saveTasks = debounce(() => {
      if (tasks && Array.isArray(tasks)) {
        try {
          localStorage.setItem("tasks", JSON.stringify(tasks));
        } catch (error) {
          console.error("Error saving tasks to localStorage:", error);
        }
      }
    }, 500);

    saveTasks();
  }, [tasks, debounce]);

  const addTask = useCallback((text) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), text, completed: false },
    ]);
  }, []);

  const removeTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const toggleTaskCompletion = useCallback((id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const editTask = useCallback((id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      return (
        (filter === "all" ||
          (filter === "completed" && task.completed) ||
          (filter === "incomplete" && !task.completed)) &&
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [tasks, filter, searchTerm]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        removeTask,
        toggleTaskCompletion,
        editTask,
        filter,
        setFilter,
        searchTerm,
        setSearchTerm,
        filteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { TaskContext };

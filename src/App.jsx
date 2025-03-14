import { useMemo } from "react";
import { TaskProvider } from "./context/TaskContext";
import FilterTasks from "./components/FilterTasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Switch from "react-switch";
import "./App.css";
import { useDarkMode } from "./hooks/useDarkMode";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  const darkModeToggle = useMemo(
    () => (
      <Switch
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        onColor="#444"
        offColor="#ddd"
        onHandleColor="#fff"
        offHandleColor="#fff"
        checkedIcon={false}
        uncheckedIcon={false}
        height={24}
        width={50}
        handleDiameter={20}
      />
    ),
    [darkMode]
  );

  return (
    <TaskProvider>
      <div className="app-container">
        <div className="theme-toggle-container">{darkModeToggle}</div>

        <div className="task-header">
          <h1 className="app-title">Task Manager</h1>
          <TaskForm />
          <FilterTasks />
        </div>

        <div className="task-list-wrapper">
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;

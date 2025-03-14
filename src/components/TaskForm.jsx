import React, { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { motion } from "framer-motion";
import "./TaskForm.css";

function TaskForm() {
  const [task, setTask] = useState("");
  const { tasks, addTask } = useTasks();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    const isDuplicate = tasks.some(
      (t) => t.text.toLowerCase() === task.toLowerCase()
    );
    if (isDuplicate) {
      alert("This task already exists!");
      return;
    }

    setIsLoading(true);
    addTask(task);
    setTask("");
    setIsLoading(false);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteText = e.clipboardData.getData("text").slice(0, 14);
    setTask(pasteText);
  };

  return (
    <motion.form
      className="task-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="text"
        value={task}
        onChange={(e) => {
          if (e.target.value.length <= 14) {
            setTask(e.target.value);
          }
        }}
        onPaste={handlePaste}
        placeholder="Enter a new task..."
        maxLength={14}
        className="task-input"
        disabled={isLoading}
      />
      <motion.button
        type="submit"
        className="add-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Task"}
      </motion.button>
    </motion.form>
  );
}

export default TaskForm;

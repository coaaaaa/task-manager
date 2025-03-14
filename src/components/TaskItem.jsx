import { useState, memo } from "react";
import { useTasks } from "../hooks/useTasks";
import PropTypes from "prop-types";
import {
  AiOutlineBars,
  AiOutlineCheck,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { motion } from "framer-motion";

const TaskItem = memo(({ task }) => {
  const { removeTask, toggleTaskCompletion, editTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    if (newText.trim()) {
      editTask(task.id, newText);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      removeTask(task.id);
    }
  };

  const truncateText = (text, maxLength = 30) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  return (
    <motion.li
      className={`task-item ${task.completed ? "completed" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <span className="task-drag-handle">
        <AiOutlineBars />
      </span>

      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
          className="edit-input"
        />
      ) : (
        <span className="task-text" title={task.text}>
          {truncateText(task.text)}
        </span>
      )}

      <div className="task-buttons">
        <button
          className="complete-btn"
          onClick={() => toggleTaskCompletion(task.id)}
        >
          <AiOutlineCheck />
        </button>
        <button className="edit-btn" onClick={handleEdit}>
          <AiOutlineEdit />
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          <AiOutlineDelete />
        </button>
      </div>
    </motion.li>
  );
});

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TaskItem;

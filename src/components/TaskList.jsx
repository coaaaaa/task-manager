import { useTasks } from "../hooks/useTasks";
import { motion } from "framer-motion";
import TaskItem from "./TaskItem";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./TaskList.css";

function TaskList() {
  const { tasks, filter, searchTerm, setTasks } = useTasks();

  const filteredTasks = tasks.filter((task) => {
    return (
      (filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "incomplete" && !task.completed)) &&
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const originalTasks = [...tasks];
    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    try {
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
      setTasks(originalTasks);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <motion.div
        className="task-list-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredTasks.length === 0 ? (
          <p className="empty-message">No tasks available. Add one above!</p>
        ) : (
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul
                className="task-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {filteredTasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="task-item-wrapper"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <TaskItem task={task} />
                      </motion.div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        )}
      </motion.div>
    </DragDropContext>
  );
}

export default TaskList;

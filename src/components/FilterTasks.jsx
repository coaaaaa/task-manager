import { useTasks } from "../hooks/useTasks";
import { motion } from "framer-motion";
import "./FilterTasks.css";

function FilterTasks() {
  const { filter, setFilter, searchTerm, setSearchTerm } = useTasks();

  return (
    <div className="filter-buttons">
      <input
        type="text"
        placeholder="&#x1F50D; Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={filter === "completed" ? "active" : ""}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
      <button
        className={filter === "incomplete" ? "active" : ""}
        onClick={() => setFilter("incomplete")}
      >
        Incomplete
      </button>
    </div>
  );
}

export default FilterTasks;

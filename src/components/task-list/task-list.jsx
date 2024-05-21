import PropTypes from "prop-types";
import Task from "../task/task";

import "../task-list/task-list.css";

// Компонент для отображения списка задач
export default function TaskList({
  tasks,
  filter,
  onTaskCompletionToggle,
  onDeleted,
  onEdit,
}) {
  // Фильтрация задач в соответствии с текущим фильтром
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    else if (filter === "Active") return !task.completed;
    else if (filter === "Completed") return task.completed;

    return true;
  });

  return (
    <ul className="todo-list">
      {/* Отображение каждой задачи из отфильтрованного списка */}
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onTaskCompletionToggle={onTaskCompletionToggle}
          onDeleted={() => onDeleted(task.id)}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

// Значения по умолчанию для свойства tasks компонента TaskList
TaskList.defaultProps = {
  tasks: [],
};

// Определение типов ожидаемых свойств для TaskList
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string.isRequired,
  onTaskCompletionToggle: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

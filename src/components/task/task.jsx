import React from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";

import "../task/task.css";

const Task = ({ task, onTaskCompletionToggle, onDeleted, onEdit }) => {
  // Обработчик переключения состояния задачи (выполнена/не выполнена)
  const handleCheckboxChange = () => {
    const completed = !task.completed;
    onTaskCompletionToggle(task.id, completed);
  };

  // Обработчик нажатия на кнопку редактирования
  const handleEditClick = () => {
    onEdit(task.id, true);
  };

  // Обработчик изменения описания задачи
  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    onEdit(task.id, true, newDescription);
  };

  // Обработчик нажатия клавиши Enter при редактировании
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Завершения редактирования
      onEdit(task.id, false);
    }
  };

  const timeDistance = formatDistanceToNow(task.created, {
    addSuffix: true,
    includeSeconds: true,
  });

  return (
    // Отображение задачи в соответствии с ее состоянием
    <li
      className={task.completed ? "completed" : task.editing ? "editing" : ""}
    >
      {/* Отображение информации о задаче */}
      <div className="view">
        {/* Отметка выполнения задачи */}
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={handleCheckboxChange}
        />
        <label>
          <span className="description">{task.description}</span>
          <span className="created">создана {timeDistance}</span>
        </label>
        {/* Кнопки для редактирования и удаления задачи */}
        <button className="icon icon-edit" onClick={handleEditClick}></button>
        <button
          className="icon icon-destroy"
          onClick={() => onDeleted(task.id)}
        ></button>
      </div>
      {/* Поле для редактирования описания задачи */}
      {task.editing && (
        <input
          type="text"
          className="edit"
          defaultValue={task.description}
          onChange={handleDescriptionChange}
          onKeyDown={handleKeyDown}
        />
      )}
    </li>
  );
};

// Определение типов ожидаемых свойств для Task
Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    completed: PropTypes.bool,
    description: PropTypes.string,
    created: PropTypes.instanceOf(Date),
    editing: PropTypes.bool,
  }),
  onTaskCompletionToggle: PropTypes.func,
  onEdit: PropTypes.func,
  onDeleted: PropTypes.func,
};

export default Task;

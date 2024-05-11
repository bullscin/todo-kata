import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';
import './task-list.css';

export default function TaskList({
  tasks,
  filter,
  currentTime,
  onTaskCompletionToggle,
  onDeleted,
  onEdit,
  startTimer,
  stopTimer,
}) {
  // Фильтрация задач в соответствии с текущим фильтром
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;

    return true;
  });

  return (
    <ul className="todo-list">
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          currentTime={currentTime}
          onTaskCompletionToggle={onTaskCompletionToggle}
          onDeleted={onDeleted}
          onEdit={onEdit}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']).isRequired,
  currentTime: PropTypes.objectOf(PropTypes.number).isRequired,
  onTaskCompletionToggle: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
};

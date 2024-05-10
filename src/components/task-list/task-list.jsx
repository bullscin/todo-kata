import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';
import TaskTimer from '../Task-timer/TaskTimer';

import './task-list.css';

class TaskList extends Component {
  constructor(props) {
    super(props);
    // Инициализация состояния компонента
    this.state = {
      runningTasks: [], // Список задач, для которых запущен таймер
    };

    // Привязка методов класса к текущему экземпляру
    this.toggleRunningTask = this.toggleRunningTask.bind(this);
  }

  // Метод для переключения состояния isRunning задачи с указанным id
  toggleRunningTask(taskId) {
    this.setState((prevState) => ({
      runningTasks: prevState.runningTasks.includes(taskId)
        ? prevState.runningTasks.filter((id) => id !== taskId)
        : [...prevState.runningTasks, taskId],
    }));
  }

  render() {
    const {
      tasks,
      filter,
      startTimer,
      stopTimer,
      currentTime,
      onTaskCompletionToggle,
      onDeleted,
      onEdit,
    } = this.props;
    const { runningTasks } = this.state;

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
          <React.Fragment key={task.id}>
            {/* Отображение задачи */}
            <Task
              task={task}
              onTaskCompletionToggle={onTaskCompletionToggle}
              onDeleted={onDeleted}
              onEdit={onEdit}
            />
            {/* Отображение таймера для задачи */}
            <TaskTimer
              taskId={task.id}
              currentTimeId={currentTime[task.id] || 0}
              isRunning={runningTasks.includes(task.id)}
              startTimer={startTimer}
              stopTimer={stopTimer}
              toggleRunningTask={this.toggleRunningTask}
            />
          </React.Fragment>
        ))}
      </ul>
    );
  }
}

// Определение типов ожидаемых свойств для TaskList
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']).isRequired,

  onTaskCompletionToggle: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  currentTime: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default TaskList;

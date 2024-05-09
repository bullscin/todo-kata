import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import TaskTimer from '../Task-timer/TaskTimer'; // Подключаем компонент TaskTimer
import './task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);

    // Привязываем обработчики событий
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditSave = this.handleEditSave.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleCheckboxChange() {
    const { onTaskCompletionToggle, task } = this.props;
    const completed = !task.completed;
    onTaskCompletionToggle(task.id, completed);
  }

  handleEditClick() {
    const { onEdit, task } = this.props;
    onEdit(task.id, true);
  }

  handleEditSave(event) {
    const { task, onEdit } = this.props;
    const { value } = event.target;
    onEdit(task.id, false, value.trim());
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.handleEditSave(event);
    }
  }

  handleDeleteClick() {
    const { onDeleted, task } = this.props;
    onDeleted(task.id);
  }

  render() {
    const { task, startTimer, stopTimer, currentTime } = this.props;

    const timeDistance = formatDistanceToNow(task.created, {
      addSuffix: true,
      includeSeconds: true,
    });

    let className = '';
    if (task.completed) {
      className = 'completed';
    } else if (task.editing) {
      className = 'editing';
    }

    return (
      <li className={className}>
        <div className="view">
          <input
            id={`checkbox-${task.id}`}
            className="toggle"
            type="checkbox"
            checked={task.completed}
            onChange={this.handleCheckboxChange}
          />

          <label htmlFor={`checkbox-${task.id}`}>
            <span className="description">{task.description}</span>
            <span className="created">создана {timeDistance}</span>

            <button
              id={`edit-checkbox-${task.id}`}
              onClick={this.handleEditClick}
              type="button"
              className="icon icon-edit"
            >
              {' '}
            </button>
            <button
              id={`destroy-checkbox-${task.id}`}
              onClick={this.handleDeleteClick}
              type="button"
              className="icon icon-destroy"
            >
              {' '}
            </button>
          </label>
        </div>
        {task.editing ? (
          <input
            type="text"
            className="edit"
            defaultValue={task.description}
            onBlur={this.handleEditSave}
            onKeyDown={this.handleKeyDown}
          />
        ) : null}

        <TaskTimer
          taskId={task.id}
          key={`timer-${task.id}`}
          startTimer={startTimer}
          stopTimer={stopTimer}
          currentTimeId={currentTime[task.id] || 0}
        />
      </li>
    );
  }
}

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
  stopTimer: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  currentTime: PropTypes.objectOf(PropTypes.number).isRequired,
};

Task.defaultProps = {
  task: {
    id: 0,
    completed: false,
    description: '',
    created: Date.now(),
    editing: false,
  },
  onTaskCompletionToggle: () => {},
  onDeleted: () => {},
  onEdit: () => {},
};

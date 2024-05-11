import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import TaskTimer from '../Task-timer/TaskTimer'; // Импортируем TaskTimer
import './task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);

    // Привязка методов класса к текущему экземпляру
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditSave = this.handleEditSave.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  // Обработчик изменения состояния выполнения задачи
  handleCheckboxChange() {
    const { onTaskCompletionToggle, task } = this.props;
    const completed = !task.completed;
    onTaskCompletionToggle(task.id, completed);
  }

  // Обработчик клика по кнопке редактирования задачи
  handleEditClick() {
    const { onEdit, task } = this.props;
    onEdit(task.id, true);
  }

  // Обработчик сохранения отредактированной задачи
  handleEditSave(event) {
    const { task, onEdit } = this.props;
    const { value } = event.target;
    onEdit(task.id, false, value.trim());
  }

  // Обработчик нажатия клавиши Enter при редактировании задачи
  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.handleEditSave(event);
    }
  }

  // Обработчик клика по кнопке удаления задачи
  handleDeleteClick() {
    const { onDeleted, task } = this.props;
    onDeleted(task.id);
  }

  render() {
    const { task, currentTime, startTimer, stopTimer } = this.props;

    // Определение временной дистанции от создания задачи
    const timeDistance = formatDistanceToNow(task.created, {
      addSuffix: true,
      includeSeconds: true,
    });

    let className = '';
    // Определение класса для стилизации задачи в зависимости от ее состояния
    if (task.completed) {
      className = 'completed';
    } else if (task.editing) {
      className = 'editing';
    }

    return (
      <li className={className}>
        <div className="view">
          {/* Флажок для отметки выполнения задачи */}
          <input
            id={`checkbox-${task.id}`}
            className="toggle"
            type="checkbox"
            checked={task.completed}
            onChange={this.handleCheckboxChange}
          />

          <label htmlFor={`checkbox-${task.id}`}>
            {/* Описание задачи */}
            <span className="description">{task.description}</span>
            {/* Время создания задачи */}
            <span className="created">создана {timeDistance}</span>

            {/* Кнопка редактирования задачи */}
            <button
              id={`edit-checkbox-${task.id}`}
              onClick={this.handleEditClick}
              type="button"
              className="icon icon-edit"
            >
              {' '}
            </button>
            {/* Кнопка удаления задачи */}
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
        {/* Поле для редактирования задачи */}
        {task.editing ? (
          <input
            type="text"
            className="edit"
            defaultValue={task.description}
            onBlur={this.handleEditSave}
            onKeyDown={this.handleKeyDown}
          />
        ) : null}

        {/* Отображение таймера для задачи */}
        <TaskTimer
          taskId={task.id}
          currentTimeId={currentTime[task.id] || 0}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
      </li>
    );
  }
}

// Определение типов ожидаемых свойств для компонента Task
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
  currentTime: PropTypes.objectOf(PropTypes.number).isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};

// Значения по умолчанию для свойств компонента Task
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

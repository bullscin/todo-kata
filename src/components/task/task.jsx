import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

// Default props для Task компонента
const defaultProps = {
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

// Компонент для отображения отдельной задачи
export default class Task extends Component {
  constructor(props) {
    super(props);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEditSave = this.handleEditSave.bind(this);
  }

  // Обработчик переключения состояния задачи (выполнена/не выполнена)
  handleCheckboxChange() {
    const { onTaskCompletionToggle, task } = this.props;
    const completed = !task.completed;
    onTaskCompletionToggle(task.id, completed);
  }

  // Обработчик нажатия на кнопку редактирования
  handleEditClick() {
    const { onEdit, task } = this.props;
    onEdit(task.id, true);
  }

  // Обработчик нажатия клавиши в поле редактирования
  handleKeyDown(event) {
    if (event.key === 'Enter') {
      const editedDescription = event.target.value.trim();
      this.handleEditSave(editedDescription);
    }
  }

  // Обработчик сохранения редактирования задачи
  handleEditSave(editedDescription) {
    const { task, onEdit } = this.props;
    onEdit(task.id, false, editedDescription);
  }

  render() {
    const { task, onDeleted } = this.props;
    const timeDistance = formatDistanceToNow(task.created, {
      addSuffix: true,
      includeSeconds: true,
    });

    // Отображение задачи в соответствии с ее состоянием
    let className = '';
    if (task.completed) {
      className = 'completed';
    } else if (task.editing) {
      className = 'editing';
    }

    return (
      <li className={className}>
        <div className="view">
          {/* Отметка выполнения задачи */}
          <input
            id={`checkbox-${task.id}`}
            className="toggle"
            type="checkbox"
            checked={task.completed}
            onChange={this.handleCheckboxChange}
          />
          {/* Отображение информации о задаче */}
          <label htmlFor={`checkbox-${task.id}`}>
            <span className="description">{task.description}</span>
            <span className="created">создана {timeDistance}</span>
            {/* Кнопки для редактирования и удаления задачи */}
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
              onClick={onDeleted}
              type="button"
              className="icon icon-destroy"
            >
              {' '}
            </button>
          </label>
        </div>
        {/* Поле для редактирования описания задачи */}
        {task.editing ? (
          <input
            type="text"
            className="edit"
            defaultValue={task.description}
            onBlur={this.handleEditSave} // Вызов метода сохранения при потере фокуса
            onKeyDown={this.handleKeyDown} // Обработка нажатия клавиши Enter
          />
        ) : null}
      </li>
    );
  }
}

// Устанавливаем значения по умолчанию для компонента Task
Task.defaultProps = defaultProps;

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

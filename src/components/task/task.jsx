import { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import '../task/task.css';

// Компонент для отображения отдельной задачи
export default class Task extends Component {
  // Default props для Task компонента
  static defaultProps = {
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

  // Обработчик переключения состояния задачи (выполнена/не выполнена)
  handleCheckboxChange = () => {
    const { onTaskCompletionToggle, task } = this.props;
    const completed = !task.completed;
    onTaskCompletionToggle(task.id, completed);
  };

  // Обработчик нажатия на кнопку редактирования
  handleEditClick = () => {
    const { onEdit, task } = this.props;
    onEdit(task.id, true);
  };

  // Обработчик изменения описания задачи
  handleDescriptionChange = (event) => {
    const { onEdit, task } = this.props;
    const newDescription = event.target.value;
    onEdit(task.id, true, newDescription);
  };

  // Обработчик нажатия клавиши Enter при редактировании
  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Завершения редактирования
      const { onEdit, task } = this.props;
      onEdit(task.id, false);
    }
  };

  render() {
    const { task, onDeleted } = this.props;
    const timeDistance = formatDistanceToNow(task.created, {
      addSuffix: true,
      includeSeconds: true,
    });

    return (
      // Отображение задачи в соответствии с ее состоянием
      <li
        className={task.completed ? 'completed' : task.editing ? 'editing' : ''}
      >
        {/* Отображение информации о задаче */}
        <div className='view'>
          {/* Отметка выполнения задачи */}
          <input
            className='toggle'
            type='checkbox'
            checked={task.completed}
            onChange={this.handleCheckboxChange}
          />
          <label>
            <span className='description'>{task.description}</span>
            <span className='created'>создана {timeDistance}</span>
          </label>
          {/* Кнопки для редактирования и удаления задачи */}
          <button
            className='icon icon-edit'
            onClick={this.handleEditClick}
          ></button>
          <button className='icon icon-destroy' onClick={onDeleted}></button>
        </div>
        {/* Поле для редактирования описания задачи */}
        {task.editing ? (
          <input
            type='text'
            className='edit'
            defaultValue={task.description}
            onChange={this.handleDescriptionChange} // Добавлен обработчик onChange
            onKeyDown={this.handleKeyDown}
          />
        ) : null}
      </li>
    );
  }
}

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

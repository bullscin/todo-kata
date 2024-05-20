import { Component } from 'react';
import PropTypes from 'prop-types';

import '../new-task-form/new-task-form.css';

// Компонент для добавления новой задачи
export default class NewTaskForm extends Component {
  state = {
    label: '', // Строка для ввода новой задачи
  };

  // Обработчик изменения ввода
  onChangeInput = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  // Обработчик нажатия клавиши
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const newTaskLabel = this.state.label.trim(); // Удаляем пробелы в начале и в конце строки
      if (newTaskLabel !== '') {
        // Проверяем, что строка не пустая
        this.props.onTaskAdded(newTaskLabel); // Вызываем метод родительского компонента для добавления новой задачи
        this.setState({ label: '' }); // Очищаем строку ввода
      }
    }
  };

  render() {
    return (
      <header className='header'>
        <h1>todos</h1>
        {/* Поле ввода для добавления новой задачи */}
        <input
          className='new-todo'
          placeholder='What needs to be done?'
          autoFocus // Фокус на поле ввода сразу после загрузки страницы
          value={this.state.label}
          onChange={this.onChangeInput}
          onKeyDown={this.handleKeyPress} // Обработка нажатия клавиши
        />
      </header>
    );
  }
}

// Определение типов ожидаемых свойств для NewTaskForm
NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func.isRequired, // Функция для добавления новой задачи
};

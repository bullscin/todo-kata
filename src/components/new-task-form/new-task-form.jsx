import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

// Компонент для добавления новой задачи
class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '', // Строка для ввода новой задачи
    };

    // Привязываем контекст к методам
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  // Обработчик нажатия клавиши
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      // Деструктурирование состояния
      const { label } = this.state;
      // Удаляем пробелы в начале и в конце строки
      const newTaskLabel = label.trim();
      // Проверяем, что строка не пустая
      if (newTaskLabel !== '') {
        // Деструктурирование свойства
        const { onTaskAdded } = this.props;
        // Вызываем метод родительского компонента для добавления новой задачи
        onTaskAdded(newTaskLabel);
        // Очищаем строку ввода
        this.setState({ label: '' });
      }
    }
  }

  // Обработчик изменения ввода
  onChangeInput(event) {
    const { value } = event.target;
    this.setState({
      label: value,
    });
  }

  render() {
    const { label } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        {/* Поле ввода для добавления новой задачи */}
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={label}
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

export default NewTaskForm;

import React, { useState } from "react";
import PropTypes from "prop-types";

import "../new-task-form/new-task-form.css";

// Компонент для добавления новой задачи
const NewTaskForm = ({ onTaskAdded }) => {
  const [label, setLabel] = useState(""); // Строка для ввода новой задачи

  // Обработчик изменения ввода
  const onChangeInput = (event) => {
    setLabel(event.target.value);
  };

  // Обработчик нажатия клавиши
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const newTaskLabel = label.trim(); // Удаляем пробелы в начале и в конце строки
      if (newTaskLabel !== "") {
        // Проверяем, что строка не пустая
        onTaskAdded(newTaskLabel); // Вызываем метод родительского компонента для добавления новой задачи
        setLabel(""); // Очищаем строку ввода
      }
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      {/* Поле ввода для добавления новой задачи */}
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus // Фокус на поле ввода сразу после загрузки страницы
        value={label}
        onChange={onChangeInput}
        onKeyDown={handleKeyPress} // Обработка нажатия клавиши
      />
    </header>
  );
};

// Определение типов ожидаемых свойств для NewTaskForm
NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func.isRequired, // Функция для добавления новой задачи
};

export default NewTaskForm;

import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter/tasks-filter';
import './footer.css';

// Компонент футера для отображения информации о задачах и фильтрации
export default function Footer({ count, filter, setFilter, clearCompletedTasks }) {
  return (
    <footer className="footer">
      {/* Отображение количества оставшихся невыполненных задач */}
      <span className="todo-count">
        {count}
        items left
      </span>
      {/* Компонент для выбора фильтра */}
      <TasksFilter filter={filter} setFilter={setFilter} />
      {/* Кнопка для удаления завершенных задач */}
      <button type="button" className="clear-completed" onClick={clearCompletedTasks}>
        Clear completed
      </button>
    </footer>
  );
}

// Определение типов ожидаемых свойств для Footer
Footer.propTypes = {
  count: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearCompletedTasks: PropTypes.func.isRequired,
};

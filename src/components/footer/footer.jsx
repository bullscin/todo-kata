import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter/tasks-filter';
import '../footer/footer.css';

// Компонент футера для отображения информации о задачах и фильтрации
export default function Footer({
  count, // Количество оставшихся невыполненных задач
  filter, // Текущий фильтр
  setFilter, // Метод для изменения фильтра
  clearCompletedTasks, // Метод для удаления завершенных задач
}) {
  return (
    <footer className='footer'>
      {/* Отображение количества оставшихся невыполненных задач */}
      <span className='todo-count'>{count} items left</span>
      {/* Компонент для выбора фильтра */}
      <TasksFilter filter={filter} setFilter={setFilter} />
      {/* Кнопка для удаления завершенных задач */}
      <button className='clear-completed' onClick={clearCompletedTasks}>
        Clear completed
      </button>
    </footer>
  );
}

// Определение типов ожидаемых свойств для Footer
Footer.propTypes = {
  count: PropTypes.number.isRequired, // Количество оставшихся невыполненных задач
  filter: PropTypes.string.isRequired, // Текущий фильтр
  setFilter: PropTypes.func.isRequired, // Метод для изменения фильтра
  clearCompletedTasks: PropTypes.func.isRequired, // Метод для удаления завершенных задач
};

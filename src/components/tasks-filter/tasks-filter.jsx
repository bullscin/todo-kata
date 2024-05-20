import '../tasks-filter/tasks-filter.css';
import PropTypes from 'prop-types';

export default function TasksFilter({ filter, setFilter }) {
  return (
    <ul className='filters'>
      {/* Фильтры задач */}
      <li>
        <button
          className={filter === 'All' ? 'selected' : ''}
          onClick={() => setFilter('All')}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={filter === 'Active' ? 'selected' : ''}
          onClick={() => setFilter('Active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={filter === 'Completed' ? 'selected' : ''}
          onClick={() => setFilter('Completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

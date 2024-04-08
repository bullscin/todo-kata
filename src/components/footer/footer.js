import TasksFilter from '../tasks-filter/tasks-filter';
import '../footer/footer.css';
export default function Footer({ count }) {
  return (
    <footer className='footer'>
      <span className='todo-count'>{count} items left</span>
      <TasksFilter />
      <button className='clear-completed'>Clear completed</button>
    </footer>
  );
}

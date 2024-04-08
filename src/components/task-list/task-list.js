import Task from '../task/task';
import '../task-list/task-list.css';

export default function TaskList({ tasks }) {
  return (
    <ul className='todo-list'>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );
}

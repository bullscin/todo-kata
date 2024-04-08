// import { formatDistanceToNow } from 'date-fns';
import '../task/task.css';

export default function Task({ task }) {
  // const createdAgo = formatDistanceToNow(new Date(task.created), {
  //   addSuffix: true,
  // });
  return (
    <li className={task.completed ? 'completed' : ''}>
      <div className='view'>
        <input className='toggle' type='checkbox' />
        <label>
          <span className='description'>{task.description}</span>
          <span className='created'>created {task.created}</span>
        </label>
        <button className='icon icon-edit'></button>
        <button className='icon icon-destroy'></button>
      </div>
      {task.editing ? (
        <input type='text' className='edit' value={task.description} />
      ) : null}
    </li>
  );
}

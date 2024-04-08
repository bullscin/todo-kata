import '../style/index.css';
import '../app/app.css';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

export default function App({ props }) {
  const tasks = [
    {
      id: 1,
      description: 'Completed task',
      completed: true,
      created: '17 seconds ago',
    },
    {
      id: 2,
      description: 'Editing task',
      completed: false,
      created: '5 minutes ago',
      editing: true,
    },
    {
      id: 3,
      description: 'Active task',
      completed: false,
      created: '5 minutes ago',
    },
  ];

  return (
    <section className='todoapp'>
      <NewTaskForm />
      <section className='main'>
        <TaskList tasks={tasks} />
        <Footer count={1} />
      </section>
    </section>
  );
}

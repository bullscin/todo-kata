import { Component } from 'react';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

import './TodoApp.css';
import '../style/common.css';

export default class TodoApp extends Component {
  maxId = 1; // Инициализация переменной для идентификации задач

  state = {
    tasks: [], // Начально пустой массив задач
    filter: 'All', // Начальный фильтр установлен на 'Все'
  };

  // Метод для создания новой задачи
  createTask(description) {
    return {
      id: this.maxId++, // Присваиваем уникальный идентификатор
      completed: false,
      description,
      created: new Date(),
      editing: false,
    };
  }
  // Метод для добавления новой задачи в состояние
  addTask = (text) => {
    const newTask = this.createTask(text); // Создаем новую задачу
    this.setState(({ tasks }) => ({
      tasks: [...tasks, newTask], // Добавляем новую задачу к списку задач
    }));
  };

  // Метод для удаления задачи из состояния
  deleteTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id), // Фильтруем задачи, исключая ту, которую нужно удалить
    }));
  };

  // Метод для изменения состояния редактирования задачи
  setEditing = (id, editing, newDescription = null) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              editing,
              description:
                newDescription !== null ? newDescription : task.description, // Обновляем описание задачи при необходимости
            }
          : task
      ),
    }));
  };

  // Метод для изменения состояния выполнения задачи
  handleTaskCompletionToggle = (id, completed) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map(
        (task) => (task.id === id ? { ...task, completed: completed } : task) // Обновляем состояние выполнения задачи
      ),
    }));
  };

  // Метод для изменения фильтра задач
  setFilter = (filter) => {
    this.setState({ filter }); // Обновляем значение фильтра
  };

  // Метод для удаления завершенных задач
  clearCompletedTasks = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => !task.completed), // Оставляем только незавершенные задачи
    }));
  };

  render() {
    const { tasks, filter } = this.state;
    const incompleteTasksCount = tasks.filter((task) => !task.completed).length; // Получаем количество незавершенных задач

    return (
      <section className='todoapp'>
        {/* Компонент для добавления новой задачи */}
        <NewTaskForm onTaskAdded={this.addTask} />
        <section className='main'>
          {/* Компонент для отображения списка задач */}
          <TaskList
            tasks={tasks}
            filter={filter}
            onTaskCompletionToggle={this.handleTaskCompletionToggle}
            onDeleted={this.deleteTask}
            onEdit={this.setEditing}
          />
          {/* Компонент для управления фильтром и удалением завершенных задач */}
          <Footer
            count={incompleteTasksCount}
            filter={filter}
            setFilter={this.setFilter}
            clearCompletedTasks={this.clearCompletedTasks}
          />
        </section>
      </section>
    );
  }
}

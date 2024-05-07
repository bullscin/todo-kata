import React, { Component } from 'react';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import './TodoApp.css';
import '../style/common.css';

export default class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filter: 'All',
    };
    this.maxId = 0;
    // Привязываем методы класса к текущему экземпляру
    this.handleTaskCompletionToggle = this.handleTaskCompletionToggle.bind(this);
    this.setEditing = this.setEditing.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.clearCompletedTasks = this.clearCompletedTasks.bind(this);
  }

  // Метод для изменения состояния выполнения задачи
  handleTaskCompletionToggle(id, completed) {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => (task.id === id ? { ...task, completed } : task)),
    }));
  }

  // Метод для изменения состояния редактирования задачи
  setEditing(id, editing, newDescription = null) {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => {
        // Обновляем описание задачи при необходимости
        if (task.id === id) {
          return {
            ...task,
            editing,
            description: newDescription !== null ? newDescription : task.description,
          };
        }
        return task;
      }),
    }));
  }

  // Метод для изменения фильтра задач
  setFilter(filter) {
    this.setState({ filter });
  }

  // Метод для удаления задачи из состояния
  deleteTask(id) {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }));
  }

  // Метод для добавления новой задачи в состояние
  addTask(text) {
    const newTask = this.createTask(text);
    this.maxId += 1;
    // Создаем новую задачу
    this.setState(({ tasks }) => ({
      // Добавляем новую задачу к списку задач
      tasks: [...tasks, newTask],
    }));
  }

  // Метод для удаления завершенных задач
  clearCompletedTasks() {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => !task.completed),
    }));
  }

  // Метод для создания новой задачи
  createTask(description) {
    return {
      id: this.maxId,
      completed: false,
      description,
      created: new Date(),
      editing: false,
    };
  }

  render() {
    const { tasks, filter } = this.state;
    const incompleteTasksCount = tasks.filter((task) => !task.completed).length;

    return (
      <section className="todoapp">
        <NewTaskForm onTaskAdded={this.addTask} />
        <section className="main">
          <TaskList
            tasks={tasks}
            filter={filter}
            onTaskCompletionToggle={this.handleTaskCompletionToggle}
            onDeleted={this.deleteTask}
            onEdit={this.setEditing}
          />
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

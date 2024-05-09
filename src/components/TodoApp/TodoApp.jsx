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
      taskTimers: {},
    };
    this.maxId = 0;
    // Привязываем методы класса к текущему экземпляру
    this.handleTaskCompletionToggle = this.handleTaskCompletionToggle.bind(this);
    this.setEditing = this.setEditing.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.clearCompletedTasks = this.clearCompletedTasks.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
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
    this.setState(({ tasks, taskTimers }) => ({
      // Добавляем новую задачу к списку задач
      tasks: [...tasks, newTask],
      // Создаем запись в taskTimers для новой задачи
      taskTimers: { ...taskTimers, [newTask.id]: 0 },
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

  startTimer(id) {
    this.setState(
      (prevState) => {
        const { taskTimers: prevTaskTimers } = prevState;
        const newTaskTimers = { ...prevTaskTimers };

        // Инициализируем таймер для новой задачи, если его нет
        if (!(id in newTaskTimers)) {
          newTaskTimers[id] = 0; // Инициализируем значение таймера

          // Обновляем состояние taskTimers
          return { taskTimers: newTaskTimers };
        }

        // Если таймер уже существует, возвращаем null
        return null;
      },
      () => {
        // Функция обратного вызова будет вызвана после обновления состояния
        // Здесь вы можете запустить таймер
        const timerId = setInterval(() => {
          this.setState((prevState) => ({
            taskTimers: {
              ...prevState.taskTimers,
              [id]: prevState.taskTimers[id] + 1, // Увеличиваем значение таймера на 1
            },
          }));
        }, 1000);

        // Сохраняем id таймера в состоянии для возможности его остановки
        this.setState((prevState) => ({
          taskTimers: {
            ...prevState.taskTimers,
            [`timer_${id}`]: timerId,
          },
        }));
      },
    );
  }

  stopTimer(id) {
    const { taskTimers } = this.state;
    clearInterval(taskTimers[`timer_${id}`]); // Останавливаем таймер
    const newTaskTimers = { ...taskTimers };

    this.setState({ taskTimers: newTaskTimers });
  }

  render() {
    const { tasks, filter, taskTimers } = this.state;
    const incompleteTasksCount = tasks.filter((task) => !task.completed).length;

    return (
      <section className="todoapp">
        <NewTaskForm onTaskAdded={this.addTask} />
        <section className="main">
          <TaskList
            tasks={tasks}
            currentTime={taskTimers} // Передача currentTime в TaskList
            filter={filter}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
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

import React, { Component } from 'react';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import './TodoApp.css';
import '../style/common.css';

export default class TodoApp extends Component {
  constructor(props) {
    super(props);
    // Инициализация состояния компонента
    this.state = {
      tasks: [], // Массив задач
      filter: 'All', // Фильтр для отображения задач
      taskTimers: {}, // Таймеры для каждой задачи
    };
    this.maxId = 0; // Максимальный id задачи
    // Привязка методов класса к текущему экземпляру
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
        // Обновление описания задачи при необходимости
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
    // Добавление новой задачи к списку задач
    this.setState(({ tasks, taskTimers }) => ({
      tasks: [...tasks, newTask],
      // Создание записи в taskTimers для новой задачи
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

  // Метод для запуска таймера для задачи
  startTimer(id) {
    this.setState(
      (prevState) => {
        const { taskTimers: prevTaskTimers } = prevState;
        const newTaskTimers = { ...prevTaskTimers };

        // Инициализация таймера для новой задачи, если его нет
        if (!(id in newTaskTimers)) {
          newTaskTimers[id] = 0; // Инициализация значения таймера
          // Обновление состояния taskTimers
          return { taskTimers: newTaskTimers };
        }

        // Если таймер уже существует, возвращаем null
        return null;
      },
      () => {
        // Функция обратного вызова будет вызвана после обновления состояния
        // Здесь можно запустить таймер
        const timerId = setInterval(() => {
          this.setState((prevState) => ({
            taskTimers: {
              ...prevState.taskTimers,
              [id]: prevState.taskTimers[id] + 1, // Увеличение значения таймера на 1
            },
          }));
        }, 1000);

        // Сохранение id таймера в состоянии для возможности его остановки
        this.setState((prevState) => ({
          taskTimers: {
            ...prevState.taskTimers,
            [`timer_${id}`]: timerId,
          },
        }));
      },
    );
  }

  // Метод для остановки таймера для задачи
  stopTimer(id) {
    const { taskTimers } = this.state;
    clearInterval(taskTimers[`timer_${id}`]); // Остановка таймера
    const newTaskTimers = { ...taskTimers };

    this.setState({ taskTimers: newTaskTimers });
  }

  render() {
    const { tasks, filter, taskTimers } = this.state;
    const incompleteTasksCount = tasks.filter((task) => !task.completed).length;

    return (
      <section className="todoapp">
        {/* Форма для добавления новой задачи */}
        <NewTaskForm onTaskAdded={this.addTask} />

        <section className="main">
          {/* Список задач */}
          <TaskList
            tasks={tasks}
            currentTime={taskTimers}
            filter={filter}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
            onTaskCompletionToggle={this.handleTaskCompletionToggle}
            onDeleted={this.deleteTask}
            onEdit={this.setEditing}
          />

          {/* Футер с информацией о задачах и фильтром */}
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

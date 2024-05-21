import React, { useState } from "react";

import NewTaskForm from "../new-task-form/new-task-form";
import TaskList from "../task-list/task-list";
import Footer from "../footer/footer";

import "./TodoApp.css";
import "../style/common.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]); // Начально пустой массив задач
  const [filter, setFilter] = useState("All"); // Начальный фильтр установлен на 'Все'
  let maxId = 1; // Инициализация переменной для идентификации задач

  // Метод для создания новой задачи
  const createTask = (description) => {
    return {
      id: maxId++, // Присваиваем уникальный идентификатор
      completed: false,
      description,
      created: new Date(),
      editing: false,
    };
  };

  // Метод для добавления новой задачи в состояние
  const addTask = (text) => {
    const newTask = createTask(text); // Создаем новую задачу
    setTasks((prevTasks) => [...prevTasks, newTask]); // Добавляем новую задачу к списку задач
  };

  // Метод для удаления задачи из состояния
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Фильтруем задачи, исключая ту, которую нужно удалить
  };

  // Метод для изменения состояния редактирования задачи
  const setEditing = (id, editing, newDescription = null) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              editing,
              description:
                newDescription !== null ? newDescription : task.description, // Обновляем описание задачи при необходимости
            }
          : task,
      ),
    );
  };

  // Метод для изменения состояния выполнения задачи
  const handleTaskCompletionToggle = (id, completed) => {
    setTasks(
      (prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed } : task,
        ), // Обновляем состояние выполнения задачи
    );
  };

  // Метод для изменения фильтра задач
  const changeFilter = (newFilter) => {
    setFilter(newFilter); // Обновляем значение фильтра
  };

  // Метод для удаления завершенных задач
  const clearCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed)); // Оставляем только незавершенные задачи
  };

  const incompleteTasksCount = tasks.filter((task) => !task.completed).length; // Получаем количество незавершенных задач

  return (
    <section className="todoapp">
      {/* Компонент для добавления новой задачи */}
      <NewTaskForm onTaskAdded={addTask} />
      <section className="main">
        {/* Компонент для отображения списка задач */}
        <TaskList
          tasks={tasks}
          filter={filter}
          onTaskCompletionToggle={handleTaskCompletionToggle}
          onDeleted={deleteTask}
          onEdit={setEditing}
        />
        {/* Компонент для управления фильтром и удалением завершенных задач */}
        <Footer
          count={incompleteTasksCount}
          filter={filter}
          setFilter={changeFilter}
          clearCompletedTasks={clearCompletedTasks}
        />
      </section>
    </section>
  );
};

export default TodoApp;

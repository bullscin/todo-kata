import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TaskTimer.css';

class TaskTimer extends Component {
  constructor(props) {
    super(props);
    // Инициализация состояния компонента
    this.state = {
      isRunning: false, // Флаг, указывающий на состояние таймера
    };
    // Привязка метода к текущему экземпляру
    this.toggleTimer = this.toggleTimer.bind(this);
  }

  // Метод для переключения состояния таймера
  toggleTimer() {
    const { startTimer, stopTimer, taskId, toggleRunningTask, isRunning } = this.props;

    // Переключение состояния таймера для задачи
    toggleRunningTask(taskId);

    // Запуск или остановка таймера в зависимости от текущего состояния
    if (!isRunning) {
      startTimer(taskId);
    } else {
      stopTimer(taskId);
    }

    // Обновление состояния isRunning
    this.setState((prevState) => ({
      isRunning: !prevState.isRunning,
    }));
  }

  render() {
    const { currentTimeId, isRunning } = this.props;

    return (
      <div className="new-todo-form">
        {/* Кнопка для начала или остановки таймера */}
        <button className="new-todo" type="button" onClick={this.toggleTimer}>
          {isRunning ? 'Остановить' : 'Начать'}
        </button>
        {/* Отображение текущего времени таймера */}
        <div className="new-todo-form__timer">{currentTimeId}</div>
      </div>
    );
  }
}

// Определение типов ожидаемых свойств для компонента TaskTimer
TaskTimer.propTypes = {
  startTimer: PropTypes.func.isRequired, // Функция для запуска таймера
  stopTimer: PropTypes.func.isRequired, // Функция для остановки таймера
  taskId: PropTypes.number.isRequired, // ID задачи, для которой отображается таймер
  currentTimeId: PropTypes.number.isRequired, // Текущее время таймера
  isRunning: PropTypes.bool.isRequired, // Флаг, указывающий на состояние таймера (запущен или остановлен)
  toggleRunningTask: PropTypes.func.isRequired, // Функция для переключения состояния таймера
};

export default TaskTimer;

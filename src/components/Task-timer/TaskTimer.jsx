import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TaskTimer.css';

export default class TaskTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false, // Состояние для отслеживания состояния таймера (запущен/остановлен)
    };
    this.toggleTimer = this.toggleTimer.bind(this); // Привязка контекста для метода toggleTimer
  }

  // Метод, вызываемый при размонтировании компонента
  componentWillUnmount() {
    const { stopTimer, taskId } = this.props;
    stopTimer(taskId); // Остановка таймера
  }

  // Метод для переключения состояния таймера (запустить/остановить)
  toggleTimer() {
    const { startTimer, stopTimer, taskId } = this.props;
    const { isRunning } = this.state;

    if (isRunning) {
      stopTimer(taskId); // Остановка таймера
      this.setState({ isRunning: false }); // Обновление состояния таймера на "остановлен"
    } else {
      startTimer(taskId); // Запуск таймера
      this.setState({ isRunning: true }); // Обновление состояния таймера на "запущен"
    }
  }

  render() {
    const { currentTimeId } = this.props; // Получение текущего времени из пропсов
    const { isRunning } = this.state; // Получение состояния таймера из состояния компонента

    return (
      <div className="new-todo-form">
        {/* Кнопка для запуска/остановки таймера */}
        <button className="new-todo" type="button" onClick={this.toggleTimer}>
          {isRunning ? 'Остановить' : 'Начать'}{' '}
          {/* Текст кнопки зависит от состояния таймера */}
        </button>
        {/* Отображение текущего времени */}
        <div className="new-todo-form__timer">{currentTimeId}</div>
      </div>
    );
  }
}

// Проверка типов пропсов компонента
TaskTimer.propTypes = {
  startTimer: PropTypes.func.isRequired, // Функция для запуска таймера
  stopTimer: PropTypes.func.isRequired, // Функция для остановки таймера
  taskId: PropTypes.number.isRequired, // ID задачи, для которой используется таймер
  currentTimeId: PropTypes.number.isRequired, // Текущее время таймера
};

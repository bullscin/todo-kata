import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TaskTimer.css';

class TaskTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
    };
    this.timerInterval = null;
    this.toggleTimer = this.toggleTimer.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  toggleTimer() {
    const { startTimer, stopTimer, taskId } = this.props;
    const { isRunning } = this.state;

    if (!isRunning) {
      startTimer(taskId); // Запуск таймера для конкретной задачи
      this.timerInterval = setInterval(() => {
        this.setState({
          isRunning: true,
        });
      }, 1000);
    } else {
      stopTimer(taskId); // Остановка таймера для конкретной задачи
      clearInterval(this.timerInterval);

      this.setState({
        isRunning: false,
      });
    }
  }

  render() {
    const { isRunning } = this.state;
    const { currentTimeId } = this.props;

    return (
      <form className="new-todo-form">
        <button className="new-todo" type="button" onClick={this.toggleTimer}>
          {isRunning ? 'Остановить' : 'Начать'}
        </button>
        <div className="new-todo-form__timer">{currentTimeId}</div>
      </form>
    );
  }
}

TaskTimer.propTypes = {
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  taskId: PropTypes.number.isRequired,

  currentTimeId: PropTypes.number.isRequired,
};

export default TaskTimer;

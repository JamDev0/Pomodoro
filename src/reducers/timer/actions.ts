import { baseTimer } from './reducer'

export enum actionTypes {
  ADD_TIMER_TO_TIMERS_LIST = 'ADD_TIMER_TO_TIMERS_LIST',
  START_COUNTDOWN = 'START_COUNTDOWN',
  SET_COUNTDOWN_ID = 'SET_COUNTDOWN_ID',
  STOP = 'STOP',
  CONTINUE = 'CONTINUE',
  CONTINUE_COUNTDOWN = 'CONTINUE_COUNTDOWN',
  CANCEL = 'CANCEL',
  DELETE = 'DELETE',
}

export function addTimerToTimersListAction(incomingTimerData: baseTimer) {
  return {
    type: actionTypes.ADD_TIMER_TO_TIMERS_LIST,
    payload: incomingTimerData,
  }
}

export function startCountdownAction() {
  return {
    type: actionTypes.START_COUNTDOWN,
  }
}

export function cancelAction() {
  return {
    type: actionTypes.CANCEL,
  }
}

export function setCountdownIdAction(id: number) {
  return {
    type: actionTypes.SET_COUNTDOWN_ID,
    payload: id,
  }
}

export function stopAction() {
  return {
    type: actionTypes.STOP,
  }
}

export function continueAction() {
  return {
    type: actionTypes.CONTINUE,
  }
}

export function continueCountdownAction() {
  return {
    type: actionTypes.CONTINUE_COUNTDOWN,
  }
}

export function deleteAction() {
  return {
    type: actionTypes.DELETE,
  }
}

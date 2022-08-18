import { actionTypes } from "./actions";

interface baseTimer {
    taskName: string
    duration: number
}

export type timerStatusTypes =
  | 'idle'
  | 'stopped'
  | 'onGoing'
  | 'over'
  | 'canceled'

export interface timerCompleted extends baseTimer {
    id: string
    startDate: Date
    status: timerStatusTypes
    timeAlreadyPassed?: number
    continueDate?: Date | null
  }

interface timerState {
    timersList: timerCompleted[]
    timerId: string | null
    countdownIntervalId: number | null
}

export function timerReducer(state: timerState, action: actionTypes) {
    switch(action) {
        case actionTypes.ADD_NEW_TIMER_TO_TIMERS_LIST_ACTION: {
            const id = String(new Date().getTime())

            const timer: timerCompleted = {
            id,
            ...incomingTimerData,
            startDate: new Date(),
            continueDate: new Date(),
            status: 'onGoing',
            }

            setTimersList((state) => [timer, ...state])

            setTimerId(id)
        }
            
    }
}
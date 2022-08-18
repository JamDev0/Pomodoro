import { differenceInSeconds } from 'date-fns'

import { timerReducer } from '../reducers/timer/reducer'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { actionTypes, startAction } from '../reducers/timer/actions'

interface TimerProviderProps {
  children: ReactNode
}

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

interface timerContextInterface {
  timerTimeToDisplay: string
  timerStatus: timerStatusTypes
  timer: timerCompleted | null | undefined
  timersList: timerCompleted[] | []
  setStopProps: () => void
  setContinueProps: () => void
  addNewTimerToTimersList: (arg: baseTimer) => void
  removeTimer: () => void
  cancelTimer: () => void
}

const timerContext = createContext<timerContextInterface>(
  {} as timerContextInterface,
)

export function TimerProvider({ children }: TimerProviderProps) {
  const [{ countdownIntervalId, timerId, timerSecondsPassed, timersList}, dispatch ] = useReducer(timerReducer, {
    timersList: [],
    timerId: null,
    countdownIntervalId: null,
    timerSecondsPassed: 0,
  })


  const timer = timerId
    ? timersList.find((timer) => timer.id === timerId)
    : null

  const timerDurationInSeconds = timer ? timer.duration * 60 : 0

  const timerTimeLeftInSeconds = timerDurationInSeconds - timerSecondsPassed

  const timerMinutesLeft = Math.floor(timerTimeLeftInSeconds / 60)

  const timerMinutesLeftFormatted = String(timerMinutesLeft).padStart(2, '0')

  const timerSecondsLeft = timerTimeLeftInSeconds % 60

  const timerSecondsLeftFormatted = String(timerSecondsLeft).padStart(2, '0')

  const timerTimeToDisplay =
    timerMinutesLeftFormatted + timerSecondsLeftFormatted

  const timerStatus: timerStatusTypes = timer ? timer.status : 'idle'

  function startTimer() { 
    dispatch(startAction())
    // pegar os valores vindo do app
  }

  return (
    <timerContext.Provider
      value={{
        addNewTimerToTimersList,
        timerTimeToDisplay,
        timerStatus,
        setContinueProps,
        setStopProps,
        timer,
        removeTimer,
        cancelTimer,
        timersList,
      }}
    >
      {children}
    </timerContext.Provider>
  )
}

export function useTimer() {
  const context = useContext(timerContext)

  return context
}

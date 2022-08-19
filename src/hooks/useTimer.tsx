import {
  baseTimer,
  timerCompleted,
  timerReducer,
} from '../reducers/timer/reducer'

import { createContext, ReactNode, useContext, useReducer } from 'react'

import {
  addTimerToTimersListAction,
  cancelAction,
  continueAction,
  continueCountdownAction,
  deleteAction,
  setCountdownIdAction,
  startCountdownAction,
  stopAction,
} from '../reducers/timer/actions'

interface TimerProviderProps {
  children: ReactNode
}

interface timerContextInterface {
  timer: timerCompleted | null
  timerTimeToDisplay: string
  timersList: timerCompleted[] | []
  startTimer: (arg: baseTimer) => void
  stopTimer: () => void
  continueTimer: () => void
  cancelTimer: () => void
  deleteTimer: () => void
}

const timerContext = createContext<timerContextInterface>(
  {} as timerContextInterface,
)

export function TimerProvider({ children }: TimerProviderProps) {
  const initialTimerState = localStorage.getItem('@Pomo:timerState')
    ? JSON.parse(localStorage.getItem('@Pomo:timerState')!)
    : {
        timersList: [],
        timerId: null,
        countdownIntervalId: null,
        timerSecondsPassed: 0,
      }

  const [state, dispatch] = useReducer(timerReducer, initialTimerState)

  const { timerId, timerSecondsPassed, timersList } = state

  localStorage.setItem('@Pomo:timerState', JSON.stringify(state))

  const timer = timerId
    ? timersList.find((timer) => timer.id === timerId) ?? null
    : null

  const timerDurationInSeconds = timer ? timer.duration * 60 : 0

  const timerTimeLeftInSeconds = timerDurationInSeconds - timerSecondsPassed

  const timerMinutesLeft = Math.floor(timerTimeLeftInSeconds / 60)

  const timerMinutesLeftFormatted = String(timerMinutesLeft).padStart(2, '0')

  const timerSecondsLeft = timerTimeLeftInSeconds % 60

  const timerSecondsLeftFormatted = String(timerSecondsLeft).padStart(2, '0')

  const timerTimeToDisplay =
    timerMinutesLeftFormatted + timerSecondsLeftFormatted

  function startTimer(incomingTimerData: baseTimer) {
    dispatch(addTimerToTimersListAction(incomingTimerData))
    const countdown = setInterval(() => dispatch(startCountdownAction()), 1000)
    dispatch(setCountdownIdAction(countdown))
  }

  function stopTimer() {
    dispatch(stopAction())
  }

  function continueTimer() {
    dispatch(continueAction())
    const countdown = setInterval(
      () => dispatch(continueCountdownAction()),
      1000,
    )
    dispatch(setCountdownIdAction(countdown))
  }

  function cancelTimer() {
    dispatch(cancelAction())
  }

  function deleteTimer() {
    dispatch(deleteAction())
  }

  // useEffect(() => {
  //   if (timer) {
  //     if (isTimerIntervalGoing === false) {
  //       if (timer.continueDate) {
  //         const countdown = setInterval(
  //           () => dispatch(continueCountdownAction()),
  //           1000,
  //         )
  //         dispatch(setCountdownIdAction(countdown))
  //       } else {
  //         const countdown = setInterval(
  //           () => dispatch(startCountdownAction()),
  //           1000,
  //         )
  //         dispatch(setCountdownIdAction(countdown))
  //       }

  //       console.log('interval dentro muito ', isTimerIntervalGoing)

  //       setIsTimerIntervalGoing(true)
  //     }
  //   }
  // }, [timer, isTimerIntervalGoing])

  return (
    <timerContext.Provider
      value={{
        startTimer,
        timer,
        timerTimeToDisplay,
        stopTimer,
        continueTimer,
        cancelTimer,
        deleteTimer,
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

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'

import {
  baseTimer,
  timerCompleted,
  timerReducer,
} from '../reducers/timer/reducer'

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

const initialTimerState = localStorage.getItem('@Pomo:timerState')
  ? JSON.parse(localStorage.getItem('@Pomo:timerState')!)
  : {
      timersList: [],
      timerId: null,
      countdownIntervalId: null,
      timerSecondsPassed: 0,
    }

export function TimerProvider({ children }: TimerProviderProps) {
  const [state, dispatch] = useReducer(timerReducer, initialTimerState)

  const { timerId, timerSecondsPassed, timersList } = state

  useEffect(() => {
    localStorage.setItem('@Pomo:timerState', JSON.stringify(state))
  }, [state])

  const [isTimerCurrentlyGoing, setIsTimerCurrentlyGoing] = useState<
    boolean | null
  >(null)

  const timer = timerId
    ? timersList.find((timer) => timer.id === timerId) ?? null
    : null

  const shouldTimerStartNaturally =
    timer && isTimerCurrentlyGoing === false && timer.status === 'onGoing'

  useEffect(() => {
    if (shouldTimerStartNaturally) {
      if (timer.continueDate) {
        const countdown = setInterval(
          () => dispatch(continueCountdownAction()),
          1000,
        )
        dispatch(setCountdownIdAction(countdown))

        setIsTimerCurrentlyGoing(true)
      } else {
        if (timer.startDate) {
          const countdown = setInterval(
            () => dispatch(startCountdownAction()),
            1000,
          )
          dispatch(setCountdownIdAction(countdown))

          setIsTimerCurrentlyGoing(true)
        }
      }
    }
  }, [shouldTimerStartNaturally, timer])

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

    setIsTimerCurrentlyGoing(true)
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

    setIsTimerCurrentlyGoing(true)
  }

  function cancelTimer() {
    dispatch(cancelAction())
  }

  function deleteTimer() {
    dispatch(deleteAction())
  }

  useEffect(() => {
    setIsTimerCurrentlyGoing(false)
  }, [])

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

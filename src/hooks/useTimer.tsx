import { differenceInSeconds } from 'date-fns'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface TimerProviderProps {
  children: ReactNode
}

interface baseTimer {
  taskName: string
  duration: number
}

export type timerStatusTypes = 'idle' | 'stopped' | 'onGoing' | 'over'

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
  const [timersList, setTimersList] = useState<timerCompleted[]>([])

  const [timerId, setTimerId] = useState<string | null>(null)

  const [countdownIntervalId, setCountdownIntervalId] = useState<number | null>(
    null,
  )

  const timer = timerId
    ? timersList.find((timer) => timer.id === timerId)
    : null

  const timerDurationInSeconds = timer ? timer.duration * 60 : 0

  const [timerSecondsPassed, setTimerSecondsPassed] = useState<number>(0)

  const timerTimeLeftInSeconds = timerDurationInSeconds - timerSecondsPassed

  const timerMinutesLeft = Math.floor(timerTimeLeftInSeconds / 60)

  const timerMinutesLeftFormatted = String(timerMinutesLeft).padStart(2, '0')

  const timerSecondsLeft = timerTimeLeftInSeconds % 60

  const timerSecondsLeftFormatted = String(timerSecondsLeft).padStart(2, '0')

  const timerTimeToDisplay =
    timerMinutesLeftFormatted + timerSecondsLeftFormatted

  const timerStatus: timerStatusTypes = timer ? timer.status : 'idle'

  function addNewTimerToTimersList(incomingTimerData: baseTimer) {
    const id = String(new Date().getTime())

    const timer: timerCompleted = {
      id,
      ...incomingTimerData,
      startDate: new Date(),
      continueDate: new Date(),
      status: 'onGoing',
    }

    setTimersList((state) => [...state, timer])

    setTimerId(id)
  }

  function setStopProps() {
    if (timer) {
      const timersListWithoutTimer = timersList.filter(
        (innerTimer) => timer.id !== innerTimer.id,
      )

      const TimerStopped: timerCompleted = {
        ...timer,
        status: 'stopped',
        timeAlreadyPassed: timerSecondsPassed,
        continueDate: null,
      }

      setTimersList([...timersListWithoutTimer, TimerStopped])
    }
  }

  function setContinueProps() {
    if (timer) {
      const timersListWithoutTimer = timersList.filter(
        (innerTimer) => timer.id !== innerTimer.id,
      )

      const TimerContinued: timerCompleted = {
        ...timer,
        status: 'onGoing',
        continueDate: new Date(),
      }

      setTimersList([...timersListWithoutTimer, TimerContinued])
    }
  }

  function stop() {
    clearInterval(countdownIntervalId!)
  }

  function proceed() {
    if (timerSecondsPassed === 0) {
      initialCountdown()
    } else {
      continueCountdown()
    }
  }

  function initialCountdown() {
    const countdown = setInterval(() => {
      const timePassed = differenceInSeconds(new Date(), timer!.startDate!)

      const timerOnLimit = timePassed <= timerDurationInSeconds

      if (timerOnLimit) {
        setTimerSecondsPassed(timePassed)
      } else {
        console.log('Over')
        changeTimerStatus(timer!, 'over')
      }
    }, 1000)

    setCountdownIntervalId(countdown)
  }

  function continueCountdown() {
    const countdown = setInterval(() => {
      const timePassed =
        differenceInSeconds(new Date(), timer!.continueDate!) +
        timer!.timeAlreadyPassed!

      const timerOnLimit = timePassed <= timerDurationInSeconds

      if (timerOnLimit) {
        setTimerSecondsPassed(timePassed)
      } else {
        console.log('Over')
        changeTimerStatus(timer!, 'over')
      }
    }, 1000)

    setCountdownIntervalId(countdown)
  }

  function changeTimerStatus(
    innerTimer: timerCompleted,
    status: timerCompleted['status'],
  ) {
    const timerListWithoutTimer = timersList.filter(
      (timer) => timer.id !== innerTimer.id,
    )

    const TimerStopped: timerCompleted = {
      ...innerTimer,
      status,
    }

    setTimersList([...timerListWithoutTimer, TimerStopped])
  }

  function removeTimer() {
    setTimerId(null)
    setTimerSecondsPassed(0)
  }

  function cancelTimer() {
    clearInterval(countdownIntervalId!)

    setTimerId(null)

    setTimerSecondsPassed(0)
  }

  useEffect(() => {
    if (timer) {
      switch (timer.status) {
        case 'onGoing':
          proceed()
          break

        case 'stopped':
          stop()
          break

        case 'over':
          stop()
          break
      }
    }
  }, [timer])

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

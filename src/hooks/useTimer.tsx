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

interface timerCompleted extends baseTimer {
  id: string
  startDate: Date
  stoppedDate?: Date
}

export type timerStatusTypes = 'idle' | 'stopped' | 'onGoing' | 'over'

interface timerContextInterface {
  timerTimeToDisplay: string
  timerStatus: timerStatusTypes
  stopCurrentTimer: () => void
  addNewTimerToTimersList: (arg: baseTimer) => void
}

const timerContext = createContext<timerContextInterface>(
  {} as timerContextInterface,
)

export function TimerProvider({ children }: TimerProviderProps) {
  const [timersList, setTimersList] = useState<timerCompleted[]>([])

  const [currentTimerId, setCurrentTimerId] = useState<string | null>(null)

  const [timerStatus, setTimerStatus] = useState<timerStatusTypes>('idle')

  const currentTimer = currentTimerId
    ? timersList.find((timer) => timer.id === currentTimerId)
    : null

  const currentTimerDurationInSeconds = currentTimer
    ? currentTimer.duration * 60
    : 0

  const [currentTimerSecondsPassed, setCurrentTimerSecondsPassed] =
    useState<number>(0)

  const currentTimerTimeLeftInSeconds =
    currentTimerDurationInSeconds - currentTimerSecondsPassed

  const currentTimerMinutesLeft = Math.floor(currentTimerTimeLeftInSeconds / 60)

  const currentTimerMinutesLeftFormatted = String(
    currentTimerMinutesLeft,
  ).padStart(2, '0')

  const currentTimerSecondsLeft = currentTimerTimeLeftInSeconds % 60

  const currentTimerSecondsLeftFormatted = String(
    currentTimerSecondsLeft,
  ).padStart(2, '0')

  const timerTimeToDisplay =
    currentTimerMinutesLeftFormatted + currentTimerSecondsLeftFormatted

  function addNewTimerToTimersList(incomingTimer: baseTimer) {
    const id = String(new Date().getTime())

    const timer: timerCompleted = {
      id,
      ...incomingTimer,
      startDate: new Date(),
    }

    setTimersList((state) => [...state, timer])

    setCurrentTimerId(id)
  }

  function stopCurrentTimer() {
    const timerListWithoutCurrentTimer = timersList.filter(
      (timer) => timer.id !== currentTimerId,
    )

    const currentTimerStopped: timerCompleted = {
      ...currentTimer!,
      stoppedDate: new Date(),
    }

    setTimersList([...timerListWithoutCurrentTimer, currentTimerStopped])
  }

  useEffect(() => {
    if (currentTimer !== null) {
      if (currentTimer?.stoppedDate) {
        setTimerStatus('stopped')
      } else {
        const countdown = setInterval(() => {
          const differenceSeconds = differenceInSeconds(
            new Date(),
            currentTimer!.startDate,
          )

          const timerOnLimit = differenceSeconds <= currentTimer!.duration * 60

          console.log(currentTimer?.stoppedDate)

          if (timerOnLimit) {
            setCurrentTimerSecondsPassed(differenceSeconds)
          } else {
            clearInterval(countdown)
            setTimerStatus('over')
          }
        }, 1000)

        setTimerStatus('onGoing')
      }
    }
  }, [currentTimer])

  return (
    <timerContext.Provider
      value={{
        addNewTimerToTimersList,
        timerTimeToDisplay,
        timerStatus,
        stopCurrentTimer,
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

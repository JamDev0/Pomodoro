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

interface timerWithId extends baseTimer {
  id: string
}

export type timerStatusTypes = 'idle' | 'stopped' | 'onGoing' | 'over'

interface timerContextInterface {
  timerTimeToDisplay: string
  timerStatus: timerStatusTypes
  addNewTimerToTimersList: (arg: baseTimer) => void
}

const timerContext = createContext<timerContextInterface>(
  {} as timerContextInterface,
)

export function TimerProvider({ children }: TimerProviderProps) {
  const [timersList, setTimersList] = useState<timerWithId[]>([])

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

    const timer = {
      id,
      ...incomingTimer,
    }

    setTimersList((state) => [...state, timer])

    setCurrentTimerId(id)
  }

  function startCurrentTimerCountdown() {
    if (currentTimerId !== null) {
      setTimerStatus('onGoing')
      const countdown = setInterval(() => {
        if (currentTimerTimeLeftInSeconds > 0) {
          setCurrentTimerSecondsPassed((state) => state + 1)
        } else {
          if (currentTimerTimeLeftInSeconds === 0) {
            console.log('Entrou no if de clear interval')
            clearInterval(countdown)
            setTimerStatus('over')
          }
        }
      }, 1000)
    }
  }

  useEffect(() => {
    startCurrentTimerCountdown()
  }, [currentTimerId])

  return (
    <timerContext.Provider
      value={{ addNewTimerToTimersList, timerTimeToDisplay, timerStatus }}
    >
      {children}
    </timerContext.Provider>
  )
}

export function useTimer() {
  const context = useContext(timerContext)

  return context
}

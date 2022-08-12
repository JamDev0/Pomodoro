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

interface timerCompleted extends baseTimer {
  id: string
  startDate: Date
  status: timerStatusTypes // Adicionar uma nova propriedade para dizer qual a atual ação que o timer deve executar(continuar ou parar)
  continueDate?: Date | null
}


interface timerContextInterface {
  timerTimeToDisplay: string
  timerStatus: timerStatusTypes
  setStopProps: () => void
  setContinueProps: () => void
  addNewTimerToTimersList: (arg: baseTimer) => void
}

const timerContext = createContext<timerContextInterface>(
  {} as timerContextInterface,
)

export function TimerProvider({ children }: TimerProviderProps) {
  const [timersList, setTimersList] = useState<timerCompleted[]>([])

  const [currentTimerId, setCurrentTimerId] = useState<string | null>(null)  

  const [countdownIntervalId, setCountdownIntervalId] = useState<number | null>(null)

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

  const timerStatus: timerStatusTypes = currentTimer ? currentTimer.status : 'idle'

  function addNewTimerToTimersList(incomingTimer: baseTimer) {
    const id = String(new Date().getTime())

    const timer: timerCompleted = {
      id,
      ...incomingTimer,
      startDate: new Date(),
      status: 'idle',
    }

    setTimersList((state) => [...state, timer])

    setCurrentTimerId(id)
  }

  function changeCurrentTimerStatus(innerCurrentTimer: timerCompleted, status: timerCompleted['status']) {
    const timerListWithoutCurrentTimer = timersList.filter(
      (timer) => timer.id !== innerCurrentTimer.id,
    )

    const currentTimerStopped: timerCompleted = {
      ...innerCurrentTimer,
      status: status,
    }

    setTimersList([...timerListWithoutCurrentTimer, currentTimerStopped])
  }

  function continueCountdown() {
    const countdown = setInterval(() => {
      const differenceSeconds = differenceInSeconds(
        new Date(),
          currentTimer!.continueDate!,
        )
        
        const timerOnLimit = differenceSeconds <= currentTimer!.duration * 60
        
      if (timerOnLimit) {
        setCurrentTimerSecondsPassed((state) => differenceSeconds + state)
      } else {
        console.log('Over')
        changeCurrentTimerStatus(currentTimer!, 'over')
      }
    }, 1000)
    
    setCountdownIntervalId(countdown)
  }

  function startCountdown() {
    const countdown = setInterval(() => {
      const differenceSeconds = differenceInSeconds(
        new Date(),
          currentTimer!.startDate,
        )
        
        const timerOnLimit = differenceSeconds <= currentTimer!.duration * 60
        
        if (timerOnLimit) {
        setCurrentTimerSecondsPassed(differenceSeconds)
      } else {
        console.log('Over')
        changeCurrentTimerStatus(currentTimer!, 'over')
      }
    }, 1000)
    
    setCountdownIntervalId(countdown)
  }
  
  function start() {
    startCountdown()
  }

  function stop() {
    clearInterval(countdownIntervalId!)
  }

  function proceed() {
    continueCountdown()
  }
  
  function setContinueProps() {
    if(currentTimer) {
      const timerListWithoutCurrentTimer = timersList.filter(
        (timer) => timer.id !== currentTimer.id,
      )
      
      const currentTimerStopped: timerCompleted = {
        ...currentTimer,
        status: 'onGoing',
        continueDate: new Date(),
      }
      
      setTimersList([...timerListWithoutCurrentTimer, currentTimerStopped])
    }
  }
  
  function setStopProps() {
    if(currentTimer) {
      const timerListWithoutCurrentTimer = timersList.filter(
        (timer) => timer.id !== currentTimer.id,
      )
      
      const currentTimerStopped: timerCompleted = {
        ...currentTimer,
        status: 'stopped',
        continueDate: null,
      }
      
      setTimersList([...timerListWithoutCurrentTimer, currentTimerStopped])
    }
  }

  useEffect(() => {
    if(currentTimer) {
      switch(currentTimer.status) {
        case 'onGoing':
          proceed()
          break

        case 'stopped':
          stop()
          break
        
        case 'idle':
          start()
          break
        
        case 'over':
          break
      }
    }
  }, [currentTimer])
  
  return (
    <timerContext.Provider
      value={{
        addNewTimerToTimersList,
        timerTimeToDisplay,
        timerStatus,
        setContinueProps,
        setStopProps,
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

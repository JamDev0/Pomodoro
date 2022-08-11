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
  restartStartDate?: Date
}


interface timerContextInterface {
  timerTimeToDisplay: string
  timerStatus: timerStatusTypes
  stopCurrentTimer: () => void
  addNewTimerToTimersList: (arg: baseTimer) => void
  continueCurrentTimer: () => void
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
      status: 'idle'
    }

    setTimersList((state) => [...state, timer])

    setCurrentTimerId(id)
  }

  function stopCurrentTimer() {
    changeCurrentTimerStatus(currentTimer!, 'stopped')

    clearInterval(countdownIntervalId!)
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

  function continueCountdownFunction(innerCurrentTimer: timerCompleted) {
    if(!innerCurrentTimer.restartStartDate) {
      const timerListWithoutCurrentTimer = timersList.filter(
        (timer) => timer.id !== currentTimerId,
      )
  
      const currentTimerStopped: timerCompleted = {
        ...innerCurrentTimer!,
        restartStartDate: new Date()
      }
  
      setTimersList([...timerListWithoutCurrentTimer, currentTimerStopped])
    } // Dar um jeito nisso, alocar esta parte corretamente

    const countdown = setInterval(() => {
      const differenceSeconds = differenceInSeconds(
        new Date(),
          innerCurrentTimer.restartStartDate!,
        )
        
        const timerOnLimit = differenceSeconds <= innerCurrentTimer.duration * 60
        
      if (timerOnLimit) {
        setCurrentTimerSecondsPassed((state) => differenceSeconds + state)
      } else {
        stopCurrentTimer()
        changeCurrentTimerStatus(innerCurrentTimer, 'over')
      }
    }, 1000)
    
    setCountdownIntervalId(countdown)
    
    changeCurrentTimerStatus(innerCurrentTimer, 'onGoing')
  }
  
  function initialCountdownFunction(innerCurrentTimer: timerCompleted) {
    const countdown = setInterval(() => {
      const differenceSeconds = differenceInSeconds(
        new Date(),
          innerCurrentTimer.startDate,
        )
        
        const timerOnLimit = differenceSeconds <= innerCurrentTimer.duration * 60
        
        if (timerOnLimit) {
        setCurrentTimerSecondsPassed(differenceSeconds)
      } else {
        stopCurrentTimer()
        changeCurrentTimerStatus(innerCurrentTimer, 'over')
      }
    }, 1000)
    
    setCountdownIntervalId(countdown)
    
    changeCurrentTimerStatus(innerCurrentTimer, 'onGoing')
  }

  function continueCurrentTimer() {
    const innerTimer = timersList ? timersList.find((timer) => timer.id === currentTimerId) : null

    if(innerTimer) {
      continueCountdownFunction(innerTimer)
    }
  }
  
  useEffect(() => {
    console.log('current timer: ', currentTimer)
    switch(currentTimer?.status) {
      case 'idle':
        initialCountdownFunction(currentTimer)
        break

      case 'onGoing':
        stopCurrentTimer()
        break
      
      case 'over':
        break
      
      case 'stopped':
        continueCurrentTimer()
        break
    }
  }, [currentTimer])

  return (
    <timerContext.Provider
      value={{
        addNewTimerToTimersList,
        timerTimeToDisplay,
        timerStatus,
        stopCurrentTimer,
        continueCurrentTimer,
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

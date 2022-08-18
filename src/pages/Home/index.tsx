import { ArrowFatLinesRight, HandPalm, Play, Plus } from 'phosphor-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Timer } from './components/Timer'
import {
  CancelButton,
  HomeContainer,
  OnGoingButtonsContainer,
  StartButton,
  TimerTitle,
} from './Home.styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTimer } from '../../hooks/useTimer'
import { TimerInformationInputs } from './components/Timer/TimerInformationInputs'

export function Home() {
  const {
    startTimer,
    timer
  } = useTimer()

  const startTimerFormValidationSchema = zod.object({
    taskName: zod.string().min(1),
    duration: zod.number().min(5).max(60),
  })

  type startTimerFormTypes = zod.infer<typeof startTimerFormValidationSchema>

  const { register, handleSubmit, watch, reset } = useForm<startTimerFormTypes>(
    {
      resolver: zodResolver(startTimerFormValidationSchema),
      defaultValues: {
        duration: undefined,
        taskName: '',
      },
    },
  )

  const watchedTaskName = watch('taskName')

  const watchedDuration = watch('duration')

  const timerHasInitialized = timer !== null

  const timerStatus = timer ? timer.status : 'idle'

  const isStartButtonDisabled =
    timerStatus === 'idle' ? watchedTaskName === '' || !watchedDuration : false

  const showCancelButton =
    timerStatus === 'onGoing' || timerStatus === 'stopped'

  const basePageTitle = 'Pomo'

  document.title = timerHasInitialized
    ? `${basePageTitle} - ${timer!.taskName}`
    : `${basePageTitle} - Home`

  document.title =
    timerStatus === 'over' ? document.title + ' Acabou!' : document.title

  function handleStartTimerFormSubmission(data: startTimerFormTypes) {
    startTimer(data)
    reset()
  }

  function defineButtonContentBasedOnTimerStatus() {
    switch (timerStatus) {
      case 'idle':
        return (
          <>
            <Play />
            Começar
          </>
        )
      case 'onGoing':
        return (
          <>
            <HandPalm />
            Pausar
          </>
        )

      case 'stopped':
        return (
          <>
            <ArrowFatLinesRight />
            Continuar
          </>
        )

      case 'over':
        return (
          <>
            <Plus />
            Novo timer
          </>
        )
    }
  }

  function handleButtonClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    switch (timerStatus) {
      case 'idle':
        break

      case 'onGoing':
        event.preventDefault()
        break

      case 'stopped':
        event.preventDefault()
        break

      case 'over':
        event.preventDefault()
        break
    }
  }

  return (
    <HomeContainer onSubmit={handleSubmit(handleStartTimerFormSubmission)}>
      {timerHasInitialized ? (
        <TimerTitle>{timer!.taskName}</TimerTitle>
      ) : (
        <TimerInformationInputs register={register} />
      )}

      <Timer />
      {showCancelButton ? (
        <OnGoingButtonsContainer>
          <StartButton
            timerStatus={timerStatus}
            disabled={isStartButtonDisabled}
            onClick={(event) => {
              handleButtonClick(event)
            }}
          >
            {defineButtonContentBasedOnTimerStatus()}
          </StartButton>
          <CancelButton onClick={() => {console.log('STOP')}}>Cancelar</CancelButton>
        </OnGoingButtonsContainer>
      ) : (
        <StartButton
          timerStatus={timerStatus}
          disabled={isStartButtonDisabled}
          onClick={(event) => {
            handleButtonClick(event)
          }}
        >
          {defineButtonContentBasedOnTimerStatus()}
        </StartButton>
      )}
    </HomeContainer>
  )
}

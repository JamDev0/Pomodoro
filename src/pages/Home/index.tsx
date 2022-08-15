import { ArrowFatLinesRight, HandPalm, Play, Plus } from 'phosphor-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Timer } from './components/Timer'
import { HomeContainer, StartButton, TimerTitle } from './Home.styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTimer } from '../../hooks/useTimer'
import { TimerInformationInputs } from './components/Timer/TimerInformationInputs'

export function Home() {
  const {
    addNewTimerToTimersList,
    timerStatus,
    setContinueProps,
    setStopProps,
    timer,
    removeTimer,
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

  const isStartButtonDisabled =
    timerStatus === 'idle' ? watchedTaskName === '' || !watchedDuration : false

  const basePageTitle = 'Pomo'

  document.title = timerHasInitialized
    ? `${basePageTitle} - ${timer!.taskName}`
    : `${basePageTitle} - Home`

  function handleStartTimerFormSubmission(data: startTimerFormTypes) {
    addNewTimerToTimersList(data)
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
            Interromper
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
        setStopProps()
        break

      case 'stopped':
        event.preventDefault()
        setContinueProps()
        break

      case 'over':
        event.preventDefault()
        removeTimer()
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
      <StartButton
        timerStatus={timerStatus}
        disabled={isStartButtonDisabled}
        onClick={(event) => {
          handleButtonClick(event)
        }}
      >
        {defineButtonContentBasedOnTimerStatus()}
      </StartButton>
    </HomeContainer>
  )
}

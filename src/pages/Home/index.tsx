import { ArrowFatLinesRight, HandPalm, Play, Plus } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Timer } from './components/Timer'
import {
  HomeContainer,
  InputsContainer,
  NameInput,
  StartButton,
  TimeInput,
} from './Home.styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTimer } from '../../hooks/useTimer'

export function Home() {
  const { addNewTimerToTimersList, timerStatus } = useTimer()

  useEffect(() => {
    document.title = 'Pomo - Home'
  }, [])

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

  const isStartButtonDisabled =
    watchedDuration === undefined || watchedTaskName === ''

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

  function handleButtonClick(event: MouseEvent) {
    switch (timerStatus) {
      case 'idle':
        event.preventDefault()
        break
    }
  }

  return (
    <HomeContainer onSubmit={handleSubmit(handleStartTimerFormSubmission)}>
      <InputsContainer>
        <span>Vou trabalhar em</span>
        <NameInput
          type="text"
          placeholder="Dê um nome para seu projeto"
          list="task-sugestions"
          {...register('taskName')}
        ></NameInput>

        <datalist id="task-sugestions"></datalist>

        <span>durante</span>
        <TimeInput
          step={5}
          min={5}
          max={60}
          type="number"
          placeholder="00"
          {...register('duration', { valueAsNumber: true })}
        ></TimeInput>
        <span>minutos.</span>
      </InputsContainer>
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

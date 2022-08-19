import { FormProvider, useForm } from 'react-hook-form'

import * as zod from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { useTimer } from '../../hooks/useTimer'

import {
  CancelButton,
  HomeContainer,
  ButtonsContainer,
  TimerTitle,
} from './Home.styles'

import { Timer } from './components/Timer'

import { TimerInformationInputs } from './components/Timer/TimerInformationInputs'

import { MainButton } from './components/MainButton'

export function Home() {
  const { startTimer, timer, cancelTimer, timerTimeToDisplay } = useTimer()

  const startTimerFormValidationSchema = zod.object({
    taskName: zod.string().min(1),
    duration: zod.number().min(5).max(60),
  })

  type startTimerFormTypes = zod.infer<typeof startTimerFormValidationSchema>

  const timerForm = useForm<startTimerFormTypes>({
    resolver: zodResolver(startTimerFormValidationSchema),
    defaultValues: {
      duration: undefined,
      taskName: '',
    },
  })

  const timerHasStarted = timer !== null

  const timerStatus = timer ? timer.status : 'idle'

  const showCancelButton =
    timerStatus === 'onGoing' || timerStatus === 'stopped'

  document.title = timerHasStarted
    ? `Pomo - ${timer.taskName} ${timerTimeToDisplay[0]}${timerTimeToDisplay[1]}:${timerTimeToDisplay[2]}${timerTimeToDisplay[3]}`
    : `Pomo - Home`

  function handleStartTimerFormSubmission(data: startTimerFormTypes) {
    startTimer(data)
    timerForm.reset()
  }

  return (
    <HomeContainer
      onSubmit={timerForm.handleSubmit(handleStartTimerFormSubmission)}
    >
      <FormProvider {...timerForm}>
        {timerHasStarted ? (
          <TimerTitle>{timer!.taskName}</TimerTitle>
        ) : (
          <TimerInformationInputs />
        )}

        <Timer />
        <ButtonsContainer>
          <MainButton />
          {showCancelButton ? (
            <CancelButton onClick={cancelTimer}>Cancelar</CancelButton>
          ) : null}
        </ButtonsContainer>
      </FormProvider>
    </HomeContainer>
  )
}

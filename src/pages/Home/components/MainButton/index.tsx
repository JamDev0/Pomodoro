import { ArrowFatLinesRight, HandPalm, Play, Plus } from 'phosphor-react'
import { useFormContext } from 'react-hook-form'
import { useTimer } from '../../../../hooks/useTimer'
import { MainButtonContainer } from './MainButton.styles'

export function MainButton() {
  const { timer, stopTimer, continueTimer, deleteTimer } = useTimer()

  const { watch } = useFormContext()

  const timerStatus = timer ? timer.status : 'idle'

  const watchedTaskName = watch('taskName')

  const watchedDuration = watch('duration')

  const disabled =
    timerStatus === 'idle' ? watchedTaskName === '' || !watchedDuration : false

  function buttonBasedOnTimerStatus() {
    switch (timerStatus) {
      case 'idle':
        return (
          <MainButtonContainer disabled={disabled} timerStatus={timerStatus}>
            <Play />
            Começar
          </MainButtonContainer>
        )
      case 'onGoing':
        return (
          <MainButtonContainer
            disabled={disabled}
            onClick={(event) => {
              event.preventDefault()
              stopTimer()
            }}
            timerStatus={timerStatus}
          >
            <HandPalm />
            Pausar
          </MainButtonContainer>
        )

      case 'stopped':
        return (
          <MainButtonContainer
            disabled={disabled}
            onClick={(event) => {
              event.preventDefault()
              continueTimer()
            }}
            timerStatus={timerStatus}
          >
            <ArrowFatLinesRight />
            Continuar
          </MainButtonContainer>
        )

      case 'over':
        return (
          <MainButtonContainer
            disabled={disabled}
            onClick={(event) => {
              event.preventDefault()
              deleteTimer()
            }}
            timerStatus={timerStatus}
          >
            <Plus />
            Novo timer
          </MainButtonContainer>
        )
    }
  }

  return <>{buttonBasedOnTimerStatus()}</>
}

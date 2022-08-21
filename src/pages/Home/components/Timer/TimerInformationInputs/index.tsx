import { useTimer } from '../../../../../hooks/useTimer'

import { useFormContext } from 'react-hook-form'

import {
  InputsContainer,
  NameInput,
  TimeInput,
} from './TimerInformationInputs.styles'

export function TimerInformationInputs() {
  const { timer } = useTimer()

  const { register } = useFormContext()

  const timerStatus = timer ? timer.id : 'idle'

  const isInputsDisabled = timerStatus !== 'idle'

  return (
    <InputsContainer>
      <span>Vou trabalhar em</span>
      <NameInput
        type="text"
        placeholder="Dê um nome para seu projeto"
        list="task-suggestions"
        disabled={isInputsDisabled}
        {...register('taskName')}
      ></NameInput>

      <datalist id="task-suggestions"></datalist>

      <span>durante</span>
      <TimeInput
        step={5}
        min={5}
        max={60}
        type="number"
        placeholder="00"
        disabled={isInputsDisabled}
        {...register('duration', { valueAsNumber: true })}
      ></TimeInput>
      <span>minutos.</span>
    </InputsContainer>
  )
}

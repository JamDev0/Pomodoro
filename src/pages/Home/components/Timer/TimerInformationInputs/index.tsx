import { useTimer } from '../../../../../hooks/useTimer'

import {
  InputsContainer,
  NameInput,
  TimeInput,
} from './TimerInformationInputs.styles'

interface TimerInformationInputsProps {
  register: any
}

export function TimerInformationInputs({
  register,
}: TimerInformationInputsProps) {
  const { timerStatus } = useTimer()

  const isInputsDisabled = timerStatus !== 'idle'

  return (
    <InputsContainer>
      <span>Vou trabalhar em</span>
      <NameInput
        type="text"
        placeholder="Dê um nome para seu projeto"
        list="task-sugestions"
        disabled={isInputsDisabled}
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
        disabled={isInputsDisabled}
        {...register('duration', { valueAsNumber: true })}
      ></TimeInput>
      <span>minutos.</span>
    </InputsContainer>
  )
}

import { actionTypes } from './actions'

import { produce } from 'immer'
import { differenceInSeconds } from 'date-fns'

export interface baseTimer {
  taskName: string
  duration: number
}

export type timerStatusTypes =
  | 'idle'
  | 'stopped'
  | 'onGoing'
  | 'over'
  | 'canceled'

export interface timerCompleted extends baseTimer {
  id: string
  startDate: Date
  status: timerStatusTypes
  timeAlreadyPassed?: number
  continueDate?: Date | null
  shouldRestart?: boolean
}

interface timerState {
  timersList: timerCompleted[]
  timerId: string | null
  countdownIntervalId: number | null
  timerSecondsPassed: number
}

export function timerReducer(state: timerState, action: any) {
  const timer = state.timerId
    ? state.timersList.find((timer) => timer.id === state.timerId)
    : null

  const timerIndex = timer
    ? state.timersList.findIndex((innerTimer) => innerTimer.id === timer.id)
    : null

  const timerDurationInSeconds = timer ? timer.duration * 60 : 0

  switch (action.type) {
    case actionTypes.ADD_TIMER_TO_TIMERS_LIST: {
      return produce(state, (draft) => {
        const id = String(new Date().getTime())

        const timer: timerCompleted = {
          id,
          ...action.payload,
          startDate: new Date(),
          continueDate: null,
          status: 'onGoing',
        }

        draft.timersList.unshift(timer)
        draft.timerId = id
      })
    }

    case actionTypes.START_COUNTDOWN: {
      return produce(state, (draft) => {
        const timePassed = differenceInSeconds(
          new Date(),
          new Date(timer!.startDate!),
        )

        const timerOnLimit = timePassed <= timerDurationInSeconds

        if (timerOnLimit) {
          draft.timerSecondsPassed = timePassed
        } else {
          draft.timersList[timerIndex!].status = 'over'
          clearInterval(state.countdownIntervalId!)
        }
      })
    }

    case actionTypes.SET_COUNTDOWN_ID: {
      return produce(state, (draft) => {
        draft.countdownIntervalId = action.payload
      })
    }

    case actionTypes.STOP: {
      if (state.countdownIntervalId) {
        clearInterval(state.countdownIntervalId)

        return produce(state, (draft) => {
          draft.timersList[timerIndex!].status = 'stopped'
          draft.timersList[timerIndex!].continueDate = null
          draft.timersList[timerIndex!].timeAlreadyPassed =
            draft.timerSecondsPassed
        })
      }

      break
    }

    case actionTypes.CONTINUE: {
      return produce(state, (draft) => {
        draft.timersList[timerIndex!].status = 'onGoing'
        draft.timersList[timerIndex!].continueDate = new Date()
      })
    }

    case actionTypes.CONTINUE_COUNTDOWN: {
      return produce(state, (draft) => {
        const timePassed =
          differenceInSeconds(new Date(), new Date(timer!.continueDate!)) +
          timer!.timeAlreadyPassed!

        const timerOnLimit = timePassed <= timerDurationInSeconds

        if (timerOnLimit) {
          draft.timerSecondsPassed = timePassed
        } else {
          draft.timersList[timerIndex!].status = 'over'
          clearInterval(state.countdownIntervalId!)
        }
      })
    }

    case actionTypes.CANCEL: {
      return produce(state, (draft) => {
        clearInterval(draft.countdownIntervalId!)

        draft.timersList[timerIndex!].status = 'canceled'
        draft.timerId = null
        draft.timerSecondsPassed = 0
      })
    }

    case actionTypes.DELETE: {
      return produce(state, (draft) => {
        draft.timerId = null
        draft.timerSecondsPassed = 0
      })
    }
  }

  return state
}

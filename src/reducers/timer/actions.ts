import { baseTimer } from './reducer';

export enum actionTypes {
    START = 'START',
    STOP = 'STOP',
    CONTINUE = 'CONTINUE',
    CANCEL = 'CANCEL',
}

export function startAction(incomingTimerData: baseTimer) {
    return {
        type: actionTypes.START,
        payload: incomingTimerData
    }
}
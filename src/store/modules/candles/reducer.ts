import {ApplicationAction, ApplicationState} from './types';
import {RequestResult} from "../../../enum/requestResult";

const initialState: ApplicationState = {
    resultInfo: RequestResult.Success,
    result: {
        low: 0,
        high: 0,
    },
    error: {
        status: 0,
        text: '',
    },
}

export function reducer(state = initialState, action: ApplicationAction): ApplicationState {
    switch (action.type) {
        case "FETCH_CANDLES_REQUEST":
            return {
                ...state,
                resultInfo: RequestResult.Loading,
            };
        case "FETCH_CANDLES_SUCCESS":
            return {
                ...state,
                resultInfo: RequestResult.Success,
                result: action.payload,
            };
        case "FETCH_CANDLES_ERROR":
            return {
                ...state,
                resultInfo: RequestResult.Error,
                error: action.payload,
            };
        default:
            return state;
    }
}


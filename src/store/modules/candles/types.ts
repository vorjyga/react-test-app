import { Action } from 'redux';
import {RequestResult} from "../../../enum/requestResult";


export interface ApplicationState {
    resultInfo: RequestResult;
    result: LowHighValues;
    error: ErrorStatus;
}

export interface Years {
    dateFrom: number;
    dateTo: number;
}

export interface LowHighValues {
    low: number;
    high: number;
}

export interface ErrorStatus {
    status: number,
    text: string,
}

export interface LoadCandlesRequest extends Action<string> {
    type: 'FETCH_CANDLES_REQUEST';
}

export interface LoadCandlesSuccess extends Action<string> {
    type: 'FETCH_CANDLES_SUCCESS';
    payload: LowHighValues;
}

export interface LoadCandlesError extends Action<string> {
    type: 'FETCH_CANDLES_ERROR';
    payload: ErrorStatus;
}

export type ApplicationAction =
    | LoadCandlesRequest
    | LoadCandlesSuccess
    | LoadCandlesError;

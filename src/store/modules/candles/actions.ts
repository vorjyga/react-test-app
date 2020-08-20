import {ErrorStatus, LoadCandlesError, LoadCandlesRequest, LoadCandlesSuccess, LowHighValues, Years} from "./types";
import {CandleService} from "../../../services/candleService";
import {Dispatch} from "redux";


const loadCandlesRequest = (): LoadCandlesRequest => ({
    type: "FETCH_CANDLES_REQUEST"
})

const loadCandlesSuccess = (payload: LowHighValues): LoadCandlesSuccess => ({
    type: "FETCH_CANDLES_SUCCESS",
    payload
})

const loadCandlesError = (payload: ErrorStatus): LoadCandlesError => ({
    type: "FETCH_CANDLES_ERROR",
    payload,
})


const fetchCandles = (candleService: CandleService, dispatch: Dispatch) => async (years: Years) => {
    dispatch(loadCandlesRequest());
    try {
        const lowHigh = await candleService.getCandle(years);
        dispatch(loadCandlesSuccess(lowHigh));
    } catch (error) {
        dispatch(loadCandlesError(error));
    }
}
export {
    fetchCandles
}

import {DataProvider} from "./dataProvider";
import {LowHighValues, Years} from "../store/modules/candles/types";
import {CandleOHLC, CandleOHLCResponse} from "./interfaces";

export class CandleService extends DataProvider {
    private getByYearURL = 'candles_by_year';

    /*
    *   Метод получения свечей. Определяет, возможны ли параллельные запросы или нет.
    * */
    public async getCandle(years: Years): Promise<LowHighValues> {
        const numOfRequestsAllow: number = +(process.env.REACT_APP_PARALLEL_QUERRIES as string);
        let responses = [];
        if (numOfRequestsAllow > 1) {
            responses = await this.parallelRequests(this.yearsToArray(years), numOfRequestsAllow)
        } else {
            const generator = this.getCandlesGenerate(this.yearsToArray(years));
            for await (let value of generator) {
                responses.push(value.ohlc);
            }
        }
        return this.findLowHighValues(responses.flat())
    }

    /*
    *   Метод для получения свечей с использованием нескольких запросов одновременно.
    * */
    private async parallelRequests(yearsArray: number[], numOfRequestsAllow: number): Promise<CandleOHLC[][]> {
        const blocksArray = [];
        const blockSize = Math.ceil(yearsArray.length / numOfRequestsAllow);

        const responses = [];
        for (let i = 0; i < numOfRequestsAllow; i++) {
            blocksArray.push(
                yearsArray.slice(i * blockSize, i * blockSize + blockSize)
            )
            const generator = this.getCandlesGenerate(yearsArray.slice(i * blockSize, i * blockSize + blockSize));
            for await (let value of generator) {
                responses.push(value.ohlc);
            }
        }
        return responses;
    }

    private yearsToArray({dateFrom, dateTo}: Years): number[] {
        let year = dateFrom;
        let yearsArray = [];
        while (year <= dateTo) {
            yearsArray.push(year);
            year++
        }
        return yearsArray;
    }

    private async * getCandlesGenerate(years: number[]): AsyncGenerator<CandleOHLCResponse> {
        for await (let year of years) {
            let url = `${this.getByYearURL}?year=${year}`;
            yield await this.get<CandleOHLCResponse>(url);
        }
    }

    private findLowHighValues(candles: CandleOHLC[]): LowHighValues {
        const lowHigh: LowHighValues = {
            low: Number.MAX_SAFE_INTEGER,
            high: Number.MIN_SAFE_INTEGER,
        }
        for (let candle of candles) {
            if (candle.l < lowHigh.low ) {
                lowHigh.low = candle.l;
            }
            if (candle.h > lowHigh.high) {
                lowHigh.high = candle.h;
            }
        }
        return lowHigh;
    }
}

export const candleService = new CandleService();

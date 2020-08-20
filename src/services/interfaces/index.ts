export interface CandleOHLC {
    l: number;
    h: number;
    o: number;
    c: number;
}

export interface CandleOHLCResponse {
    status: number;
    ohlc: CandleOHLC[];
}

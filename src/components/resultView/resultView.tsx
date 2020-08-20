import {LowHighValues} from "../../store/modules/candles/types";
import React from "react";


interface Props {
    lowHigh: LowHighValues
}

export const ResultView: React.FC<LowHighValues> = ({high,low}) => (
    <div>
        <div>
            Low: {low}
        </div>
        <div>
            High: {high}
        </div>
    </div>
)

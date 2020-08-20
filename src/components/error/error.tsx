import React from "react";
import {ErrorStatus} from "../../store/modules/candles/types";


export const ServerError: React.FC<ErrorStatus> = ({status,text}) => (
    <div>
        <div >{status}</div >
        <div >{text}</div >
    </div>
)

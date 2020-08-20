import React from "react";
import {RootState} from "../../store";
import {connect} from "react-redux";
import {RequestResult} from "../../enum/requestResult";

import './resultWindow.css';
import {Loader} from "../loader/loader";
import {ServerError} from "../error/error";
import {ResultView} from "../resultView/resultView";

const ResultWindow: React.FC<Props> = ({resultInfo, result, error}) => {
    let Result;

    switch (resultInfo) {
        case (RequestResult.Success):
            Result = (<ResultView  {...result} />)
            break;
        case RequestResult.Error:
            Result = (<ServerError {...error} />);
            break;
        case RequestResult.Loading:
            Result =  <Loader />
            break;
    }
    return (
        <div className={'main'}>
            <div className="result">
                {Result}
            </div>
        </div >
    )
}
const mapStateToProps = ({request}: RootState) => {
    const {
        result,
        resultInfo,
        error,
    } = request;

    return {
        result,
        resultInfo,
        error
    }
}

type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(ResultWindow);

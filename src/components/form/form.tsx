import React, {useState} from "react";
import {Dispatch} from "redux";
import {Input} from "../input/input";
import {candleService} from "../../services/candleService";
import {connect} from 'react-redux';
import {RootState} from "../../store";
import {RequestResult} from "../../enum/requestResult";
import {fetchCandles} from "../../store/modules/candles/actions";
import {Years} from "../../store/modules/candles/types";
import {checkYears} from "../../utils";
import './form.css'


const Form: React.FC<Props> = ({resultInfo, fetchCandles}) => {
    const [years, setYears] = useState<Years>({dateFrom: 2020, dateTo: 2020})

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const checkedYears = checkYears(years);
        fetchCandles(checkedYears);
        setYears({
            ...checkedYears,
        });
    }

    const setValue = ({name, value}: HTMLInputElement) => {
        setYears({
            ...years,
            [name]: +value,
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={'request-form'}
        >
            <div >
                <label htmlFor="{'dateFrom'}">От: </label >
                <Input
                    name={'dateFrom'}
                    value={years.dateFrom}
                    onValueChange={setValue}
                />
            </div >
            <div >
                <label htmlFor="{'dateTo'}">До: </label >
                <Input
                    name={'dateTo'}
                    value={years.dateTo}
                    onValueChange={setValue}
                />
            </div >
            <button
                type={'submit'}
                disabled={resultInfo === RequestResult.Loading}
            >
                Запросить
            </button >
        </form >
    )
}

const mapStateToProps = (state: RootState) => {
    const {
        resultInfo,
    } = state.request;

    return {
        resultInfo,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchCandles: fetchCandles(candleService, dispatch)
    }
};
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> ;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Form);

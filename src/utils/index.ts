import {Years} from "../store/modules/candles/types";

const checkYears = ({dateFrom, dateTo}: Years): Years => {
    const minimalAvailableYear = +(process.env.REACT_APP_MIN_YEAR as string);
    const maximumAvailableYear = new Date().getFullYear();

    let minYear = dateFrom < minimalAvailableYear ? minimalAvailableYear : dateFrom;
    let maxYear = dateTo > maximumAvailableYear ? maximumAvailableYear : dateTo;

    if (minYear > maxYear) {
        minYear = maxYear;
    }
    return {
        dateFrom: minYear,
        dateTo: maxYear,
    }
}

export {
    checkYears,
}

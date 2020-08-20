import React, {ChangeEvent} from 'react';

type Props = {
    value: number;
    name: string;
    onValueChange: (target: HTMLInputElement) => void;
};

export const Input: React.FC<Props> = ({value, onValueChange, name}) => {
    const handleChange = (val: ChangeEvent<HTMLInputElement>) => {
        onValueChange(val.target)
    }

    return (
        <input
            name={name}
            type="number"
            value={value}
            onChange={handleChange}
        />
    )
}

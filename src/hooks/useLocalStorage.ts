import React, { useEffect, useState } from "react";
import { scoreType } from '../components/Scoreboard';

type useLocalStorageType = [
    scoreType[],
    React.Dispatch<React.SetStateAction<scoreType[]>>,
];

const getStorageData = (keyName: string, defaultValue: any): scoreType[] => {
    const savedItem = localStorage.getItem(keyName) || '[]';
    const parsedItem = JSON.parse(savedItem);
    return parsedItem || defaultValue;
};

export const useLocalStorage = (keyName: string, initialValue: scoreType[]): useLocalStorageType => {
    const [value, setValue] = useState(() => {
        return getStorageData(keyName, initialValue);
    });

    useEffect(() => {
        localStorage.setItem(keyName, JSON.stringify(value));
    }, [keyName, value]);

    return [value, setValue];
};

export default useLocalStorage;

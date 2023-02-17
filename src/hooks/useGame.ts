import { useState } from "react";
import { CardType } from "../components/Board";

type useGameType = [
    number,
    CardType[],
    (id: number) => void,
];

const useGame = function (): useGameType {
    // States
    const [score, setScore] = useState(0);
    const [cards, setCards] = useState([]);


    const clickCard = function (id: number) {
    };

    return [score, cards, clickCard];
};

export default useGame;

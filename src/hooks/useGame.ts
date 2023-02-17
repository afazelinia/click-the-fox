import { useState } from "react";
import { CardType } from "../components/Board";

type useGameType = [
    number,
    CardType[],
    (id: number) => void,
];

const mockedGetCards = () => [
    { index: 1, img: "https://randomfox.ca/images/1.jpg" },
    { index: 2, img: "https://randomfox.ca/images/2.jpg" },
    { index: 3, img: "https://randomfox.ca/images/3.jpg" },
    { index: 4, img: "https://randomfox.ca/images/4.jpg" },
    { index: 5, img: "https://randomfox.ca/images/5.jpg" },
    { index: 6, img: "https://randomfox.ca/images/6.jpg" },
    { index: 7, img: "https://randomfox.ca/images/7.jpg" },
    { index: 8, img: "https://randomfox.ca/images/8.jpg" },
    { index: 9, img: "https://randomfox.ca/images/9.jpg" },
];
const useGame = function (): useGameType {
    // States
    const [score, setScore] = useState(0);
    const [cards, setCards] = useState(mockedGetCards());


    const clickCard = function (id: number) {
    };

    return [score, cards, clickCard];
};

export default useGame;

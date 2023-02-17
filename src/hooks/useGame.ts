import { useEffect, useState } from "react";
import { CardType } from "../components/Board";
import useFetch from "./useFetch";

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
    const { data: dogs, loading: loadingDogs } = useFetch("https://dog.ceo/api/breeds/image/random", "message");
    const { data: cats, loading: loadingCats } = useFetch("https://aws.random.cat/meow", "file");
    const { data: foxes, loading: loadingFoxes } = useFetch("https://randomfox.ca/floof/", "image");


    useEffect(() => {
        if (!loadingFoxes && !loadingDogs && !loadingCats) {
            console.log('dogs', dogs);
            console.log('cats', cats);
            console.log('foxes', foxes);
        }
    }, [loadingFoxes, loadingCats, loadingDogs]);

    const clickCard = function (id: number) {
    };

    return [score, cards, clickCard];
};

export default useGame;

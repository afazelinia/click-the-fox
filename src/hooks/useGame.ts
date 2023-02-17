import { useEffect, useState } from "react";
import { CardType } from "../components/Board";
import useFetch from "./useFetch";

type useGameType = [
    number,
    CardType[],
    (id: number) => void,
    boolean,
    (playing: boolean) => void,
    number,
];

type answerType = {
    answer: number,
    cards: CardType[],
};

const useGame = (): useGameType => {
    // States
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [collection, setCollection] = useState<string[]>([]);
    const [playing, setPlaying] = useState(false);
    const [reFetch, setReFetch] = useState(0);

    const [currentQuestion, setCurrentQuestion] = useState<answerType>({ answer: -1, cards: [] });
    const { data: dogs, loading: loadingDogs } = useFetch("https://dog.ceo/api/breeds/image/random", "message", reFetch);
    const { data: cats, loading: loadingCats } = useFetch("https://aws.random.cat/meow", "file", reFetch);
    const { data: foxes, loading: loadingFoxes } = useFetch("https://randomfox.ca/floof", "image", reFetch);

    useEffect(() => {
        if (!loadingDogs && !loadingCats) {
            const orderedDogsCats = dogs.concat(cats);
            const shuffledPictures = orderedDogsCats.sort((a, b) => 0.5 - Math.random());
            setCollection(shuffledPictures);
        }
    }, [loadingCats, loadingDogs]);

    useEffect(() => {
        if (playing) {
            console.log('game started');
            setScore(0);
            setCurrentQuestion(generateQuestion());
        }
    }, [playing]);

    useEffect(() => {
        if (timeLeft <= 0) {
            console.log('game ended');
            setPlaying(false);
        }
    }, [timeLeft]);

    useEffect(() => {
        // prefetch foxes
        if (foxes.length && !loadingFoxes) {
            preFetchImages(foxes.slice(0, 6));
        }
    }, [loadingFoxes]);

    useEffect(() => {
        // prefetch others
        if (collection.length) {
            preFetchImages(collection.slice(0, 16));
        }
    }, [collection]);

    const preFetchImages = (images: string[]) => {
        images.forEach(image => {
           new Image().src = image;
        });
    };

    const generateQuestion = (): { answer: number, cards: CardType[] } => {
        if (collection.length <= 16 || foxes.length <= 2) {
            // fill queue
            setReFetch(reFetch + 1);
        }
        if (currentQuestion.answer !== -1) {
            // push collection
            setCollection(collection.slice(8, collection.length));
            foxes.shift();
        }
        // random question
        const answer = Math.floor(Math.random() * 9);
        const pictures = collection.slice(0, 8);
        pictures.splice(answer, 0, foxes[0]);
        return { answer, cards: pictures.map((img, index) => {
            return { index, img };
            })
        };
    };

    const provideAnswer = (index: number) => {
        if (!playing) {
            return;
        }
        if (index === currentQuestion.answer) {
            setScore(score + 1);
            setCurrentQuestion(generateQuestion());
        } else {
            setScore(score - 1);
        }
    };

    const setGamePlaying = (playing: boolean) => {
        setPlaying(playing);
    };

    return [score, currentQuestion.cards, provideAnswer, playing, setGamePlaying, timeLeft ];
};

export default useGame;

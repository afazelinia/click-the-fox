import { useEffect, useState, useRef } from "react";
import { CardType } from "../components/Board";
import useFetch from "./useFetch";
import preLoadImages from "../utils/preLoadImage";

type useGameType = [
    number,
    CardType[],
    (id: number) => void,
    boolean,
    (again: boolean) => void,
    () => void,
    number,
    boolean,
];

type answerType = {
    answer: number,
    cards: CardType[],
};

type collectionType = {
    dogs: string[],
    cats: string[],
    foxes: string[],
};

type reFetchType = {
    dogs: number,
    cats: number,
    foxes: number,
};

const catsPerQuestion = 1, dogsPerQuestion = 7, preFetchQuestionCount = 3;

const foxesAddress = { url: "https://randomfox.ca/floof", selector: "image", fetchCount: preFetchQuestionCount };
const dogsAddress = { url: "https://dog.ceo/api/breeds/image/random", selector: "message", fetchCount: dogsPerQuestion * preFetchQuestionCount };
const catsAddress = { url: "https://aws.random.cat/meow", selector: "file", fetchCount: catsPerQuestion * preFetchQuestionCount };

const useGame = (): useGameType => {

    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [playing, setPlaying] = useState(false);
    const [reFetch, setReFetch] = useState<reFetchType>({ dogs: 0, cats: 0, foxes: 0 });
    const [currentQuestion, setCurrentQuestion] = useState<answerType>({ answer: -1, cards: [] });
    const [collection, setCollection] = useState<collectionType>({ dogs: [], cats: [], foxes: []}); // loaded Images
    const intervalId = useRef<number | null>();
    const { data: dogs, loading: loadingDogs } = useFetch(dogsAddress, reFetch.dogs);
    const { data: cats, loading: loadingCats } = useFetch(catsAddress, reFetch.cats);
    const { data: foxes, loading: loadingFoxes } = useFetch(foxesAddress, reFetch.foxes);

    useEffect(() => {
        if (playing) {
            setScore(0);
            setTimeLeft(30);
            if (currentQuestion.answer === -1) {
                // question not prepared before
                setCurrentQuestion(generateQuestion());
            }
            setTimer();
            return () => {
                removeTimer();
            }
        }
    }, [playing]);

    useEffect(() => {
        if (playing) {
            if (isLoading(collection)) {
                removeTimer();
            } else {
                setTimer();
            }
        }
    }, [collection]);

    const setTimer = () => {
        if (intervalId.current == null) {
            intervalId.current = window.setInterval(() => {
                setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
            }, 1000);
        }
    };

    const removeTimer = () => {
        if (intervalId.current != null) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }
    };

    useEffect(() => {
        if (timeLeft <= 0) {
            setPlaying(false);
            removeTimer();
        }
    }, [timeLeft]);

    useEffect(() => {
        setImagesToCollection(foxes, loadingFoxes, 'foxes');
    }, [loadingFoxes]);

    useEffect(() => {
        setImagesToCollection(dogs, loadingDogs, 'dogs');
    }, [loadingDogs]);

    useEffect(() => {
        setImagesToCollection(cats, loadingCats, 'cats');
    }, [loadingCats]);

    const setImagesToCollection = (urls: string[], loading: boolean, identifier: string) => {
        if (urls.length && !loading) {
            async function preFetch() {
                const loaded = await preLoadImages(urls);
                setCollection(prevCollection => ({
                    ...prevCollection,
                    [identifier]: prevCollection[identifier as keyof collectionType].concat(urls)
                }));
            }
            preFetch();
        }
    };

    const reFetchImages = () => {
        if (collection.dogs.length < dogsAddress.fetchCount) {
            setReFetch(prevReFetch => ({...prevReFetch, dogs: prevReFetch.dogs + 1 }));
        }
        if (collection.cats.length < catsAddress.fetchCount) {
            setReFetch(prevReFetch => ({...prevReFetch, cats: prevReFetch.cats + 1 }));
        }
        if (collection.foxes.length < foxesAddress.fetchCount) {
            setReFetch(prevReFetch => ({...prevReFetch, foxes: prevReFetch.foxes + 1 }));
        }
    };

    const generateQuestion = (): { answer: number, cards: CardType[] } => {
        // fetch new pictures
        reFetchImages();
        // generate random question
        const answer = Math.floor(Math.random() * (catsPerQuestion + dogsPerQuestion + 1));
        const randomCollection = collection.dogs.slice(0, dogsPerQuestion).concat(collection.cats.slice(0, catsPerQuestion))
            .sort((a, b) => 0.5 - Math.random());
        randomCollection.splice(answer, 0, collection.foxes[0]);
        // push for next question
        setCollection({
            dogs: collection.dogs.slice(dogsPerQuestion, dogs.length),
            cats: collection.cats.slice(catsPerQuestion, cats.length),
            foxes: collection.foxes.slice(1, foxes.length),
        });
        return { answer, cards: randomCollection.map((img, index) => {
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

    const startGamePlaying = (playAgain: boolean) => {
        setPlaying(true);
        if (playAgain) {
            setCurrentQuestion(generateQuestion());
            reFetchImages();
        }
    };

    const resetGamePlaying = () => {
        setPlaying(false);
        setTimeLeft(30);
        setScore(0);
        setCurrentQuestion(generateQuestion());
        reFetchImages();
    };

    const isLoading = (collection: collectionType): boolean => {
        return collection.dogs.length < dogsPerQuestion ||
            collection.cats.length < catsPerQuestion ||
            collection.foxes.length < 1;
    };

    return [score,
            currentQuestion.cards,
            provideAnswer,
            playing,
            startGamePlaying,
            resetGamePlaying,
            timeLeft,
            isLoading(collection)];
};

export default useGame;

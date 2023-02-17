import { useState, useRef, useCallback, useEffect } from "react";
import useGame from "../hooks/useGame";
import useLocalStorage from "../hooks/useLocalStorage";
import Board from "./Board";
import Scoreboard, { scoreType } from "./Scoreboard";

const findRank = (currentRecord: scoreType, records: scoreType[]): number => {
    for (let i = 0; i< records.length; i++) {
        if (Number(records[i]?.score) <= Number(currentRecord?.score)) {
            return i - 1;
        }
    }
    return records.length
};

const GameContainer = ({}) => {
    const [score, cards, provideAnswer, playing, setGamePlaying, timeLeft, isLoading] = useGame();
    const [playerName, setPlayerName] = useState('');
    const [records, setRecords] = useLocalStorage("scoreboard_CtF", []);

    const inputRef = useRef<HTMLInputElement>(null);

    const startGame = () => {
        if (!playerName) {
            setPlayerName(inputRef.current?.value ?? '');
        }
        setGamePlaying(true);
    };

    useEffect(() => {
        if (!playing && timeLeft <= 0) {
            setRecords(() => {
                const currentRecord = {
                    playerName,
                    dateTime: new Date().toLocaleDateString('en-us', {
                        year:"numeric",
                        month:"short",
                        day:"numeric",
                    }),
                    score: String(score),
                };
                const rank = findRank(currentRecord, records) + 1;
                return [...records.slice(0, rank), currentRecord, ...records.slice(rank)];
            });
        }
    }, [playing]);

    const stopGame = () => {
        setGamePlaying(false);
    };

    const onSubmitForm = () => {
        const name = inputRef.current?.value ?? '';
        setPlayerName(name);
    };

    const fillRecords = useCallback(() => {
        let empty = [];
        if (records.length < 10) {
            empty = new Array(10 - records.length).fill({ playerName: '', dateTime: '', score: '' });
        }
        return records.concat(empty);
    }, [records]);

    return (
        <div>
            {playing && (
                <>
                    <div className="relative">
                        <p className="score">Score: {score}, Time Left: 00:{timeLeft < 10 ? "0" + timeLeft : timeLeft}</p>
                    </div>
                    <Board
                        cards={cards}
                        onCardClicked={provideAnswer}
                    />
                </>
            )}
            {!playing && timeLeft > 0 && (
                <div className="welcome-container">
                    {playerName.trim() === '' ? <form onSubmit={onSubmitForm}>
                        <label>Enter your name: <input type="text" name="playerName" ref={inputRef} /></label>
                    </form> : <p className="greeting" onClick={() => setPlayerName('')}>Hello {playerName}</p>}
                    <button onClick={() => startGame()} disabled={isLoading}>{isLoading ? 'Loading...' : 'Play'}</button>
                </div>
            )}
            {!playing && timeLeft <= 0 && (
                <>
                    <div className="relative">
                        <p className="score">Scoreboard</p>
                    </div>
                    <Scoreboard
                        records={fillRecords()}
                    />
                </>
            )}
        </div>
    );

};

export default GameContainer;

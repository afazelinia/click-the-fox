import { useState, useRef } from "react";
import useGame from "../hooks/useGame";
import Board from "./Board";
import Scoreboard from "./Scoreboard";

const mockRecords = [
    {
        playerName: 'Amir',
        dateTime: new Date().toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric" }),
        score: '10',
    }
];

const GameContainer = ({}) => {
    const [score, cards, provideAnswer, playing, setGamePlaying, timeLeft, isLoading] = useGame();
    const [playerName, setPlayerName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const startGame = () => {
        if (!playerName) {
            setPlayerName(inputRef.current?.value ?? '');
        }
        setGamePlaying(true);
    };

    const stopGame = () => {
        setGamePlaying(false);
    };

    const onSubmitForm = () => {
        const name = inputRef.current?.value ?? '';
        setPlayerName(name);
    };

    const fillRecords = () => {
        let empty = [];
        if (mockRecords.length < 10) {
            empty = new Array(10 - mockRecords.length).fill({ playerName: '', dateTime: '', score: '' });
        }
        return mockRecords.concat(empty);
    };

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

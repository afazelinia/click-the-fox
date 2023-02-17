import { useState, useRef } from "react";
import useGame from "../hooks/useGame";
import Board from "./Board";

const GameContainer = ({}) => {
    const [score, cards, provideAnswer, playing, setGamePlaying, timeLeft, isLoading] = useGame();
    const [playerName, setPlayerName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const startGame = () => {
        const name = playerName || inputRef.current?.value;
        console.log('player name:', name);
        setGamePlaying(true);
    };

    const stopGame = () => {
        setGamePlaying(false);
    };

    const onSubmitForm = () => {
        const name = inputRef.current?.value ?? '';
        setPlayerName(name);
    };

    return (
        <div>
            {playing ? (
                <>
                    <div className="relative">
                        <p className="score">Score: {score}, Time Left: 00:{timeLeft < 10 ? "0" + timeLeft : timeLeft}</p>
                    </div>
                    <Board
                        cards={cards}
                        onCardClicked={provideAnswer}
                    />
                </>
            ) : (
                <div className="welcome-container">
                    {playerName.trim() === '' ? <form onSubmit={onSubmitForm}>
                        <label>Enter your name: <input type="text" name="playerName" ref={inputRef} /></label>
                    </form> : <p className="greeting" onClick={() => setPlayerName('')}>Hello {playerName}</p>}
                    <button onClick={() => startGame()} disabled={isLoading}>{isLoading ? 'Loading...' : 'Play'}</button>
                </div>
            )}
        </div>
    );

};

export default GameContainer;

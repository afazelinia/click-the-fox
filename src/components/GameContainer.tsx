import { useState } from "react";
import useGame from "../hooks/useGame";
import Board from "./Board";

const GameContainer = ({}) => {
    const [gameStarted, setGameStarted] = useState(false);
    const [score, cards, clickCard] = useGame();

    const startGame = () => {
        setGameStarted(true);
    };
    const stopGame = () => {
        setGameStarted(false);
    };

    return (
        <div>
            {gameStarted ? (
                <>
                    <div className="relative">
                        <p className="score">Score: {''}, Time Left: {''}</p>
                    </div>
                    <Board
                        cards={cards}
                        onCardClicked={() => console.log('clicked')}
                    />
                </>
            ) : (
                <button onClick={() => startGame()}>Play</button>
            )}
        </div>
    );

};

export default GameContainer;

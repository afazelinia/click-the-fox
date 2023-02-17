import useGame from "../hooks/useGame";
import Board from "./Board";

const GameContainer = ({}) => {
    const [score, cards, provideAnswer, playing, setGamePlaying, timeLeft] = useGame();

    const startGame = () => {
        setGamePlaying(true);
    };
    const stopGame = () => {
        setGamePlaying(false);
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
                <button onClick={() => startGame()}>Play</button>
            )}
        </div>
    );

};

export default GameContainer;

import { useState, useCallback, useEffect } from "react";
import useGame from "../hooks/useGame";
import useLocalStorage from "../hooks/useLocalStorage";
import Board from "./Board";
import Scoreboard from "./Scoreboard";
import Greeting from "./Greeting";
import findRank from "../utils/findRank";
import getDateTime from "../utils/getDateTime";


const GameContainer = ({}) => {
    const [score, cards, provideAnswer, playing, startGamePlaying, resetGamePlaying, timeLeft, isLoading] = useGame();
    const [playerName, setPlayerName] = useState('');
    const [records, setRecords] = useLocalStorage("scoreboard_CtF", []);

    const resetGame = () => {
        setPlayerName('');
        resetGamePlaying();
    };

    useEffect(() => {
        if (!playing && timeLeft <= 0) {
            setRecords(() => {
                const currentRecord = { playerName, dateTime: getDateTime(), score: String(score) };
                const rank = findRank(currentRecord, records);
                return [...records.slice(0, rank), currentRecord, ...records.slice(rank)];
            });
        }
    }, [playing]);

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
                        <p className="score">Score: {score}, Time Left: 00:{timeLeft < 10 ? "0" + timeLeft : timeLeft}{isLoading && (' (Paused)')}</p>
                    </div>
                    <Board
                        loading={isLoading}
                        cards={cards}
                        onCardClicked={provideAnswer}
                    />
                </>
            )}
            {(!playing && timeLeft > 0) && (
                <div className="welcome-container">
                    <Greeting
                        loading={isLoading}
                        playerName={playerName}
                        startGamePlaying={startGamePlaying}
                        setPlayerName={setPlayerName}
                    />
                </div>
            )}
            {(!playing && timeLeft <= 0) && (
                <>
                    <div className="relative">
                        <p className="score">Scoreboard</p>
                    </div>
                    <Scoreboard
                        records={fillRecords()}
                    />
                    <div className="scoreboard-actions">
                        <button onClick={() => startGamePlaying(true)}>{'Play Again'}</button>
                        <button onClick={() => resetGame()}>{'To Welcome Screen'}</button>
                    </div>
                </>
            )}
        </div>
    );

};

export default GameContainer;

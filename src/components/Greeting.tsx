import React, {useEffect, useRef, useState} from 'react';
type GreetingProps = {
    playerName: string;
    setPlayerName: (name: string) => void;
    startGamePlaying: (again :boolean) => void;
    loading: boolean;
};

const Greeting = ({ playerName, setPlayerName, startGamePlaying, loading }: GreetingProps) => {
    const [formHasError, setFormHasError] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    },[]);

    const startGame = () => {
        if (!inputRef.current?.value.trim() && !playerName) {
            setFormHasError(true);
            return;
        }
        if (!playerName) {
            setPlayerName(inputRef.current?.value ?? '');
        }
        setFormHasError(false);
        startGamePlaying(false);
    };

    const onSubmitForm = () => {
        const name = inputRef.current?.value ?? '';
        setPlayerName(name);
    };

    return (<>
        {(playerName.trim() === '') &&
            <form onSubmit={onSubmitForm}>
                <label>Enter your name: <input
                    type="text"
                    name="playerName"
                    onFocus={() => setFormHasError(false)}
                    ref={inputRef}
                /></label>
                {(formHasError) && <div className="error-input">name is mandatory</div>}
            </form>}
        {(playerName.trim() !== '') && <p className="greeting" onClick={() => setPlayerName('')}>Hello {playerName}</p>}
        <button onClick={() => startGame()} disabled={loading}>{loading ? <span className="loading">Loading</span> : 'Play'}</button>
    </>);
};

export default Greeting;

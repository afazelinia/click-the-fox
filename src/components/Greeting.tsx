import React from 'react';
type GreetingProps = {
    playerName: string;
    setPlayerName: (name: string) => void;
    onSubmitForm: () => void;
    setFormHasError: (hasError: boolean) => void;
    formHasError: boolean;
    inputRef: any;
};

const Greeting = ({ playerName, setPlayerName, onSubmitForm, setFormHasError, formHasError, inputRef }: GreetingProps) => {
    if (playerName.trim() === '') {
        return (<form onSubmit={onSubmitForm}>
            <label>Enter your name: <input type="text" name="playerName" onFocus={() => setFormHasError(false)} ref={inputRef} />
            </label>
            {(formHasError) && <div className="error-input">name is mandatory</div>}
        </form>);
    }
    return (<p className="greeting" onClick={() => setPlayerName('')}>Hello {playerName}</p>);
};

export default Greeting;

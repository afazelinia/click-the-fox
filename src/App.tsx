import GameContainer from './components/GameContainer';

const App = () => {
  return (
      <div className="app">
        <header>
          <h1>Click the Fox! Game</h1>
        </header>
        <main>
          <GameContainer />
        </main>
        <footer>
        </footer>
      </div>
  );
};

export default App;

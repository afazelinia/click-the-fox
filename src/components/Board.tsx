export type CardType = {
    index: number;
    img: string;
};

type BoardProps = {
    cards: CardType[];
    onCardClicked: (index: number) => void;
    loading: boolean;
};

const Board = ({ cards, onCardClicked, loading }: BoardProps) => {
    if (loading) {
        return (<div className="paused-container loading">Loading</div>);
    }
    return (<div className="cards-container">
        {cards.map((card) => (
            <div data-testid={'card-' + card.index} className="card" onClick={() => onCardClicked(card.index)} key={`${card.index}`}>
                <img src={card.img} draggable="false"/>
            </div>
        ))}
    </div>);
};

export default Board;

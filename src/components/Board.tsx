export type CardType = {
    index: number;
    img: string;
};

type BoardProps = {
    cards: CardType[];
    onCardClicked: (index: number) => void;
};

const Board = ({ cards, onCardClicked }: BoardProps) => (
    <div className="cards-container">
        {cards.map((card) => (
            <div className="card" onClick={() => onCardClicked(card.index)} key={`${card.index}`}>
                <img src={card.img} draggable="false" />
            </div>
        ))}
    </div>
);

export default Board;

export type CardType = {
    index: number;
    img: string;
};

type BoardProps = {
    cards: CardType[];
    onCardClicked: (id: number) => void;
};

const Board = ({ cards, onCardClicked }: BoardProps) => (
    <div className="cards-container">
        {cards.map((card) => (
            <div onClick={() => onCardClicked(card.index)} key={`${card.index}`}>
                <img src={card.img}/>
            </div>
        ))}
    </div>
);

export default Board;

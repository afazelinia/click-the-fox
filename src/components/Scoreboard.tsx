export type scoreType = {
    playerName?: string;
    dateTime?: string;
    score?: string;
};

type ScoreboardPropsType = {
    records: scoreType[];
};

const Scoreboard = ({ records }: ScoreboardPropsType) => (
        <div className="table-container">
            <div className="table-row heading">
                {['Rank', 'Name', 'Date', 'Score'].map((title, index) =>
                    <div key={index} className="row-item">{title}</div>
                )}
            </div>
            <div className="table-body">
            {records.map((record, index) => (
                <div key={index} className="table-row">
                    <div className="row-item vertical-heading">{index + 1}</div>
                    <div className="row-item truncate">{record.playerName}</div>
                    <div className="row-item">{record.dateTime}</div>
                    <div className="row-item">{record.score}</div>
                </div>))}
            </div>
        </div>
);

export default Scoreboard;

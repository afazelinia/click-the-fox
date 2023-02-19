import findRank from "../utils/findRank";

describe('Ranking test', () => {

    const sortedRanks = [
        { score: '10', playerName: '', dateTime: '' },
        { score: '5', playerName: '', dateTime: '' },
        { score: '0', playerName: '', dateTime: '' },
        { score: '-5', playerName: '', dateTime: '' }
        ];

    test('new high score rank',  () => {
        const highRecord = { score: '12', playerName: '', dateTime: '' };
        expect(findRank(highRecord, sortedRanks)).toEqual(0);
    })

    test('new equal score rank',  () => {
        const equalRecord = { score: '0', playerName: '', dateTime: '' };
        expect(findRank(equalRecord, sortedRanks)).toEqual(2);
    })

    test('new mid score rank',  () => {
        const midRecord = { score: '-1', playerName: '', dateTime: '' };
        expect(findRank(midRecord, sortedRanks)).toEqual(3);

    })

    test('new low score rank',  () => {
        const lowRecord = { score: '-6', playerName: '', dateTime: '' };
        expect(findRank(lowRecord, sortedRanks)).toEqual(5);
    })
});

import { scoreType } from "../components/Scoreboard";

export default function findRank(currentRecord: scoreType, records: scoreType[]): number {
    for (let i = 0; i< records.length; i++) {
        if (Number(records[i]?.score) <= Number(currentRecord?.score)) {
            return i;
        }
    }
    return records.length + 1;
}

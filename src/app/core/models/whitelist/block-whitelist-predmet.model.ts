import { WhitelistStagStudentModel } from "./whitelist-stag-student.model";
import { BlockWhitelistPredmetRozvrhoveAkceModel } from "./block-whitelist-predmet-rozvrhove-akce.model";

export class BlockWhitelistPredmetModel {
    zkrPredm: string;
    year: string;
    department: string;
    term: string;
    predmetNazev: string;
    label: string;

    students: WhitelistStagStudentModel[];
    rozvrhoveAkce: BlockWhitelistPredmetRozvrhoveAkceModel[];
}

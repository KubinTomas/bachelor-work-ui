import { BlockWhitelistPredmetModel } from "./block-whitelist-predmet.model";
import { WhitelistStagStudentModel } from "./whitelist-stag-student.model";

export class BlockWhitelistModel {
    predmety: BlockWhitelistPredmetModel[];
    selectedStudents: WhitelistStagStudentModel[];
}

import { WhitelistRozvrhovaAkceModel } from "./whitelist-rozvrhova-akce.model";
import { WhitelistStagStudentModel } from "./whitelist-stag-student.model";

export class BlockWhitelistPredmetRozvrhoveAkceModel {
    students: WhitelistStagStudentModel[];
    rozvrhovaAkce: WhitelistRozvrhovaAkceModel;
}

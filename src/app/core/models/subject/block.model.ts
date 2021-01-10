import { BlockRestrictionModel } from "./block-restriction.model";
import { SubjectInYearTermModel } from "./subject-in-year-term.model";

export class BlockModel {
    id: number;
    subjectInYearId: number;
    subjectId: number;
    termId: number;
    name: string;
    ucitelName: string;
    whitelistUserCount: number;

    blockRestriction: BlockRestrictionModel;
    term: SubjectInYearTermModel;

    /**
     *
     */
    constructor() {
        this.blockRestriction = new BlockRestrictionModel();
    }
}

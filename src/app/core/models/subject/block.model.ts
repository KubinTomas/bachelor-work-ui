import { BlockRestrictionModel } from "./block-restriction.model";

export class BlockModel {
    id: number;
    subjectInYearId: number;
    subjectId: number;
    termId: number;
    name: string;
    ucitelName: string;
    whitelistUserCount: number;

    blockRestriction: BlockRestrictionModel;

    /**
     *
     */
    constructor() {
        this.blockRestriction = new BlockRestrictionModel();
    }
}

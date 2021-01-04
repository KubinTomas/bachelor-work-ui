export class BlockWhitelistSaveModel {
    blockId: number;
    studentsOsCislo: string[];

    constructor(blockId: number, studentsOsCislo: string[]) {
      this.blockId = blockId;
      this.studentsOsCislo = studentsOsCislo;
    }
}

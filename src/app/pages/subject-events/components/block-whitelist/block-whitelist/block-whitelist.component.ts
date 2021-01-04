import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferChange, TransferItem, TransferSelectChange } from 'ng-zorro-antd/transfer';
import { BlockModel } from 'src/app/core/models/subject/block.model';
import { BlockWhitelistModel } from 'src/app/core/models/whitelist/block-whitelist.model';
import { WhitelistStagStudentModel } from 'src/app/core/models/whitelist/whitelist-stag-student.model';
import { BlockService } from 'src/app/core/services/subject/block.service';
import { UtilsTermService } from 'src/app/core/services/utils/term.service';

@Component({
  selector: 'app-block-whitelist',
  templateUrl: './block-whitelist.component.html',
  styleUrls: ['./block-whitelist.component.scss']
})
export class BlockWhitelistComponent implements OnInit {

  block: BlockModel;
  whitelist: BlockWhitelistModel;
  loaded = true;

  list: TransferItem[] = [];

  roAkceStudents: Array<WhitelistStagStudentModel[]>;

  studentsToAssign: WhitelistStagStudentModel[] = [];
  studentsWithPermission: string[] = [];

  constructor(
    private location: Location,
    private router: Router,
    private blockService: BlockService,
    private route: ActivatedRoute,
    private utilTermService: UtilsTermService
  ) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      const blockId = Number(params.blockId);

      if (blockId) {
        this.getBlock(blockId);
      }

    });
  }

  onRozvrhoveAkceFilterChange(): void {
    const assignStudents = this.studentsToAssign.filter(c => c.direction === 'right').sort((s1, s2) => s1.prijmeni > s2.prijmeni ? 1 : -1);

    this.studentsToAssign = [...assignStudents];

    this.roAkceStudents.forEach(ras => {
      ras.forEach(s => {
        const studentInArray = this.studentsToAssign.find(c => c.osCislo === s.osCislo);

        if (!studentInArray) {
          s.title = s.osCislo;
          s.checked = false;
          s.direction = 'left';
          this.studentsToAssign.push(s);
        }

      });
    });

    this.studentsToAssign.forEach(s => {
      s.key = s.osCislo.toLocaleLowerCase();
    });

    this.studentsToAssign.sort((s1, s2) => s1.prijmeni > s2.prijmeni ? 1 : -1);

    this.filterStudentsToAssign();
  }

  filterOption(inputValue: string, item: WhitelistStagStudentModel): boolean {
    inputValue = inputValue.toLocaleLowerCase();

    return (item.osCislo.toLocaleLowerCase().indexOf(inputValue) !== -1) ||
      (item.jmeno.toLocaleLowerCase().indexOf(inputValue) !== -1) ||
      (item.prijmeni.toLocaleLowerCase().indexOf(inputValue) !== -1) ||
      ((item.jmeno + item.prijmeni).toLocaleLowerCase().indexOf(inputValue.replace(/ /g, '')) !== -1);
    // return item.description.indexOf(inputValue) > -1;
  }

  filterStudentsToAssign(): void {
    const left = this.studentsToAssign.filter(c => c.direction === 'left').sort((s1, s2) => s1.prijmeni > s2.prijmeni ? 1 : -1);
    const right = this.studentsToAssign.filter(c => c.direction === 'right').sort((s1, s2) => s1.prijmeni > s2.prijmeni ? 1 : -1);

    this.studentsToAssign = [...left, ...right];
  }

  change(ret: TransferChange): void {
    const listKeys = ret.list.map(l => l.key);
    const hasOwnKey = (e: TransferItem) => e.hasOwnProperty('key');

    this.list = this.list.map(e => {
      if (listKeys.includes(e.key) && hasOwnKey(e)) {
        if (ret.to === 'left') {
          delete e.hide;
        } else if (ret.to === 'right') {
          e.hide = false;
        }
      }
      return e;
    });

    this.filterStudentsToAssign();
    // this.studentsToAssign = [];
  }

  select(ret: TransferSelectChange): void {

  }


  getBlock(blockId: number): void {
    this.blockService.getSingle(blockId).subscribe(res => {
      this.block = res;
      this.getWhitelist(blockId);
    });
  }

  getWhitelist(blockId: number): void {
    this.blockService.getWhitelist(blockId).subscribe(res => {

      this.whitelist = res;

      this.whitelist.predmety.forEach(c => {
        c.term = this.utilTermService.getDisplayTermValueFromStagValue(c.term);
      });
      console.log(this.whitelist);
    });
  }

  save(): void {

  }

  back(): void {
    const navState: any = this.location.getState();

    if (navState.navigationId === 1) {
      this.router.navigateByUrl('admin/term/detail/' + this.block.termId);
    } else {
      this.location.back();
    }
  }

}

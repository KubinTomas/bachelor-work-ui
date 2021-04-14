import { Component, Input, OnInit } from '@angular/core';
import { StudentBlockModel } from 'src/app/core/models/student/student-block.model';
import { BlockService } from 'src/app/core/services/subject/block.service';

@Component({
  selector: 'app-block-assigned-students-table',
  templateUrl: './block-assigned-students-table.component.html',
  styleUrls: ['./block-assigned-students-table.component.scss']
})
export class BlockAssignedStudentsTableComponent implements OnInit {

  @Input() blockId: number;
  @Input() dataLoading: boolean;
  @Input() students: StudentBlockModel[];

  listOfStudentBlocks: StudentBlockModel[];


  listOfColumn = [
    {
      title: '',
      width: '25'
    },
    {
      title: 'Číslo',
      compare: (a: StudentBlockModel, b: StudentBlockModel) => a.studentOsCislo.localeCompare(b.studentOsCislo),
      priority: 1,
      width: '150'
    },
    {
      title: 'Jméno',
      compare: (a: StudentBlockModel, b: StudentBlockModel) => a.name.localeCompare(b.name),
      priority: 2,
      width: '250'

    },
    {
      title: 'Ročník',
      compare: (a: StudentBlockModel, b: StudentBlockModel) => a.rocnik.localeCompare(b.rocnik),
      priority: 4,
      width: '50'
    },
    {
      title: 'Fakulta',
      compare: (a: StudentBlockModel, b: StudentBlockModel) => a.fakultaSp.localeCompare(b.fakultaSp),
      priority: 5,
      width: '50'
    },
    {
      title: 'Forma',
      compare: (a: StudentBlockModel, b: StudentBlockModel) => a.formaSp.localeCompare(b.formaSp),
      priority: 6,
      width: '50'
    },
    {
      title: 'Docházka',
      compare: (a: StudentBlockModel, b: StudentBlockModel) => a.attendanceFulfillCount - b.attendanceFulfillCount,
      priority: 7,
      width: '50'
    },
    {
      title: 'Splněno',
      compare: (a: StudentBlockModel, b: StudentBlockModel) => (a.attendanceFulfillCount >= a.blockAttendanceCount) == false,
      priority: 8,
      width: '50'
    },

  ];



  constructor(private blockService: BlockService) { }

  ngOnInit(): void {
  }

  onSearchChange(value: string): void {

    if (!this.listOfStudentBlocks) {
      this.listOfStudentBlocks = [...this.students];
    }

    if (!value) {
      this.students = [...this.listOfStudentBlocks];
      return;
    }

    this.students = this.listOfStudentBlocks.filter(c => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      || c.studentOsCislo.toLowerCase().indexOf(value.toLowerCase()) > -1
      || c.rocnik.toLowerCase().indexOf(value.toLowerCase()) > -1
      || c.fakultaSp.toLowerCase().indexOf(value.toLowerCase()) > -1
      || c.formaSp.toLowerCase().indexOf(value.toLowerCase()) > -1
      || (value == 'splnil' && c.attendanceFulfillCount >= c.blockAttendanceCount)
      || (value == 'nesplnil' && c.attendanceFulfillCount < c.blockAttendanceCount)
    );
  }

  onDownloadExcel(): void {
    this.blockService.downloadBlockStudentsExcelViaUrl(this.blockId);
  }
}

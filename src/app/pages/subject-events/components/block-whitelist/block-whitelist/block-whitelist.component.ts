import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferChange, TransferItem, TransferSelectChange } from 'ng-zorro-antd/transfer';
import { BlockModel } from 'src/app/core/models/subject/block.model';
import { BlockService } from 'src/app/core/services/subject/block.service';

@Component({
  selector: 'app-block-whitelist',
  templateUrl: './block-whitelist.component.html',
  styleUrls: ['./block-whitelist.component.scss']
})
export class BlockWhitelistComponent implements OnInit {

  block: BlockModel;
  loaded = true;

  list: TransferItem[] = [];

  selectedRoAkce: string;

  constructor(
    private location: Location,
    private router: Router,
    private blockService: BlockService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      const blockId = Number(params.blockId);

      if (blockId) {
        this.getBlock(blockId);
      }

    });
    this.createDemoData();
  }

  createDemoData(): void {
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: false,
        tag: ['cat', 'dog', 'bird'][i % 3],
        checked: false
      });
    }

    [2, 3].forEach(idx => (this.list[idx].direction = 'right'));
  }

  change(ret: TransferChange): void {
    console.log('nzChange', ret);
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
  }

  select(ret: TransferSelectChange): void {
    console.log('nzSelectChange', ret);
  }


  getBlock(blockId: number): void {
    this.blockService.getSingle(blockId).subscribe(res => {
      this.block = res;
      this.getWhitelist(blockId);
    });
  }

  getWhitelist(blockId: number): void {
    this.blockService.getWhitelist(blockId).subscribe(res => {
      console.log(res);

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

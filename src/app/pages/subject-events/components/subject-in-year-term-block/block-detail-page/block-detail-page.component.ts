import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockActionModel } from 'src/app/core/models/subject/block-action.model';
import { BlockModel } from 'src/app/core/models/subject/block.model';
import { ActionService } from 'src/app/core/services/subject/action.service';
import { BlockService } from 'src/app/core/services/subject/block.service';

@Component({
  selector: 'app-block-detail-page',
  templateUrl: './block-detail-page.component.html',
  styleUrls: ['./block-detail-page.component.scss']
})
export class BlockDetailPageComponent implements OnInit {

  block: BlockModel;

  actions: BlockActionModel[];
  actionsDataLoading = true;

  constructor(
    private route: ActivatedRoute,
    private blockService: BlockService,
    private actionService: ActionService,
    private location: Location,
    private router: Router
  ) {

    this.route.params.subscribe(params => {

      const blockId = Number(params.blockId);

      if (blockId) {
        this.getBlock(blockId);
      }

    });
  }

  ngOnInit(): void {
  }

  submitForm(): void {

  }

  getBlock(blockId: number): void {
    this.blockService.getSingle(blockId).subscribe(res => {
      this.block = res;
      this.getActions(blockId);
    });
  }

  getActions(blockId: number): void {
    this.actionService.get(blockId).subscribe(res => {
      this.actions = res;
      this.actionsDataLoading = false;
    });
  }

}

import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from './../../services/utils/utils.service';
import { ReferenceService } from './../../services/general/reference.service';
import { LayoutService } from './../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-m030103-manage-sholarships-announcement',
  templateUrl: './m030103-manage-sholarships-announcement.component.html',
  styleUrls: ['./m030103-manage-sholarships-announcement.component.css']
})
export class M030103ManageSholarshipsAnnouncementComponent implements OnInit {

  constructor(private layoutService: LayoutService,
    private referenceService: ReferenceService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    public ngProgress: NgProgress) { }

  ngOnInit() {
    this.ngProgress.start();
    this.layoutService.setPageHeader('บันทึกข้อมูลการประกาศทุนการศึกษา');
  }

}

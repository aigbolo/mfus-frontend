import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from './../../services/utils/utils.service';
import { ReferenceService } from './../../services/general/reference.service';
import { LayoutService } from './../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';
import { RftSchool } from '../../models/rft-school';
import { RftMajor } from '../../models/rft-major';

@Component({
  selector: 'app-m030103-manage-sholarship-announcement',
  templateUrl: './m030103-manage-sholarship-announcement.component.html',
  styleUrls: ['./m030103-manage-sholarship-announcement.component.css']
})
export class M030103ManageSholarshipAnnouncementComponent implements OnInit {
  rftSchools: RftSchool[] = [];
  rftMajors: RftMajor[] = [];
  constructor(private layoutService: LayoutService,
    private referenceService: ReferenceService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    public ngProgress: NgProgress) { }

  ngOnInit() {
    this.ngProgress.start();
    this.layoutService.setPageHeader('บันทึกข้อมูลการประกาศทุนการศึกษา');
    this.referenceService.getSchools().subscribe(
      data =>{
        this.rftSchools = data;
        console.log(this.rftSchools);
      },
      err=>{
        console.log(err);
      }
    )
  }

}

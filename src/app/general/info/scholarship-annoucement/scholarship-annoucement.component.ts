import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/utils/layout.service';
import { Observable } from 'rxjs/Observable';
import { SmScholarshipAnnouncement } from '../../../models/sm-scholarship-announcement';
import { M030103ScholarshipAnnouncementService } from '../../../services/officers/m030103-scholarship-announcement.service';
import { M030102ScholarshipService } from '../../../services/officers/m030102-scholarship.service';

@Component({
  selector: 'app-scholarship-annoucement',
  templateUrl: './scholarship-annoucement.component.html',
  styleUrls: ['./scholarship-annoucement.component.css']
})
export class ScholarshipAnnoucementComponent implements OnInit {

  public scholarships:any[];

  constructor(
    private layout: LayoutService,
    private scholarshipService: M030102ScholarshipService,
  ) {
    this.layout.setPageHeader("ประกาศทุนการศึกษา");
  }

  ngOnInit() {
    const criteria = {announce_date:new Date()};
    this.scholarshipService.getAnnouncement(criteria).subscribe(
      data=>{
        this.scholarships = data;
        console.log(data);
      },
      err=>{
        console.log(err)
      }
    )
  }
}

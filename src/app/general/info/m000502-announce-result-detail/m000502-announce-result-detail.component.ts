import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../services/utils/layout.service';
import { NgProgress } from 'ngx-progressbar';
import { M030102ScholarshipService } from '../../../services/officers/m030102-scholarship.service';
import { SmScholarshipAnnouncement } from '../../../models/sm-scholarship-announcement';
import { SmSchoalrshipAnnouncementIntervieweeDetail } from '../../../models/sm-scholarship-announcement-interviewee-detail';

@Component({
  selector: 'app-m000502-announce-result-detail',
  templateUrl: './m000502-announce-result-detail.component.html',
  styleUrls: ['./m000502-announce-result-detail.component.css']
})
export class M000502AnnounceResultDetailComponent implements OnInit {

  public smSchoalrshipAnnouncementIntervieweeDetail:SmSchoalrshipAnnouncementIntervieweeDetail[] = [];
  public smScholarshipAnnouncement: SmScholarshipAnnouncement = new SmScholarshipAnnouncement();
  constructor(
    private scholarshipService: M030102ScholarshipService,
    private route: ActivatedRoute,
    private layoutService: LayoutService,
    private ngProgress: NgProgress
  ) { }

  ngOnInit() {
    this.layoutService.setPageHeader('รายละเอียดผู้ที่ได้รับทุนการศึกษา')
    this.initialAnncIntvDetail(this.route.snapshot.params["id"]);
  }


  initialAnncIntvDetail(ref){
    const criteria = {announcement_ref:ref,earn_flag:'2'}
    console.log(criteria);
    this.scholarshipService.getAnnouncement({announcement_ref:ref}).subscribe(
      data => {
        this.smScholarshipAnnouncement = data;
      }
    )
    this.scholarshipService.getAnnouncementDetail(criteria).subscribe(
      detail=>{
        this.smSchoalrshipAnnouncementIntervieweeDetail = detail;
      }, error=>{
        console.log(error);
      }, ()=>{
        this.ngProgress.done();
      }
    )
  }
  ngOnDestroy(){
    this.ngProgress.done();
  }
}

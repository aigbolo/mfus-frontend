
import { NgProgress } from 'ngx-progressbar';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SmSchoalrshipAnnouncementIntervieweeDetail } from '../../../models/sm-scholarship-announcement-interviewee-detail';
import { SmScholarshipAnnouncement } from '../../../models/sm-scholarship-announcement';
import { M030102ScholarshipService } from '../../../services/officers/m030102-scholarship.service';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../services/utils/layout.service';

@Component({
  selector: 'app-m000402-announcement-interviewee-detail',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m000402-announcement-interviewee-detail.component.html',
  styleUrls: ['./m000402-announcement-interviewee-detail.component.css']
})
export class M000402AnnouncementIntervieweeDetailComponent implements OnInit {

  public smSchoalrshipAnnouncementIntervieweeDetail:SmSchoalrshipAnnouncementIntervieweeDetail[] = [];
  public smScholarshipAnnouncement: SmScholarshipAnnouncement = new SmScholarshipAnnouncement();
  constructor(
    private scholarshipService: M030102ScholarshipService,
    private route: ActivatedRoute,
    private layoutService: LayoutService,
    private ngProgress: NgProgress
  ) { }

  ngOnInit() {
    this.layoutService.setPageHeader('รายละเอียดผู้มีสิทธิ์สัมภาษณ์')
    this.initialAnncIntvDetail(this.route.snapshot.params["id"]);
  }


  initialAnncIntvDetail(ref){
    this.scholarshipService.searchScholarshipAnnouncementById(ref).subscribe(
      scholarAnnounce=>{
        this.smScholarshipAnnouncement = scholarAnnounce;
      }, error=>{
        console.log(error)
      }, ()=>{
        this.scholarshipService.getIntervieweeAnnouncementDetail(ref).subscribe(
          detail=>{
            this.smSchoalrshipAnnouncementIntervieweeDetail = detail;
          }, error=>{
            console.log(error);
          }, ()=>{
            this.ngProgress.done();
          }
        )
      }
    )

  }
}

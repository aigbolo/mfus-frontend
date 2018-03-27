
import { NgProgress } from 'ngx-progressbar';
import { Component, OnInit } from '@angular/core';
import { SmSchoalrshipAnnouncementIntervieweeDetail } from '../../../models/sm-scholarship-announcement-interviewee-detail';
import { SmScholarshipAnnouncement } from '../../../models/sm-scholarship-announcement';
import { M030102ScholarshipService } from '../../../services/officers/m030102-scholarship.service';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../services/utils/layout.service';

@Component({
  selector: 'app-m000402-announcement-interwivwee-detail',
  templateUrl: './m000402-announcement-interwivwee-detail.component.html',
  styleUrls: ['./m000402-announcement-interwivwee-detail.component.css']
})
export class M000402AnnouncementInterwivweeDetailComponent implements OnInit {

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

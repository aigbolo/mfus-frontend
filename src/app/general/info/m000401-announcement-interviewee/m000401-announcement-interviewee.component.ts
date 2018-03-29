
import { Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { ViewEncapsulation, OnInit, Component } from '@angular/core';
import { M030102ScholarshipService } from '../../../services/officers/m030102-scholarship.service';
import { LayoutService } from '../../../services/utils/layout.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { SmScholarshipAnnouncement } from '../../../models/sm-scholarship-announcement';

@Component({
  selector: 'app-m000401-announcement-interviewee',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m000401-announcement-interviewee.component.html',
  styleUrls: ['./m000401-announcement-interviewee.component.css']
})
export class M000401AnnouncementIntervieweeComponent implements OnInit {

  public scholarshipList: SmScholarshipAnnouncement[] = [];

  constructor(
    private scholarshipService: M030102ScholarshipService,
    private layoutService: LayoutService,
    private utilsService: UtilsService,
    private route: Router,
    public ngProgress: NgProgress
  ) { }

  ngOnInit() {
    this.initialData();
    this.getIntervieweeAnnouncement();
  }

  initialData() {
    this.layoutService.setPageHeader('ประกาศรายชื่อผู้มีสิทธิ์สัมภาษณ์');
  }

  getIntervieweeAnnouncement() {
    const criteria = {announce_interview_date:new Date()};
    this.scholarshipService.getAnnouncement(criteria).subscribe(
      intveeAnc => {
        this.scholarshipList = intveeAnc;
      }
    )
  }

  onSelect(announcement_ref) {
    this.ngProgress.start();
    this.utilsService.goToPageWithParam('interviewees-announcement-detail/', announcement_ref);
  }
}

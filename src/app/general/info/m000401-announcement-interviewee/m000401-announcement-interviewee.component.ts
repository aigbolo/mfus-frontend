
import { Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { ViewEncapsulation, OnInit, Component } from '@angular/core';
import { SmScholarship } from '../../../models/sm-scholarship';
import { M030102ScholarshipService } from '../../../services/officers/m030102-scholarship.service';
import { LayoutService } from '../../../services/utils/layout.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-m000401-announcement-interviewee',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m000401-announcement-interviewee.component.html',
  styleUrls: ['./m000401-announcement-interviewee.component.css']
})
export class M000401AnnouncementIntervieweeComponent implements OnInit {

  public scholarshipList: SmScholarship[] = [];

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
    this.scholarshipService.getIntervieweeAnnouncement().subscribe(
      intveeAnc => {
        this.scholarshipList = intveeAnc;
      }
    )
  }

  onSelect(scholarship) {
    this.ngProgress.start();
    this.utilsService.goToPageWithParam('interviewee-announcement-detail/', scholarship.announcement_ref);
  }

  convertDateTodisplay(date) {
    let annc_date = date.split('-');
    return (annc_date[2] + '/' + annc_date[1] + '/' + annc_date[0]);
  }
}

import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/utils/layout.service';
import { Observable } from 'rxjs/Observable';
import { SmScholarshipAnnouncement } from '../../../models/sm-scholarship-announcement';
import { M030103ScholarshipAnnouncementService } from '../../../services/officers/m030103-scholarship-announcement.service';

@Component({
  selector: 'app-scholarship-annoucement',
  templateUrl: './scholarship-annoucement.component.html',
  styleUrls: ['./scholarship-annoucement.component.css']
})
export class ScholarshipAnnoucementComponent implements OnInit {

  public scholarships = new Observable<SmScholarshipAnnouncement>();

  constructor(
    private layout: LayoutService,
    private scholarshipacService: M030103ScholarshipAnnouncementService
  ) {
    this.layout.setPageHeader("ประกาศทุนการศึกษา");
  }

  ngOnInit() {
    this.scholarships = this.scholarshipacService.getScholarshipAnnouncementList({ "search_type": 1 }).map((data) => data.reverse())
  }
}

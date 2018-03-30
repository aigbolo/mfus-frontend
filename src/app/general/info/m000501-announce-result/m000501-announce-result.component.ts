import { Component, OnInit } from '@angular/core';
import { M030102ScholarshipService } from '../../../services/officers/m030102-scholarship.service';
import { LayoutService } from '../../../services/utils/layout.service';
import { SmScholarshipAnnouncement } from '../../../models/sm-scholarship-announcement';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-m000501-announce-result',
  templateUrl: './m000501-announce-result.component.html',
  styleUrls: ['./m000501-announce-result.component.css']
})
export class M000501AnnounceResultComponent implements OnInit {
  public scholarshipList: SmScholarshipAnnouncement[] = [];

  constructor(
    private scholarshipService: M030102ScholarshipService,
    private layoutService: LayoutService,
    private utilsService: UtilsService,
  ) { }

  ngOnInit() {
    this.layoutService.setPageHeader('ประกาศรายชื่อผู้ที่ได้รับทุนการศึกษา');
    this.getResultAnnouncement();
  }

  getResultAnnouncement() {
    const criteria = {announce_result_date:new Date()};
    this.scholarshipService.getAnnouncement(criteria).subscribe(
      data => {
        this.scholarshipList = data;
      }
    )
  }

  onSelect(announcement_ref) {
    this.utilsService.goToPageWithParam('result-announcement-detail/', announcement_ref);
  }

}

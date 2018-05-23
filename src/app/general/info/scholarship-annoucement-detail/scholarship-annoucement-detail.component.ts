import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/utils/layout.service';
import { ActivatedRoute } from '@angular/router';
import { M030103ScholarshipAnnouncementService } from '../../../services/officers/m030103-scholarship-announcement.service';

@Component({
  selector: 'app-scholarship-annoucement-detail',
  templateUrl: './scholarship-annoucement-detail.component.html',
  styleUrls: ['./scholarship-annoucement-detail.component.css']
})
export class ScholarshipAnnoucementDetailComponent implements OnInit {
  rendered = false;
  private criteria:any;
  public scholarshipAnnouncement:any;
  constructor(
    private layout: LayoutService,
    private activatedRoute: ActivatedRoute,
    private announcementService: M030103ScholarshipAnnouncementService,
  ) {

  }


  ngOnInit() {
    this.layout.setPageHeader("รายละเอียดประกาศทุนการศึกษา");
    if (this.activatedRoute.snapshot.params["id"] != null) {
      this.criteria = {announcement_ref:this.activatedRoute.snapshot.params["id"]};
    }
    console.log(this.criteria);
    this.announcementService.viewScholarshipAnnouncement(this.criteria).subscribe(
      data=>{
        console.log(data);
        this.scholarshipAnnouncement = data[0];
        this.rendered = true;
      },err=>{
        console.log(err);
      }
    )

  }
}

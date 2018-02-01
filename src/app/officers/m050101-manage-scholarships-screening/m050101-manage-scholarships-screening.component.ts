import { NgProgress } from 'ngx-progressbar';
import { M050101ScholarshipsScreeningService } from './../../services/officers/m050101-scholarships-screening.service';
import { ReferenceService } from './../../services/general/reference.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from './../../services/utils/utils.service';
import { LayoutService } from './../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-m050101-manage-scholarships-screening',
  templateUrl: './m050101-manage-scholarships-screening.component.html',
  styleUrls: ['./m050101-manage-scholarships-screening.component.css']
})
export class M050101ManageScholarshipsScreeningComponent implements OnInit {
  pageRender = false;
  constructor(private layoutService: LayoutService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private referenceService: ReferenceService,
    private scholarshipScreeningService: M050101ScholarshipsScreeningService,
    public ngProgress: NgProgress) {
      this.route.params.subscribe( params => console.log(params) );
     }

  ngOnInit() {
    this.layoutService.setPageHeader("บันทึกคัดกรองเอกสาร");
    if (this.route.snapshot.params["id"] != null) {
      // this.manageForm.sponsors.sponsors_ref = this.route.snapshot.params["id"];
      // this.onUpdatePageSetup();
    // } else {
    //   this.ngProgress.done();
    //   this.pageRender = true;
    }
  }

}

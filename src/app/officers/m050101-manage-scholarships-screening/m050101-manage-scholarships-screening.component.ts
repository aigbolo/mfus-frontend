import { SelectItem } from 'primeng/primeng';
import { CalendarModel } from './../../models/calendar-model';
import { ScholarshipScreeningForm } from './../../forms/scholarship-screening-form';
import { ApplicationService } from './../../services/students/application.service';
import { NgProgress } from 'ngx-progressbar';
import { M050101ScholarshipsScreeningService } from './../../services/officers/m050101-scholarships-screening.service';
import { ReferenceService } from './../../services/general/reference.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from './../../services/utils/utils.service';
import { LayoutService } from './../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';
import { RftApplicationDocument } from '../../models/rft-application-document';

@Component({
  selector: 'app-m050101-manage-scholarships-screening',
  templateUrl: './m050101-manage-scholarships-screening.component.html',
  styleUrls: ['./m050101-manage-scholarships-screening.component.css']
})
export class M050101ManageScholarshipsScreeningComponent extends CalendarModel implements OnInit {
  pageRender = false;
  manageForm: ScholarshipScreeningForm = new ScholarshipScreeningForm;

  applicationDocument: RftApplicationDocument[] = [];
  constructor(private layoutService: LayoutService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private referenceService: ReferenceService,
    private scholarshipScreeningService: M050101ScholarshipsScreeningService,
    private applicationService: ApplicationService,
    public ngProgress: NgProgress) {
      super();
     }

  ngOnInit() {
    this.layoutService.setPageHeader("บันทึกคัดกรองเอกสาร");

    this.getApplicationDocument();



    let application_ref = this.route.snapshot.params["id"];
    if (this.route.snapshot.params["id"] != null) {
      this.applicationService.initialApApplicationView(application_ref).subscribe(
        data=>{
          console.log(data);
          this.manageForm.application = data;

        },
        err=>{
          console.log(err);
        },
        ()=>{
          this.applicationService.initialAcStudentView(this.manageForm.application.student_ref).subscribe(
            data=>{
              console.log(data);
              this.manageForm.student = data;

            },
            err=>{
              console.log(err);
            },
            ()=>{

            }
          )
        }
      )
      // this.manageForm.sponsors.sponsors_ref = this.route.snapshot.params["id"];
      // this.onUpdatePageSetup();
    // } else {
    //   this.ngProgress.done();
    //   this.pageRender = true;
    }
  }
getApplicationDocument(){
  let item = null;
  this.applicationDocument = [];
  this.referenceService.getApplicationDocument().subscribe(
    data =>{
      this.applicationDocument = data;
    },
    err=>{
      console.log(err);
    },
    ()=>{
      console.log(this.applicationDocument);
    }
  )
}


}

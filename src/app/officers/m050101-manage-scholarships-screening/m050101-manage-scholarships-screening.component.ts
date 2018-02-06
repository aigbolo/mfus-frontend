import { ApApplication } from './../../models/ap-application';
import { M040101ApplyScholarshipService } from './../../services/students/m040101-apply-scholarship.service';
import { AcUser } from './../../models/ac-user';
import { AuthenticationService } from './../../services/general/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RftApplicationDocument } from '../../models/rft-application-document';
import { SmDocumentRequestDetail } from '../../models/sm-document-request-detail';

@Component({
  selector: 'app-m050101-manage-scholarships-screening',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m050101-manage-scholarships-screening.component.html',
  styleUrls: ['./m050101-manage-scholarships-screening.component.css']
})
export class M050101ManageScholarshipsScreeningComponent extends CalendarModel implements OnInit {
  user: AcUser =  this.user = this.authService.getUser();
  pageRender = false;
  manageForm: ScholarshipScreeningForm = new ScholarshipScreeningForm;
  manageFormGroup: FormGroup;
  applicationDocument: RftApplicationDocument[] = [];

  documentRequestHistoryList:any[] = [];
  selectedDocuments: string[] = [];
  constructor(private layoutService: LayoutService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private referenceService: ReferenceService,
    private scholarshipScreeningService: M050101ScholarshipsScreeningService,
    private applicationService: ApplicationService,
    private authService: AuthenticationService,
    private applyScholarshipService: M040101ApplyScholarshipService,
    public ngProgress: NgProgress) {
      super();
     }

  ngOnInit() {
    this.layoutService.setPageHeader("บันทึกคัดกรองเอกสาร");

    this.documentRequestHistoryList = [];
    this.getApplicationDocument();

    this.validatorForm();

    let application_ref = this.route.snapshot.params["id"];
    if (this.route.snapshot.params["id"] != null) {
      this.applicationService.initialApApplicationView(application_ref).subscribe(
        data=>{
          console.log(data);
          if(data){
          this.manageForm.application = data;
          this.getDocumentRequestLatest(data.application_ref);
          this.getDocumentRequestDetailLatest(data.application_ref);
          this.getDocumentRequestHistory(data.application_ref);
          this.getStudentView(data.student_ref);
          this.getScholarshipAnnouncementView(data.announcement_ref);
          }
        },
        err=>{
          console.log(err);
        },
        ()=>{

        }

      )

    }
  }

  validatorForm() {
    this.manageFormGroup = new FormGroup({
      document_request: new FormControl(this.selectedDocuments),
      due_date: new FormControl(this.manageForm.sm_document_request.due_date,Validators.compose([Validators.required])),
      message: new FormControl(this.manageForm.sm_document_request.message, Validators.compose([Validators.required])),
        });
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

getStudentView(studentRef:string){
  this.applicationService.initialAcStudentView(studentRef).subscribe(
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

getScholarshipAnnouncementView(announcementRef:string){
  this.applicationService.initialScholarshipAnnouncement(announcementRef).subscribe(
    data=>{
      console.log(data);
      this.manageForm.scholarshipAnnouncement = data;

    },
    err=>{
      console.log(err);
    },
    ()=>{

    }
  )
}

getDocumentRequestHistory(application_ref:string){
  this.applicationService.initialDocumentRequestView(application_ref).subscribe(
    data=>{

      this.documentRequestHistoryList = data;
      console.log(this.documentRequestHistoryList);
    },err=>{
      console.log(err);
    }
  )
}


getDocumentRequestLatest(application_ref:string){
  this.scholarshipScreeningService.getDocumentRequestLatest(application_ref).subscribe(
    data=>{
      console.log(data);
      if(data)
        this.manageForm.sm_document_request = data;
    },err=>{console.log(err)}
  );
}

getDocumentRequestDetailLatest(application_ref:string){
  this.scholarshipScreeningService.getDocumentRequestDetailLatest(application_ref).subscribe(
    data=>{
      console.log(data);
      if(data)
        this.manageForm.detail_list = data;
    },err=>{console.log(err)},
    ()=>{
      this.selectedDocuments = [];
      for(let data of this.manageForm.detail_list){
        this.selectedDocuments.push(data.document_ref);
      }
    }
  );
}

onSelectDocuments(){
  this.manageForm.detail_list = [];
  for (let data of this.selectedDocuments){
    let detail = new SmDocumentRequestDetail;
    detail.document_ref = data;
    detail.create_user = this.user.account_ref;
    detail.update_user = this.user.account_ref;

    this.manageForm.detail_list.push(detail);
  }
}

onSubmit(){
  this.manageForm.sm_document_request.application_ref = this.manageForm.application.application_ref;
  this.manageForm.sm_document_request.reply_flag = '1';
  this.manageForm.sm_document_request.create_user = this.user.account_ref;
  this.manageForm.sm_document_request.update_user = this.user.account_ref;
  if (this.manageFormGroup.invalid) {
    this.utilsService.findInvalidControls(this.manageFormGroup);
  } else {
    this.scholarshipScreeningService.doRequestDocument(this.manageForm)
    .subscribe(
      data=>{

      },err=>{
        console.log(err);
      },
      ()=>{
        let application: ApApplication = new ApApplication;
        application.document_screening_flag = '2';
        application.application_ref = this.manageForm.application.application_ref;
        application.update_user = this.user.account_ref;
        this.applyScholarshipService.updateApplication(application).subscribe(
          ()=>{

          },err=>{
            console.log(err);
          }
        )
      }
    );
  }
}
onChecked(){
  let application: ApApplication = new ApApplication;
  application.document_screening_flag = '3';
  application.application_ref = this.manageForm.application.application_ref;
  application.update_user = this.user.account_ref;
  this.applyScholarshipService.updateApplication(application).subscribe(
    ()=>{

    },err=>{
      console.log(err);
    }
  )
}
}

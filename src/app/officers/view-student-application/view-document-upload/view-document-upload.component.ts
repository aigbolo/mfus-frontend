import { Component, OnInit } from '@angular/core';
import { ViewStudentApplicationComponent } from '../view-student-application.component';
import { ApplicationService } from '../../../services/students/application.service';

@Component({
  selector: 'app-view-document-upload',
  templateUrl: './view-document-upload.component.html',
  styleUrls: ['./view-document-upload.component.css']
})
export class ViewDocumentUploadComponent implements OnInit {

  constructor(public applicationView: ViewStudentApplicationComponent,
              public applicationService: ApplicationService) { }

  ngOnInit() {
  }

  // initialDocumentUploadView(){
  //   this.applicationService.initialDocumentUploadView(this.applicationView.applyScholarshipViewForm.apApplication.application_ref).subscribe(
  //     data=>{
  //       console.log(data)
  //     }
  //   )
  // }
}

import { NgProgress } from 'ngx-progressbar';
import { Component, OnInit } from '@angular/core';
import { ViewStudentApplicationComponent } from '../view-student-application.component';
import { ApplicationService } from '../../../services/students/application.service';

@Component({
  selector: 'app-view-document-upload',
  templateUrl: './view-document-upload.component.html',
  styleUrls: ['./view-document-upload.component.css']
})
export class ViewDocumentUploadComponent implements OnInit {

  pageRender: boolean = false;
  document_display: boolean = false;
  document_selected: any = {
    docname: "",
    document_image: "",
    document_name: "",
    document_type: "",
  };

  constructor(public applicationView: ViewStudentApplicationComponent,
    public applicationService: ApplicationService,
    private ngProgress: NgProgress) { }

  ngOnInit() {
    this.ngProgress.start();
    this.initialDocumentUploadView();
  }

  initialDocumentUploadView() {
    this.applicationService.initialDocumentUploadView(this.applicationView.applyScholarshipViewForm.apApplication.application_ref).subscribe(
      data => {
        console.log(data);
        // this.applicationView.applyScholarshipViewForm.documentList = data;
      }, error=>{

      }, ()=>{
        this.pageRender= true;
        this.ngProgress.done();
      }
    )
  }

  onSelect(document){
    this.document_selected = document;
    console.log( this.document_selected)
    this.document_display = true;
  }
}

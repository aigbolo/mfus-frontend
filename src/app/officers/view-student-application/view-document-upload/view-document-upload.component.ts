
import { Component, OnInit, Input } from '@angular/core';
import { ApplyScholarshipForm } from '../../../forms/apply-scholarship-form';

@Component({
  selector: 'app-view-document-upload',
  templateUrl: './view-document-upload.component.html',
  styleUrls: ['./view-document-upload.component.css']
})
export class ViewDocumentUploadComponent implements OnInit {

  display = false;
  documentName:string="";
  image:string="";
  @Input() childForm: ApplyScholarshipForm;

  constructor(
    ) { }

  ngOnInit() {

  }

  viewDocument(documentName,image){
    this.documentName = documentName;
    this.image = image;
    this.display = true;
  }

  closeDocument(){
    this.display = false;
  }
}

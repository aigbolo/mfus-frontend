import { NgProgress } from 'ngx-progressbar';
import { Component, OnInit, Input } from '@angular/core';
import { ApplicationService } from '../../../services/students/application.service';
import { ApplyScholarshipForm } from '../../../forms/apply-scholarship-form';

@Component({
  selector: 'app-view-document-upload',
  templateUrl: './view-document-upload.component.html',
  styleUrls: ['./view-document-upload.component.css']
})
export class ViewDocumentUploadComponent implements OnInit {


  @Input() childForm: ApplyScholarshipForm;

  constructor(
    public applicationService: ApplicationService,
    private ngProgress: NgProgress) { }

  ngOnInit() {
    this.ngProgress.start();
  }
}

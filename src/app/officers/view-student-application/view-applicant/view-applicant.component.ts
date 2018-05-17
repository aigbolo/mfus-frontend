import { NgProgress } from 'ngx-progressbar';
import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../../../services/utils/utils.service';
import { ReferenceService } from '../../../services/general/reference.service';
import { ApplyScholarshipForm } from '../../../forms/apply-scholarship-form';

@Component({
  selector: 'app-view-applicant',
  templateUrl: './view-applicant.component.html',
  styleUrls: ['./view-applicant.component.css']
})
export class ViewApplicantComponent implements OnInit {
  @Input() childForm: ApplyScholarshipForm;
  constructor(public utilsService: UtilsService,
    private referenceService: ReferenceService,
    private ngprogress: NgProgress) { }

  ngOnInit() {
  }


  onNext() {
  }


}

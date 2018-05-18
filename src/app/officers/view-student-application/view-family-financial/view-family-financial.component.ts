import { Component, OnInit, Input } from '@angular/core';
import { ReferenceService } from '../../../services/general/reference.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { ApplicationService } from '../../../services/students/application.service';
import { ViewStudentApplicationComponent } from '../view-student-application.component';
import { NgProgress } from 'ngx-progressbar';
import { ApplyScholarshipForm } from '../../../forms/apply-scholarship-form';

@Component({
  selector: 'app-view-family-financial',
  templateUrl: './view-family-financial.component.html',
  styleUrls: ['./view-family-financial.component.css']
})
export class ViewFamilyFinancialComponent implements OnInit {


  @Input() childForm: ApplyScholarshipForm;
  constructor() { }

  ngOnInit() {
    
  }

  
}

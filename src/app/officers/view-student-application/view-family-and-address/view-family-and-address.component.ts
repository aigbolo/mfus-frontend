import { Component, OnInit, Input } from '@angular/core';
import { ReferenceService } from '../../../services/general/reference.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { ApplicationService } from '../../../services/students/application.service';
import { NgProgress } from 'ngx-progressbar';
import { ApplyScholarshipForm } from '../../../forms/apply-scholarship-form';

@Component({
  selector: 'app-view-family-and-address',
  templateUrl: './view-family-and-address.component.html',
  styleUrls: ['./view-family-and-address.component.css']
})
export class ViewFamilyAndAddressComponent implements OnInit {


  @Input() childForm: ApplyScholarshipForm;
  constructor(private referenceService: ReferenceService,
              private utilsService: UtilsService,
              private applicationService: ApplicationService,
              private ngProgress: NgProgress) { }

  ngOnInit() {
    this.ngProgress.start();
  }

  
}

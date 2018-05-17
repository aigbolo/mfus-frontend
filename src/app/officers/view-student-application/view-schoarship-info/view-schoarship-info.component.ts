import { Component, OnInit, Input } from '@angular/core';
import { ReferenceService } from '../../../services/general/reference.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { ApplyScholarshipForm } from '../../../forms/apply-scholarship-form';

@Component({
  selector: 'app-view-schoarship-info',
  templateUrl: './view-schoarship-info.component.html',
  styleUrls: ['./view-schoarship-info.component.css']
})
export class ViewSchoarshipInfoComponent implements OnInit {


  @Input() childForm: ApplyScholarshipForm;
  constructor(private referenceService: ReferenceService,
    private utilsService: UtilsService,) { }

  ngOnInit() {

  }

 
}

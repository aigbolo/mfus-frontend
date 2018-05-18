import { Component, OnInit, Input } from '@angular/core';
import { ApplyScholarshipForm } from '../../../forms/apply-scholarship-form';

@Component({
  selector: 'app-view-family-and-address',
  templateUrl: './view-family-and-address.component.html',
  styleUrls: ['./view-family-and-address.component.css']
})
export class ViewFamilyAndAddressComponent implements OnInit {


  @Input() childForm: ApplyScholarshipForm;
  constructor() { }

  ngOnInit() {
   
  }

  
}

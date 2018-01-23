import { ApplyScholarshipsComponent } from './../../apply-scholarships.component';
import { Component, OnInit } from '@angular/core';
import { M040104ManageFamilyAndAddressComponent } from '../m040104-manage-family-and-address.component';

@Component({
  selector: 'app-family-view',
  templateUrl: './family-view.component.html',
  styleUrls: ['./family-view.component.css']
})
export class FamilyViewComponent implements OnInit {

  constructor(public applyApplication: ApplyScholarshipsComponent,
              public manageFamilyAndAddress: M040104ManageFamilyAndAddressComponent) { }

  ngOnInit() {
    console.log(this.applyApplication.applyApplicationForm.acParent)
  }

}

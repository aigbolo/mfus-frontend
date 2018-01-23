import { ApplyScholarshipsComponent } from './../../apply-scholarships.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.css']
})
export class AddressViewComponent implements OnInit {

  constructor(public applyApplication: ApplyScholarshipsComponent,) { }

  ngOnInit() {
    console.log(this.applyApplication.applyApplicationForm.acAddress)
  }

}

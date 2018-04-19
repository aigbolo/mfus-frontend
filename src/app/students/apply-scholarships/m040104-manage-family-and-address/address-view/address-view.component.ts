import { ApplyScholarshipsComponent } from './../../apply-scholarships.component';
import { Component, OnInit, Input } from '@angular/core';
import { AcAddress } from '../../../../models/ac-address';

@Component({
  selector: 'app-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.css']
})
export class AddressViewComponent implements OnInit {
  acAddress:AcAddress = new AcAddress;
  @Input() address: AcAddress;
  constructor() { }

  ngOnInit() {
    console.log(this.address)
    Object.assign(this.acAddress,this.address);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { AcAddress } from '../../../../models/ac-address';

@Component({
  selector: 'app-view-address',
  templateUrl: './view-address.component.html',
  styleUrls: ['./view-address.component.css']
})
export class ViewAddressComponent implements OnInit {

  @Input() address: AcAddress;
  constructor() { }

  ngOnInit() {

  }

}

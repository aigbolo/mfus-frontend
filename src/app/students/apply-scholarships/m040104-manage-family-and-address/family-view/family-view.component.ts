import { ReferenceService } from './../../../../services/general/reference.service';
import { ApplyScholarshipsComponent } from './../../apply-scholarships.component';
import { Component, OnInit, Input } from '@angular/core';
import { M040104ManageFamilyAndAddressComponent } from '../m040104-manage-family-and-address.component';
import { AcParent } from '../../../../models/ac-parent';

@Component({
  selector: 'app-family-view',
  templateUrl: './family-view.component.html',
  styleUrls: ['./family-view.component.css']
})
export class FamilyViewComponent implements OnInit {
  acParent:AcParent = new AcParent;
  @Input() parent: AcParent;
  constructor() { }

  ngOnInit() {
    console.log(this.parent)
    Object.assign(this.acParent,this.parent)
    console.log(this.acParent)
  }

}

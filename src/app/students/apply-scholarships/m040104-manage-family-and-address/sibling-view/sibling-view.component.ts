import { ApplyScholarshipsComponent } from './../../apply-scholarships.component';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AcSibling } from '../../../../models/ac-sibling';

@Component({
  selector: 'app-sibling-view',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sibling-view.component.html',
  styleUrls: ['./sibling-view.component.css']
})
export class SiblingViewComponent implements OnInit {

  siblingList: AcSibling[] = [];
  @Input() siblings : AcSibling[];
  constructor(public applyApplication: ApplyScholarshipsComponent, ) { }

  ngOnInit() {
    console.log(this.siblings.length)
    if(this.siblings.length > 0){
      this.siblingList = [...this.siblings]
    }

  }

  setEducationLevel(ref: string){
    for(let obj of this.applyApplication.applyApplicationForm.educationLevelList){
      if(ref == obj.education_ref){
        return obj.education_name_t
      }
    }
  }
}

import { ApplyScholarshipsComponent } from './../../apply-scholarships.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sibling-view',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sibling-view.component.html',
  styleUrls: ['./sibling-view.component.css']
})
export class SiblingViewComponent implements OnInit {

  constructor(public applyApplication: ApplyScholarshipsComponent, ) { }

  ngOnInit() {
  }

  setEducationLevel(ref: string){
    for(let obj of this.applyApplication.applyApplicationForm.educationLevelList){
      if(ref == obj.education_ref){
        return obj.education_name_t
      }
    }
  }
}

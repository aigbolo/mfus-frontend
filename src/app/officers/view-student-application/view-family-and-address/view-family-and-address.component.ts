import { Component, OnInit } from '@angular/core';
import { ReferenceService } from '../../../services/general/reference.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { ApplicationService } from '../../../services/students/application.service';
import { ViewStudentApplicationComponent } from '../view-student-application.component';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-view-family-and-address',
  templateUrl: './view-family-and-address.component.html',
  styleUrls: ['./view-family-and-address.component.css']
})
export class ViewFamilyAndAddressComponent implements OnInit {

  pageRender: boolean = false
  constructor(private referenceService: ReferenceService,
              private utilsService: UtilsService,
              private applicationService: ApplicationService,
              public applicationView:ViewStudentApplicationComponent,
              private ngProgress: NgProgress) { }

  ngOnInit() {
    this.ngProgress.start();
    this.initialFamilyAndAddress();
  }

  initialParentView(){
    this.applicationService.initialParentView(this.applicationView.applyScholarshipViewForm.acStudent.student_ref).subscribe(
      data=>{
        this.applicationView.applyScholarshipViewForm.acParent = data
        this.applicationView.applyScholarshipViewForm.acParent.father_province = data.father_province_name
        this.applicationView.applyScholarshipViewForm.acParent.father_district = data.father_district_name
        this.applicationView.applyScholarshipViewForm.acParent.father_sub_district = data.father_subdistrict_name
        this.applicationView.applyScholarshipViewForm.acParent.mother_province = data.mother_province_name
        this.applicationView.applyScholarshipViewForm.acParent.mother_district = data.mother_district_name
        this.applicationView.applyScholarshipViewForm.acParent.mother_sub_district = data.mother_subdistrict_name
        this.applicationView.applyScholarshipViewForm.acParent.patrol_province = data.patrol_province_name
        this.applicationView.applyScholarshipViewForm.acParent.patrol_district = data.patrol_district_name
        this.applicationView.applyScholarshipViewForm.acParent.patrol_sub_district = data.patrol_subdistrict_name
      }, error=>{

      }, ()=>{
        this.initialSiblingView()
      }
    )
  }

  initialFamilyAndAddress(){
    this.applicationService.initialAddressView(this.applicationView.applyScholarshipViewForm.acStudent.student_ref).subscribe(
      data=>{
        this.applicationView.applyScholarshipViewForm.acAddress = data
        this.applicationView.applyScholarshipViewForm.acAddress.home_province = data.home_province_name
        this.applicationView.applyScholarshipViewForm.acAddress.home_district = data.home_district_name
        this.applicationView.applyScholarshipViewForm.acAddress.home_sub_district = data.home_subdistrict_name
        this.applicationView.applyScholarshipViewForm.acAddress.current_province = data.current_province_name
        this.applicationView.applyScholarshipViewForm.acAddress.current_district = data.current_district_name
        this.applicationView.applyScholarshipViewForm.acAddress.current_sub_district = data.current_subdistrict_name
      }, error=>{
        console.log(error)
      }, ()=>{
        this.initialParentView()
      }
    )
  }

  initialSiblingView(){
    this.applicationService.initialSiblingView(this.applicationView.applyScholarshipViewForm.acStudent.student_ref).subscribe(
      data=>{
        for(let obj of data){
          // this.applicationView.applyScholarshipViewForm.siblingList.push(obj)
        }
      }, error=>{

      }, ()=>{
        this.pageRender = true
        this.ngProgress.done();
      }
    )
  }

  onPrevious(){
  }
  onNext(){
  }
}

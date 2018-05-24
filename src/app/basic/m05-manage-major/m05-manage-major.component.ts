import { Component, OnInit } from '@angular/core';
import { Severity } from '../../enum';
import { RftSchool } from '../../models/rft-school';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { UtilsService } from '../../services/utils/utils.service';
import { LayoutService } from '../../services/utils/layout.service';
import { ActivatedRoute } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { MajorService } from '../../services/references/major.service';
import { RftMajor } from '../../models/rft-major';
import { ReferenceService } from '../../services/general/reference.service';

@Component({
  selector: 'app-m05-manage-major',
  templateUrl: './m05-manage-major.component.html',
  styleUrls: ['./m05-manage-major.component.css']
})
export class M05ManageMajorComponent implements OnInit {
  pageRender = false;
  schoolList: RftSchool[];
  school:RftSchool;
  major:RftMajor = new RftMajor;
  formGroup:FormGroup;
  activeFlag:SelectItem[];
  constructor(
    private utilsService:UtilsService,
    private referenceService: ReferenceService,
    private majorService:MajorService,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    public ngProgress: NgProgress
  ) { }

  ngOnInit() {
    this.ngProgress.start();
    this.validateForm();
    this.referenceService.initialSchools();
    this.layoutService.setPageHeader('บันทึกข้อมูลสาขาวิชา')
    this.activeFlag = this.utilsService.getActiveFlag('M');
    if (this.route.snapshot.params["id"] != null) {
      this.majorService.onView(this.route.snapshot.params["id"]).subscribe(
        res=>{
          this.layoutService.setPageHeader('บันทึกข้อมูลสาขาวิชา')
          this.onUpdateMode(res);
        },
        err=>{
          console.log(err)
        }
      )
      
    }else{
     
      this.major.active_flag = 'Y';
      this.pageRender = true;
      this.ngProgress.done();
    }
  }

  validateForm(){
    this.formGroup = new FormGroup({
      school: new FormControl(this.major.school_ref,Validators.compose([Validators.required])),
      major_code: new FormControl(this.major.major_code,Validators.compose([Validators.required])),
      active_flag: new FormControl(this.major.active_flag, Validators.compose([Validators.required])),
      major_name_t: new FormControl(this.major.major_name_t,Validators.compose([Validators.required])),
      major_name_e: new FormControl(this.major.major_name_e)
    })
  }

  autoCompleteSchools(event) {
    let query = event.query;
    let e = event.originalEvent;
    this.schoolList = [];
    if(e.type=='input'){
      this.major.school_ref = null;
    }
    let objList: RftSchool[];
    objList = this.referenceService.getSchool();
    for (let obj of objList) {
      if (obj.school_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.schoolList.push(obj);
      }
    }
  }

  handleCompleteClickSchools() {
    setTimeout(() => {
      this.schoolList = this.referenceService.getSchool();
    }, 100);
  }

  selectSchool(){
    this.major.school_ref = this.school.school_ref;
  }

  onUpdateMode(major){
    console.log(major)
    this.referenceService.getSchoolByRef(major.school_ref).subscribe(
      res=>{
        this.school = res
      },
      err=>{
        console.log(err)
      }
    )
    this.major = major;
    this.pageRender = true;
    this.ngProgress.done();
  }
  onPageSearch(){
    this.utilsService.goToPage('search-major');
  }

  onSubmit(){
    this.utilsService.findInvalidControls(this.formGroup)
    if(this.formGroup.valid){
      if(!this.major.major_ref){
        this.majorService.onCreate(this.major).subscribe(
          res=>{
            this.layoutService.setMsgDisplay(
              Severity.SUCCESS,
              "บันทึกข้อมูลสำเร็จ",
              ""
            );
          },
          err=>{
            console.log(err)
            this.layoutService.setMsgDisplay(
              Severity.ERROR,
              "บันทึกข้อมูลไม่สำเร็จ",
              ""
            );
          }
        )
      }else{
        this.majorService.onUpdate(this.major).subscribe(
          res=>{
            this.layoutService.setMsgDisplay(
              Severity.SUCCESS,
              "แก้ไขข้อมูลสำเร็จ",
              ""
            );
          },
          err=>{
            console.log(err)
            this.layoutService.setMsgDisplay(Severity.ERROR,
            "แก้ไขข้อมูลไม่สำเร็จ",
            ""
            );
          }
        )
      }
    }
   
  }

}

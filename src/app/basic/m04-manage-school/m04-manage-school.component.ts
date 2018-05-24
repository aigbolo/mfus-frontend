import { Component, OnInit } from '@angular/core';
import { RftProvince } from '../../models/rft-province';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RftSchool } from '../../models/rft-school';
import { UtilsService } from '../../services/utils/utils.service';
import { SchoolService } from '../../services/references/school.service';
import { LayoutService } from '../../services/utils/layout.service';
import { SelectItem } from 'primeng/primeng';
import { ActivatedRoute } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { Severity } from '../../enum';

@Component({
  selector: 'app-m04-manage-school',
  templateUrl: './m04-manage-school.component.html',
  styleUrls: ['./m04-manage-school.component.css']
})
export class M04ManageSchoolComponent implements OnInit {
  pageRender = false;
  school:RftSchool = new RftSchool;
  formGroup:FormGroup;
  activeFlag:SelectItem[];
  constructor(
    private utilsService:UtilsService,
    private schoolService:SchoolService,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    public ngProgress: NgProgress
  ) { }

  ngOnInit() {
    this.ngProgress.start();
    this.validateForm();
    this.layoutService.setPageHeader('บันทึกข้อมูลสำนักวิชา')
    this.activeFlag = this.utilsService.getActiveFlag('M');
    if (this.route.snapshot.params["id"] != null) {
      this.schoolService.onView(this.route.snapshot.params["id"]).subscribe(
        res=>{
          this.layoutService.setPageHeader('แก้ไขข้อมูลสำนักวิชา')
          this.onUpdateMode(res);
        },
        err=>{
          console.log(err)
        }
      )
      
    }else{
     
      this.school.active_flag = 'Y';
      this.pageRender = true;
      this.ngProgress.done();
    }
  }

  validateForm(){
    this.formGroup = new FormGroup({
      school_code: new FormControl(this.school.school_code,Validators.compose([Validators.required])),
      active_flag: new FormControl(this.school.active_flag, Validators.compose([Validators.required])),
      school_name_t: new FormControl(this.school.school_name_t,Validators.compose([Validators.required])),
      school_name_e: new FormControl(this.school.school_name_e)
    })
  }

  onUpdateMode(school){
    this.school = school;
    this.pageRender = true;
    this.ngProgress.done();
  }
  onPageSearch(){
    this.utilsService.goToPage('search-school');
  }

  onSubmit(){
    this.utilsService.findInvalidControls(this.formGroup)
    if(this.formGroup.valid){
      if(!this.school.school_ref){
        this.schoolService.onCreate(this.school).subscribe(
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
        this.schoolService.onUpdate(this.school).subscribe(
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

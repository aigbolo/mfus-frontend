import { FormGroup, FormControl } from '@angular/forms';
import { M010202ResetPasswordService } from './../../../services/officers/m010202-reset-password.servicec';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils/utils.service';
import { LayoutService } from '../../../services/utils/layout.service';
import { ActivatedRoute } from '@angular/router';
import { Severity } from '../../../enum';

@Component({
  selector: 'app-m010202-manage-reset-password',
  templateUrl: './m010202-manage-reset-password.component.html',
  styleUrls: ['./m010202-manage-reset-password.component.css']
})
export class M010202ManageResetPasswordComponent implements OnInit {

  public searchCriteria = {student_id:null,first_name_t:null,last_name_t:null};
  onLoad = false;
  public studentList: any[] = [];
  constructor(public utilsService: UtilsService,
    private layoutService: LayoutService,
    private activateRoute: ActivatedRoute,
    private resetPasswordSerevice: M010202ResetPasswordService) { }

  ngOnInit() {
    this.layoutService.setPageHeader('รีเซตรหัสผ่านนักศึกษา');
  }

  onSearch() {
    this.utilsService.goToPageWithQueryParam('manage-student-password',this.searchCriteria);
    this.doSearch();
  }

  doSearch() {
    this.onLoad = true;
    this.resetPasswordSerevice.searchStudent(this.searchCriteria).subscribe(data => {
      console.log(data);
      this.studentList = data;
    },
      error => {
        console.log(error);
      },
      () => {
        this.onLoad = false;
      });

  }

  onResetPassword(data){
    this.resetPasswordSerevice.resetPassword(data).subscribe(
      data=>{
        console.log(data);
        this.layoutService.setMsgDisplay(Severity.SUCCESS,"รีเซ็ตสรหัสผ่านสำเร็จ",
          data.user_id
        );
      },
      err=>{
        console.log(err);
        this.layoutService.setMsgDisplay(Severity.ERROR,"เกิดข้อผิดพลาาด","");
      }
    );
  }


  onReset() {
    this.utilsService.goToPage('manage-student-password');
    this.searchCriteria = {student_id:null,first_name_t:null,last_name_t:null};
    this.studentList = [];
  }
}

import { Severity } from '../../../enum';
import { LayoutService } from '../../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from '../../../services/utils/utils.service';
import { AuthenticationService } from '../../../services/general/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  group: FormGroup;

  constructor(
    private layout: LayoutService,
    private utilService: UtilsService,
    private authService: AuthenticationService
  ) {
    this.layout.setPageHeader('เปลี่ยนรหัสผ่าน')
  }

  ngOnInit() {
    this.group = new FormGroup({
      old_pwd: new FormControl(null, Validators.required),
      new_pwd: new FormControl(null, Validators.required),
      verify_pwd: new FormControl(null, Validators.required)
    })
  }

  onClickSubmit() {
    if (this.group.invalid) {
      this.utilService.findInvalidControls(this.group)
      return
    }

    if (this.group.value.new_pwd !== this.group.value.verify_pwd) {
      this.layout.setMsgDisplay(Severity.WARN, 'รหัสผ่านไม่ตรงกัน', 'กรุณาตรวจสอบ');
      return
    }

    this.authService.changePassword(this.group.value.old_pwd, this.group.value.new_pwd)
      .subscribe(snapshot => {
        if (snapshot) {
          this.layout.setMsgDisplay(Severity.SUCCESS, 'บันทึกข้อมูลสำเร็จ', 'อิอิ');
          return
        }
        this.layout.setMsgDisplay(Severity.WARN, 'ไม่สามารถเปลี่ยนรหัสผ่านได้', 'เพราะ..');
      }, err => {
        this.layout.setMsgDisplay(Severity.ERROR, 'เกิดข้อผิดพลาด', 'กรุณาตรวจสอบผู้ดูแลระบบ');
        console.log(err)
      })
  }

}

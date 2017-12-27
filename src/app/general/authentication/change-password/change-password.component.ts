import { Severity } from '../../../enum';
import { LayoutService } from '../../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  group: FormGroup;

  constructor(
    private layout: LayoutService,
    private utilService: UtilsService
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

    this.layout.setMsgDisplay(Severity.SUCCESS, 'บันทึกข้อมูลสำเร็จ', 'อิอิ');

  }

}

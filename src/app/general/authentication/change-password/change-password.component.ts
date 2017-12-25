import { LayoutService } from '../../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';
import { ReferanceService } from '../../../services/general/reference.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private layout: LayoutService
  ) {
    this.layout.setPageHeader('เปลี่ยนพาสเวิด')
  }

  ngOnInit() {
  }

}

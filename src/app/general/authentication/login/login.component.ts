import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/utils/layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private layout: LayoutService) {
    this.layout.setPageHeader('เข้าสู่ระบบ')
   }

  ngOnInit() {
  }

}

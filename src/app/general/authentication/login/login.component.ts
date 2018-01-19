import { NavbarComponent } from './../../../layout/navbar/navbar.component';
import { UtilsService } from './../../../services/utils/utils.service';
import { NgProgress } from 'ngx-progressbar';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/utils/layout.service';
import { AcUser } from '../../../models/ac-user';
import { AuthenticationService } from '../../../services/general/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  group: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })
  failReson = ''
  logedinFalse = false;

  constructor(
    private router: Router,
    private layout: LayoutService,
    private authService: AuthenticationService,
    private utilsService: UtilsService,
    public ngProgress: NgProgress
  ) {
    this.layout.clearPageHeader();
  }

  ngOnInit() {
  }

  onLogingIn() {
    if (this.group.valid) {
      this.ngProgress.start();
      const username = this.group.value.username;
      const password = this.group.value.password;
      let acUser = new AcUser();
      acUser.user_id = username;
      acUser.password = password;
      this.authService.login(acUser)
        .then((user) => {
          this.ngProgress.done();
          if (user) {
            this.logedinFalse = false;
            localStorage.setItem('token', user.ac_user.api_token);
            localStorage.setItem('user', JSON.stringify(user.ac_user));

            this.authService.setLoggedinStage(user.ac_user.api_token);
            this.authService.setAccountInfo(user.ac_user);
            this.layout.setDisplayName(localStorage.getItem('username'));
            // this.router.navigateByUrl('/');
            // this.utilsService.goToPage("/");
            window.location.reload();
            return
          }
          this.logedinFalse = true;
          this.failReson = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
        })
        .catch((err) => {
          this.ngProgress.done();
          this.logedinFalse = true;
          this.failReson = 'เกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ'
          console.log(err);
        });
    }
  }

}

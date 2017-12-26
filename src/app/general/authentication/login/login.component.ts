import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/utils/layout.service';
import { AcUser } from '../../../models/ac-user';
import { AuthenticationService } from '../../../services/general/authentication.service';
import { ReferenceService } from '../../../services/general/reference.service';

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
    private authService: AuthenticationService
  ) {
    this.layout.clearPageHeader();
  }

  ngOnInit() {
  }

  onLogingIn() {
    if (this.group.valid) {
      const username = this.group.value.username;
      const password = this.group.value.password;
      let acUser = new AcUser();
      acUser.user_id = username;
      acUser.password = password;
      this.authService.login(acUser)
        .then((user) => {
          this.logedinFalse = false;
          sessionStorage.setItem('token', user.ac_user.api_token);
          sessionStorage.setItem('username', user.ac_user.user_id);
          this.router.navigateByUrl('/change-password');
          this.authService.setLoggedinStage(user.ac_user.api_token);
          this.layout.setDisplayName(user.ac_user.user_id);
        })
        .catch((err) => {
          this.logedinFalse = true;
          this.failReson = 'เกิดข้อผิดพลาด'
          console.log(err);
        });
    }
  }

}

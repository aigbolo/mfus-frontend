import { AuthenticationService } from '../../../services/general/authentication.service';
import { LayoutService } from '../../../services/utils/layout.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css', '../login/login.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  group: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required)
  })

  constructor(
    private layout: LayoutService,
    private authService: AuthenticationService,
    private utilService: UtilsService
  ) {
    this.layout.clearPageHeader();
  }

  ngOnInit() {
    
  }

  onForgot(){
    if (this.group.valid) {
      this.authService.forgotPassword(this.group.value.username, this.group.value.email)
        .subscribe(snapshot => {
          this.utilService.goToPage('/login')
        }, error => {
          console.log(error)
        })
    }
  }

}

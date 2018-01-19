import { LayoutService } from './../utils/layout.service';
import { HttpHeaders } from '@angular/common/http';
import { AcUser } from '../../models/ac-user';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../utils/configuration.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  private isLoggedin = new BehaviorSubject<string>(localStorage.getItem('token'));

  constructor(private config: ConfigurationService,
    private layout: LayoutService,) { }

  login(user: AcUser): Promise<any> {
    return this.config.requestMethodPOST('login', user).toPromise()
  }

  logout() {
    localStorage.clear();
    this.config.requestMethodPOST('logout', '').subscribe();
    this.clearLoggedinStage();
  }

  ensureAuthenticated(token): Promise<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.config.requestMethodPOSTWithHeader('ensure', '', headers).toPromise()
  }

  changePassword(userId: string, newPassword: string) {
    const param = { user_id: userId, password: newPassword }
    return this.config.requestMethodPOST('reset-password', param)
  }

  forgotPassword(username: string, email: string) {
    const param = { user_id: username, email: email }
    return this.config.requestMethodPOST('forget-password', param)
  }

  // Set Logged In Stage
  setLoggedinStage(token: string) {
    this.isLoggedin.next(token);
  }

  clearLoggedinStage() {
    this.isLoggedin.next('');
  }

  getLoggedinStage(): Observable<any> {
    return this.isLoggedin.asObservable();
  }
  // End

  setAccountInfo(user: AcUser){
    console.log('setAccountInfo')
    if(user.user_role == '1'){
      const param = { student_ref: user.account_ref};
      this.config.requestMethodPOST('students-update',param).subscribe(
        data=>{
          localStorage.setItem('user.account', JSON.stringify(data));
          localStorage.setItem('username',data.first_name_t+' '+data.last_name_t)
        },
        err=>{
          console.log(err)
        }
      )
    }
    if(user.user_role == '2'){
      const param = { officer_ref: user.account_ref};
      this.config.requestMethodPOST('officers-update',param).subscribe(
        data=>{
          localStorage.setItem('user.account', JSON.stringify(data));
          localStorage.setItem('username',data.first_name+' '+data.last_name)

        },
        err=>{
          console.log(err)
        }
      )
    }


  }

  getUser(){
    return JSON.parse(localStorage.getItem('user'));

  }
  getAccount(){
    return JSON.parse(localStorage.getItem('user.account'));
  }

}

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

  public isLoggedin = new BehaviorSubject<string>(localStorage.getItem('token'));
  public user:AcUser;
  constructor(private config: ConfigurationService,
    private layout: LayoutService,) { }

  login(user: AcUser): Observable<any> {
    return this.config.requestMethodPOST('login', user)
  }

  logout() {
    const user = localStorage.getItem('user')
    this.config.requestMethodPOST('logout', JSON.parse(user)).subscribe();
    this.user = null;
    this.clearLoggedinStage();

    localStorage.clear();
  }

  isTokenAliveCheck(user){
    return this.config.requestMethodPOST('istokenalive', user)
  }

  ensureAuthenticated(token): Promise<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.config.requestMethodPOSTWithHeader('ensure', '', headers).toPromise()
  }

  changePassword(userId: string, newPassword: string) {
    //console.log("newPassword: " + newPassword);
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
    //console.log('setAccountInfo')
    if(user.user_role == '1'){
      const param = { student_ref: user.account_ref};
      this.config.requestMethodPOST('students-update',param).subscribe(
        data=>{
          localStorage.setItem('user.account', JSON.stringify(data));
          localStorage.setItem('username',data.first_name_t+' '+data.last_name_t)
        },
        err=>{
          console.log(err)
        },
        ()=>{
          this.layout.setDisplayName(localStorage.getItem('username'));
        }
      )
    }
    if(user.user_role == '2'){
      const param = { officer_ref: user.account_ref};
      this.config.requestMethodPOST('officers-update',param).subscribe(
        data=>{

        },
        err=>{
          console.log(err)
        },
        ()=>{

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

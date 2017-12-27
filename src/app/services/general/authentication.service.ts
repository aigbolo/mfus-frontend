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

  constructor(private config: ConfigurationService) { }

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

}

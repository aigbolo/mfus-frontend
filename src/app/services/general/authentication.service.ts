import { HttpHeaders } from '@angular/common/http';
import { AcUser } from '../../models/ac-user';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../utils/configuration.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthenticationService {

  private isRoleStage = new Subject();

  constructor(private config: ConfigurationService) { }

  login(user: AcUser): Promise<any> {
    return this.config.requestMethodPOST('login', user).toPromise()
  }

  ensureAuthenticated(token): Promise<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.config.requestMethodPOSTWithHeader('ensure', '', headers).toPromise()
  }

  nowRoleStage(): Subject<any> {
    return this.isRoleStage;
  }

  setRoleStage(stage) {
    this.isRoleStage.next(stage);
  }

  defultRole(stage) {
    this.isRoleStage.next('USER');
  }

}

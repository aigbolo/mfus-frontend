import { UtilsService } from './../utils/utils.service';
import { AcOfficer } from './../../models/ac-officer';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../utils/configuration.service';
import { LayoutService } from '../utils/layout.service';
import { Severity } from '../../enum';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficerForm } from '../../forms/officer-form';

@Injectable()
export class M010202ResetPasswordService {

  constructor(private configurationService: ConfigurationService,
    private utilService: UtilsService,
    private router: Router) { }

    searchStudent(criteria:any){
      return this.configurationService.requestMethodPOST('students-view',criteria);
    }
    resetPassword(student:any){
      const body = {account_ref:student.student_ref,personal_id:student.personal_id};
      return this.configurationService.requestMethodPOST('reset-password',body);
    }
}

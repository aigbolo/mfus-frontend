import { UtilsService } from './../utils/utils.service';
import { AcOfficer } from './../../models/ac-officer';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../utils/configuration.service';
import { LayoutService } from '../utils/layout.service';
import { Severity } from '../../enum';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficerForm } from '../../forms/officer-form';

@Injectable()
export class M010102OfficerService {

  constructor(private configurationService: ConfigurationService,
    private utilService: UtilsService,
    private layout: LayoutService,
    private router: Router) { }


  doInsert(form: AcOfficer, user: string) {
    form.create_user = user
    form.update_user = user
    return this.configurationService.requestMethodPOST('officers-insert', form)
  }

  searchOfficer(form: OfficerForm) {
    this.router.navigate(['/search-officer'], { queryParams: form.searchCriteria})
    return this.configurationService.requestMethodPOST('officers', form.searchCriteria)
  }

  selectOfficer(ref: AcOfficer) {
    return this.configurationService.requestMethodPOST('officers-update', ref)
  }

  doUpdate(form: AcOfficer) {
    return this.configurationService.requestMethodPUT('officers', form)
  }
}

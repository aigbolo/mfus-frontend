import { UtilsService } from './../utils/utils.service';
import { OfficerForm } from './../../forms/officer-form';
import { AcOfficer } from './../../models/ac-officer';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../utils/configuration.service';

@Injectable()
export class M010102OfficerService {

  officerForm: OfficerForm
  constructor(private configurationService: ConfigurationService,
    private utilService: UtilsService) { }


  doInsert(form: AcOfficer, user: string) {
    form.create_user = user
    form.update_user = user
    console.log(form)
    return this.configurationService.requestMethodPOST('officers-insert', form).subscribe(res => {

    }, error => {
      console.log(error)
    }, () => {
      console.log('success')
      this.utilService.goToPage('search-officer')
    })
  }

  searchOfficer(form: OfficerForm) {
    return this.configurationService.requestMethodPOST('officers', form.searchCriteria)
  }

  selectOfficer(ref: AcOfficer) {
    return this.configurationService.requestMethodPOST('officers-update', ref)
  }

  doUpdate(form: AcOfficer) {
    return this.configurationService.requestMethodPUT('officers', form).subscribe(res => {
      console.log(res)
    }, error => {
      console.log(error)
    }, () => {
      console.log('update success')
      this.utilService.goToPage('search-officer')
    })
  }
}

import { UtilsService } from './../utils/utils.service';
import { OfficerForm } from './../../forms/officer-form';
import { AcOfficer } from './../../models/ac-officer';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../utils/configuration.service';

@Injectable()
export class M010102OfficerService {

  officerForm: OfficerForm[]
  constructor(private configurationService: ConfigurationService,
              private utilService: UtilsService) { }


  insertNewOfficer(form: AcOfficer) {
    console.log(form)

  }

  searchOfficer(form: OfficerForm) {
    return this.configurationService.requestMethodPOST('officers', form.searchCriteria)
  }

  selectOfficer(ref: AcOfficer) {
    return this.configurationService.requestMethodPOST('officers-update', ref)
  }

  updateOfficer(form: OfficerForm) {
    form.acOfficer.province = form.rftProvince.province_ref
    form.acOfficer.district = form.rftDistrict.district_ref
    form.acOfficer.sub_district = form.rftSubDistrict.sub_district_ref
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

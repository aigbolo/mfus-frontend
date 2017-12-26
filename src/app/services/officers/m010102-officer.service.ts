import { Injectable } from '@angular/core';
import { OfficerForm } from '../../forms/officer-form';
import { ConfigurationService } from '../utils/configuration.service';

@Injectable()
export class M010102OfficerService {

  officerForm: OfficerForm[]
  constructor(private configurationService: ConfigurationService) { }


  insertNewOfficer(officerForm: OfficerForm) {
    console.log(OfficerForm)
  }

  searchOfficer(form: OfficerForm) {
    return this.configurationService.requestMethodPOST('officers', form.searchCriteria)
  }
}

import { ConfigurationService } from './../utils/configuration.service';
import { Injectable } from '@angular/core';
import { AcStudent } from '../../models/ac-student';

@Injectable()
export class M010101StudentService {

  constructor(
    private configurationService: ConfigurationService
  ) { }


  doInsert(form: AcStudent) {
    return this.configurationService.requestMethodPOST('students-insert', form)
  }

  doUpdate(form: AcStudent) {
    return this.configurationService.requestMethodPUT('students', form)
  }

  doSelect(ref: AcStudent){
    return this.configurationService.requestMethodPOST('students-update', ref)
  }
}

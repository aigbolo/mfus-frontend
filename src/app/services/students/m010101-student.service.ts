import { ConfigurationService } from './../utils/configuration.service';
import { Injectable } from '@angular/core';
import { AcStudent } from '../../models/ac-student';

@Injectable()
export class M010101StudentService {

  constructor(
    private configurationService: ConfigurationService
  ) { }


  doInsert(form: AcStudent, user: string) {
    form.create_user = user
    form.update_user = user
    return this.configurationService.requestMethodPOST('student-insert', form)
  }
}

import { Injectable } from '@angular/core';
import { OfficerForm } from '../../forms/officer-form';

@Injectable()
export class M010102OfficerService {

  constructor() { }


  insertNewOfficer(officerForm: OfficerForm){
    console.log(OfficerForm)
  }
}

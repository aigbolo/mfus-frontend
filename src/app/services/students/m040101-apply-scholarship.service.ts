import { Injectable } from '@angular/core';
import { ConfigurationService } from '../utils/configuration.service';

@Injectable()
export class M040101ApplyScholarshipService {

  constructor(
    private configurationService: ConfigurationService
  ) { }

  getApplySchcolarshipData(ref:string){
    let json = {student_ref: ref}
    return this.configurationService.requestMethodPOST('students-update', json)
  }

  initialScholarshipAnnouncement(){
    return this.configurationService.requestMethodPOST('autocomplete-scannouncedate','')
  }

  initialDocumentUpload(){
    return this.configurationService.requestMethodPOST('appdoc','')
  }
}

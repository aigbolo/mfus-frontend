import { Injectable } from '@angular/core';
import { ConfigurationService } from '../utils/configuration.service';

@Injectable()
export class M040101ApplyScholarshipService {

  constructor(
    private configurationService: ConfigurationService
  ) { }

  getApplySchcolarshipData(ref:string){
    let json = {student_ref: ref}
    console.log(json)
    return this.configurationService.requestMethodPOST('students-update', json)
  }

  searchScholarshipAnnouncementFromYear(year: string){
    console.log(year)
    return this.configurationService.requestMethodGET('atpscholar-announce/year=' + year)
  }
}

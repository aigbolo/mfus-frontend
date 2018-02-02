import { ConfigurationService } from './../utils/configuration.service';
import { Injectable } from '@angular/core';
@Injectable()
export class ApplicationService {

  constructor(
    private configurationService: ConfigurationService
  ) { }


  initialAcStudentView(ref: string) {
    let json = { student_ref: ref };
    return this.configurationService.requestMethodPOST('students-update', json);
  }

  initialApApplicationView(ref: string){
    let json = { application_ref: ref };
    return this.configurationService.requestMethodPOST('application-update', json);
  }

  initialScholarshipAnnouncement(ref: string) {
    // let json = { announcement_ref: ref }
    // return this.configurationService.requestMethodPOST('scholarships-announcement-update', json)
    return this.configurationService.requestMethodPOST('autocomplete-scannouncedate', ref);
  }
}

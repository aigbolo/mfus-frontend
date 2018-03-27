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
    let json = { announcement_ref: ref };
    return this.configurationService.requestMethodPOST('scholarships-announcement-update', json);
  }

  initialScholarshipHistory(ref: string) {
    let json = { student_ref: ref };
    return this.configurationService.requestMethodPOST('scholarshiphistory', json);
  }

  initialStudentLoanFund(ref: string){
    let json = { student_ref: ref };
    return this.configurationService.requestMethodPOST('studentloanfund', json);
  }

  initialFamilyFinancial(ref: string){
    let json = { student_ref: ref };
    return this.configurationService.requestMethodPOST('familyfinancial', json);
  }

  initialSiblingView(ref: string){
    let json = { student_ref: ref };
    return this.configurationService.requestMethodPOST('siblings', json);
  }

  initialAddressView(ref: string){
    let json = { student_ref: ref };
    return this.configurationService.requestMethodPOST('address-update', json);
  }

  initialParentView(ref: string){
    let json = { student_ref: ref };
    return this.configurationService.requestMethodPOST('parents', json);
  }

  initialDocumentUploadView(ref: string){
    let json ={ application_ref: ref };
    return this.configurationService.requestMethodPOST('documentupload-view', json);
  }

  initialDocumentRequestView(ref: string){
    let json = { application_ref: ref }
    return this.configurationService.requestMethodPOST('documentrequest-history', json);
  }
  initialStudentInterview(ref: string){
    let json = { announcement_ref: ref };
    return  this.configurationService.requestMethodPOST('interviewees',json);
  }
}

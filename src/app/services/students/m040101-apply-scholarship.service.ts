import { ScholarshipApplyForm } from './../../forms/scholarship-applied-form';
import { ApplyScholarshipForm } from './../../forms/apply-scholarship-form';
import { ApFamilyFinancial } from './../../models/ap-family-financial';
import { ApScholarshipHistory } from './../../models/ap-scholarship-history';
import { ScholarshipForm } from './../../forms/scholarship-form';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../utils/configuration.service';
import { AcStudent } from '../../models/ac-student';
import { ApApplication } from '../../models/ap-application';
import { ApStudentLoanFund } from '../../models/ap-student-loan-fund';
import { ApDocumentUpload } from '../../models/ap-document-upload';
import { ApFamilyDebt } from '../../models/ap-family-debt';

@Injectable()
export class M040101ApplyScholarshipService {

  constructor(
    private configurationService: ConfigurationService
  ) { }

  getApplySchcolarshipData(ref:string){
    let json = {student_ref: ref}
    return this.configurationService.requestMethodPOST('students-view', json)
  }

  initialScholarshipAnnouncementList(){
    return this.configurationService.requestMethodPOST('autocomplete-scannouncedate','')
  }

  initialApplicationDocument(){
    return this.configurationService.requestMethodPOST('appdoc','')
  }

 upDateStudent(student: AcStudent){
   return this.configurationService.requestMethodPUT('students', student)
 }

 insertApplication(application: ApApplication){
  return this.configurationService.requestMethodPOST('application-insert',application)
 }

 updateApplication(application: ApApplication){
  return this.configurationService.requestMethodPUT('application',application)
  // return this.configurationService.requestMethodPOST()
 }

 insertScholarshipHistory(scholarshipHistory: ApScholarshipHistory[]){
  return this.configurationService.requestMethodPOST('scholarshiphistory-insert', scholarshipHistory)
 }

 insertStudentLoanFund(stdLoanFund: ApStudentLoanFund[]){
   return this.configurationService.requestMethodPOST('studentloanfund-insert',stdLoanFund)
 }

 insertFamilyFinancialAndFamilyDebt(data: any){
  return this.configurationService.requestMethodPOST('familyfinancial-insert', data)
 }


 insertDocumentUpload(documentUpload: ApDocumentUpload[]){
  return this.configurationService.requestMethodPOST('documentupload-insert',documentUpload)
 }

 doSearch(application: ApplyScholarshipForm){
   console.log(application.search_criteria);
  return this.configurationService.requestMethodPOST('stapplication',application.search_criteria);
 }

 initialApApplication(ref: string){
   let json = { application_ref: ref }
   return this.configurationService.requestMethodPOST('application-update', json)
 }

 initialScholarshipAnnouncement(ref: string){
  let json = { announcement_ref: ref}
  return this.configurationService.requestMethodPOST('scholarships-announcement-update', json)
 }

 initialScholarshipHistory(ref: string){
   let json = { student_ref: ref }
   return this.configurationService.requestMethodPOST('scholarshiphistory', json)
 }

 initialStudentLoanFund(ref: string){
  let json = { student_ref: ref}
  return this.configurationService.requestMethodPOST('studentloanfund', json)
 }

 initialFamilyFinancial(ref: string){
  let json = { student_ref: ref }
  return this.configurationService.requestMethodPOST('familyfinancial', json)
 }

 initialDocumentUpload(ref: string){
  let json = { application_ref: ref }
  return this.configurationService.requestMethodPOST('documentupload', json)
 }
}

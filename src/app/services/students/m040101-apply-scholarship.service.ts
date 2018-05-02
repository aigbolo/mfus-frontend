import { Severity } from './../../enum';
import { LayoutService } from './../utils/layout.service';
import { ApFamilyDebt } from './../../models/ap-family-debt';
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

@Injectable()
export class M040101ApplyScholarshipService {


  constructor(
    private configurationService: ConfigurationService,
    private layoutService: LayoutService,
  ) { }

  getStudentView(ref: string) {
    let json = { student_ref: ref }
    return this.configurationService.requestMethodPOST('students-view', json);
  }

  initialScholarshipAnnouncementList() {
    return this.configurationService.requestMethodPOST('autocomplete-scannouncedate', '')
  }

  setScholarshipAnnouncement(ref: string) {
    return this.configurationService.requestMethodPOST('autocomplete-scannouncedate', ref)
  }

  initialApplicationDocument() {
    return this.configurationService.requestMethodPOST('appdoc', '')
  }

  upDateStudent(student: AcStudent) {
    return this.configurationService.requestMethodPUT('students', student)
  }



  //*
  //**
  // Insert students apply scholarships
  async applyScholarship(form:ApplyScholarshipForm){
    const application = await new Promise((resolve,reject)=>{
      this.insertApplication(form.apApplication).subscribe(
      data=>{
        resolve(data)
      },
      err=>{
        console.log(err)
        this.layoutService.setMsgDisplay(
          Severity.ERROR,"เกิดข้อผิดพลาาด","ไม่สามารถบันทึกขอทุนการศึกษาได้"
        );
        reject(err)
      }
    )
    })


    if(form.apScholarshipHistorys.length >0){
      await form.apScholarshipHistorys.forEach(data=>{
        data.student_ref = form.apApplication.student_ref;
      })
      const scholarshipHistory = await new Promise((resolve,reject)=>{
        this.updateScholarshipHistory(form.apScholarshipHistorys).subscribe(
        data=>{
          console.log('insert sc history');
          resolve(data)
        },
        err=>{
          console.log(err)
          this.layoutService.setMsgDisplay(
            Severity.ERROR,"เกิดข้อผิดพลาาด","ไม่สามารถบันทึกประวัติการได้รับทุนการศึกษาได้"
          );
          reject(err)
        }
      )
      })
      console.log('done sc history: ',scholarshipHistory);
    }


    if(form.apStudentLoanFunds.length >0){
      const loanHistory = await new Promise((resolve,reject)=>{
        this.updateStudentLoanFund(form.apStudentLoanFunds).subscribe(
        data=>{
          console.log('insert loan history');
          resolve(data)
        },
        err=>{
          console.log(err)
          this.layoutService.setMsgDisplay(
            Severity.ERROR,"เกิดข้อผิดพลาาด","ไม่สามารถบันทึกประวัติ กยศ. ได้"
          );
          reject(err)
        }
      )
      })
      console.log('done loan history: ',loanHistory);
    }

    form.apFamilyFinancial.application_ref  = application['application_ref'];
    const debt = await new Promise((resolve,reject)=>{
      this.insertFamilyFinancialAndFamilyDebt(form.apFamilyFinancial,form.apFamilyDebt).subscribe(
      data=>{
        console.log('insert debt');
        resolve(data)
      },
      err=>{
        console.log(err)
        this.layoutService.setMsgDisplay(
          Severity.ERROR,"เกิดข้อผิดพลาาด","ไม่สามารถบันทึกข้อมูลสถานะทางการเงินของครอบครัวได้"
        );
        reject(err)
      }
    )
    })
    console.log('done debt: ',debt);
    await form.apDocumentUpload.forEach(data=>{
      data.application_ref = application['application_ref'];
    })
    const upload = await new Promise((resolve,reject)=>{
      this.insertDocumentUpload(form.apDocumentUpload).subscribe(
      data=>{
        console.log('insert upload');
        resolve(data)
      },
      err=>{
        console.log(err)
        this.layoutService.setMsgDisplay(
          Severity.ERROR,"เกิดข้อผิดพลาาด","ไม่สามารถบันทึกเอกสารได้"
        );
        reject(err)
      }
    )
    })
    console.log('done debt: ',upload);

    this.layoutService.setMsgDisplay(
      Severity.SUCCESS,"บันทึกขอทุนการศึกษาเรียบร้อย",`หมายเลขใบสมัคร: ${application['application_code']}`);
    return {status:200,apApplication:{...application}};

  }



  insertApplication(application: ApApplication) {
    return this.configurationService.requestMethodPOST('application-insert', application)
  }
  insertFamilyFinancialAndFamilyDebt(financial:ApFamilyFinancial,debtList:ApFamilyDebt[]) {
    const body = {ap_family_financial:{...financial},family_debt_list:[...debtList]}
    console.log('body: ',body)
    return this.configurationService.requestMethodPOST('familyfinancial-insert', body)
  }
  insertDocumentUpload(documentUpload: ApDocumentUpload[]) {
    return this.configurationService.requestMethodPOST('documentupload-insert', {document_list:[...documentUpload]})
  }



  async updateApply(form:ApplyScholarshipForm){
    const application = await new Promise((resolve,reject)=>{
      this.updateApplication(form.apApplication).subscribe(
      data=>{
        resolve(data)
      },
      err=>{
        console.log(err)
        this.layoutService.setMsgDisplay(
          Severity.ERROR,"เกิดข้อผิดพลาาด","ไม่สามารถบันทึกขอทุนการศึกษาได้"
        );
        reject(err)
      }
    )
    })


    if(form.apScholarshipHistorys.length >0){
      await form.apScholarshipHistorys.forEach(data=>{
        data.student_ref = form.apApplication.student_ref;
      })
      const scholarshipHistory = await new Promise((resolve,reject)=>{
        this.updateScholarshipHistory(form.apScholarshipHistorys).subscribe(
        data=>{
          console.log('insert sc history');
          resolve(data)
        },
        err=>{
          console.log(err)
          this.layoutService.setMsgDisplay(
            Severity.ERROR,"เกิดข้อผิดพลาาด","ไม่สามารถบันทึกประวัติการได้รับทุนการศึกษาได้"
          );
          reject(err)
        }
      )
      })
      console.log('done sc history: ',scholarshipHistory);
    }


    if(form.apStudentLoanFunds.length >0){
      const loanHistory = await new Promise((resolve,reject)=>{
        this.updateStudentLoanFund(form.apStudentLoanFunds).subscribe(
        data=>{
          console.log('insert loan history');
          resolve(data)
        },
        err=>{
          console.log(err)
          this.layoutService.setMsgDisplay(
            Severity.ERROR,"เกิดข้อผิดพลาาด","ไม่สามารถบันทึกประวัติ กยศ. ได้"
          );
          reject(err)
        }
      )
      })
      console.log('done loan history: ',loanHistory);
    }

    form.apFamilyFinancial.application_ref  = application['application_ref'];
    const debt = await new Promise((resolve,reject)=>{
      this.updateFamilyFinancialAndFamilyDebt(form.apFamilyFinancial,form.apFamilyDebt).subscribe(
      data=>{
        console.log('insert debt');
        resolve(data)
      },
      err=>{
        console.log(err)
        this.layoutService.setMsgDisplay(
          Severity.ERROR,"เกิดข้อผิดพลาาด","ไม่สามารถบันทึกข้อมูลสถานะทางการเงินของครอบครัวได้"
        );
        reject(err)
      }
    )
    })
    console.log('done debt: ',debt);
    await form.apDocumentUpload.forEach(data=>{
      data.application_ref = application['application_ref'];
    })
    const upload = await new Promise((resolve,reject)=>{
      this.updateDocumentUpload(form.apDocumentUpload).subscribe(
      data=>{
        console.log('insert upload');
        resolve(data)
      },
      err=>{
        console.log(err)
        this.layoutService.setMsgDisplay(
          Severity.ERROR,"เกิดข้อผิดพลาาด","ไม่สามารถบันทึกเอกสารได้"
        );
        reject(err)
      }
    )
    })
    console.log('done debt: ',upload);

    this.layoutService.setMsgDisplay(
      Severity.SUCCESS,"บันทึกขอทุนการศึกษาเรียบร้อย",`หมายเลขใบสมัคร: ${application['application_code']}`);
    return {status:200,apApplication:{...application}};
  }


  updateApplication(application: ApApplication) {
    return this.configurationService.requestMethodPUT('application', application)
  }
  updateScholarshipHistory(scholarshipHistory: ApScholarshipHistory[]) {
    return this.configurationService.requestMethodPUT('scholarshiphistory', scholarshipHistory)
  }
  updateStudentLoanFund(stdLoanFund: ApStudentLoanFund[]) {
    return this.configurationService.requestMethodPUT('studentloanfund', stdLoanFund)
  }
  updateFamilyFinancialAndFamilyDebt(financial:ApFamilyFinancial,debtList:ApFamilyDebt[]) {
    const body = {ap_family_financial:{...financial},family_debt_list:[...debtList]}
    return this.configurationService.requestMethodPUT('familyfinancial', body)
  }
  updateDocumentUpload(documentUpload: ApDocumentUpload[]){
    let document_list = { document_list: documentUpload}
    return this.configurationService.requestMethodPUT('documentupload', document_list)
  }





  doSearch(application: ApplyScholarshipForm) {
    console.log(application.search_criteria);
    return this.configurationService.requestMethodPOST('stapplication', application.search_criteria);
  }







  initialApApplication(ref: string) {
    let json = { application_ref: ref }
    return this.configurationService.requestMethodPOST('application-update', json)
  }

  initialScholarshipAnnouncement(ref: string) {
    let json = { announcement_ref: ref }
    return this.configurationService.requestMethodPOST('scholarships-announcement-update', json)
  }

  initialScholarshipHistory(ref: string) {
    let json = { student_ref: ref }
    return this.configurationService.requestMethodPOST('scholarshiphistory', json)
  }

  initialStudentLoanFund(ref: string) {
    let json = { student_ref: ref }
    return this.configurationService.requestMethodPOST('studentloanfund', json)
  }

  initialFamilyFinancial(ref: string) {
    let json = { application_ref: ref }
    return this.configurationService.requestMethodPOST('familyfinancial', json)
  }

  initialDocumentUpload(ref: string) {
    let json = { application_ref: ref }
    return this.configurationService.requestMethodPOST('documentupload', json)
  }

  initialDistrict(provinceRef: string) {
    return this.configurationService.requestMethodGET("autocomplete-district/" + provinceRef)
  }
}

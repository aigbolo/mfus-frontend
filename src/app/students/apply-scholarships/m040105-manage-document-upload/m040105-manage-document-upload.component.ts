import { M040102ManageScholarshipInfoComponent } from './../m040102-manage-scholarship-info/m040102-manage-scholarship-info.component';
import { Severity } from './../../../enum';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Rx';
import { ApplyScholarshipsComponent } from './../apply-scholarships.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { M040101ApplyScholarshipService } from '../../../services/students/m040101-apply-scholarship.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { ApDocumentUpload } from '../../../models/ap-document-upload';
import { LayoutService } from '../../../services/utils/layout.service';
import { NgProgress } from 'ngx-progressbar';
import { ReferenceService } from '../../../services/general/reference.service';

@Component({
  selector: 'app-m040105-manage-document-upload',
  templateUrl: './m040105-manage-document-upload.component.html',
  styleUrls: ['./../apply-scholarships.component.css', './m040105-manage-document-upload.component.css']
})
export class M040105ManageDocumentUploadComponent implements OnInit {

  btnLabel: string = "บันทึก"
  uploadedFiles: any[] = [];
  file_name: string;
  file_type: string;
  file_size: string;
  image: string;
  label: string;
  display: boolean
  uploadDocument: ApDocumentUpload;
  btnlabel: string

  constructor(public applyApplication: ApplyScholarshipsComponent,
    private applyScholarshipService: M040101ApplyScholarshipService,
    private utilsService: UtilsService,
    private layoutService: LayoutService,
    private ngProgress: NgProgress,
    private referenceService: ReferenceService,) { }

  ngOnInit() {
    this.ngProgress.start()
    this.initialDocumentList()
  }

  initialDocumentList() {
    this.btnlabel = 'บันทึกข้อมูล'
    this.applyApplication.applyApplicationForm.documentList = []
    this.applyScholarshipService.initialApplicationDocument().subscribe(data => {
      for (let obj of data) {
        obj.label = 'เลือกไฟล์'
        obj.upload_name = this.file_name
        this.applyApplication.applyApplicationForm.documentList.push(obj)
      }
      // if (this.applyApplication.update_state == true) {
      //   this.onPageUpdate()
      // }
      this.ngProgress.done()
    })
  }

  onPageUpdate() {
    this.btnlabel = 'แก้ไขข้อมูล'
    for (let rftdoc of this.applyApplication.applyApplicationForm.documentList) {
      for (let apdoc of this.applyApplication.applyApplicationForm.apDocumentUpload) {
        if (rftdoc.document_ref == apdoc.document_ref) {
          rftdoc.upload_name = apdoc.document_name
          rftdoc.label = 'แก้ไข'
        }
      }
    }
  }

  onUpload(event, ref: string) {

    let documentList = this.applyApplication.applyApplicationForm.documentList
    let documentUpload = this.applyApplication.applyApplicationForm.apDocumentUpload

    new Observable((observer: Observer<boolean>) => {
      setTimeout(() => {
        if (event.files != null) this.uploadedFiles = [];
        for (let file of event.files) {
          this.uploadedFiles.push(file);
        }
      }, 1000);
      setTimeout(() => {
        this.uploadDocument = new ApDocumentUpload();
        this.utilsService
          .convertBlobToString(this.uploadedFiles[0].objectURL)
          .subscribe(val => {
            this.uploadDocument.document_image = val;
          });
        this.uploadDocument.document_name = this.uploadedFiles[0].name;
        this.uploadDocument.document_type = this.uploadedFiles[0].type;
        this.uploadDocument.document_ref = ref
        // this.uploadDocument.create_user = this.applyApplication.user_ref
        // this.uploadDocument.update_user = this.applyApplication.user_ref

        if (typeof documentList.find(i => i.document_ref == ref).upload_name === "undefined") {
          documentList.find(i => i.document_ref == ref).upload_name = this.uploadDocument.document_name
          documentList.find(i => i.document_ref == ref).label = 'แก้ไข'
          // this.uploadDocument.update_user = this.applyApplication.user_ref
          documentUpload.push(this.uploadDocument)
        } else {
          documentList.find(i => i.document_ref == ref).upload_name = this.uploadDocument.document_name
          documentList.find(i => i.document_ref == ref).label = 'แก้ไข'
          // this.uploadDocument.update_user = this.applyApplication.user_ref
          documentUpload[documentUpload.indexOf(documentUpload.find(i => i.document_ref == ref))] = this.uploadDocument;
        }
      }, 2000);
    }).subscribe()
  }

  onDelete(doc, ref) {
    this.applyApplication.applyApplicationForm.documentList.find(i => i.document_ref == ref).upload_name = "";
    this.applyApplication.applyApplicationForm.documentList.find(i => i.document_ref == ref).label = "เลือกไฟล์";
    for(let obj of this.applyApplication.applyApplicationForm.apDocumentUpload){
      if(obj.document_ref == ref){
        this.applyApplication.applyApplicationForm.apDocumentUpload.splice(this.applyApplication.applyApplicationForm.apDocumentUpload.indexOf(obj), 1)
      }
    }
  }

  onPrevious() {
    this.referenceService.nextIndex(3)
    this.utilsService.activeIndex = this.referenceService.getIndex()
  }

  onInsertClick() {
    // this.ngProgress.start()
    // let financialAndDebt = {
    //   ap_family_financial: this.applyApplication.applyApplicationForm.apFamilyFinancial,
    //   family_dept_list: this.applyApplication.applyApplicationForm.apFamiyDebt
    // }
    // this.applyScholarshipService.upDateStudent(this.applyApplication.applyApplicationForm.acStudent)
    //   .subscribe(res => {
    //     if (!this.applyApplication.applyApplicationForm.apApplication.application_ref) {
    //       this.applyApplication.applyApplicationForm.apApplication.earn_flag = '1'
    //       this.applyApplication.applyApplicationForm.apApplication.document_screening_flag = '1'
    //       this.applyApplication.applyApplicationForm.apApplication.interview_flag = '1'
    //       this.insertApplication(financialAndDebt);
    //     } else {
    //       this.updateApplication(financialAndDebt)
    //     }
    //   })
  }

  insertApplication(financialAndDebt) {
  //   this.applyScholarshipService.insertApplication(this.applyApplication.applyApplicationForm.apApplication)
  //     .subscribe(res => {
  //       this.applyApplication.applyApplicationForm.apApplication = res;
  //       this.applyApplication.applyApplicationForm.apFamilyFinancial.application_ref = res.application_ref;
  //       this.applyScholarshipService.insertScholarshipHistory(this.applyApplication.applyApplicationForm.apScholarshipHistory)
  //         .subscribe(res => {
  //           this.applyScholarshipService.insertStudentLoanFund(this.applyApplication.applyApplicationForm.apStudentLoanFund)
  //             .subscribe(res => {
  //               this.applyScholarshipService.insertFamilyFinancialAndFamilyDebt(financialAndDebt)
  //                 .subscribe(res => {
  //                   for (let obj of this.applyApplication.applyApplicationForm.apDocumentUpload) {
  //                     obj.application_ref = this.applyApplication.applyApplicationForm.apApplication.application_ref;
  //                   }
  //                   this.applyScholarshipService.insertDocumentUpload(this.applyApplication.applyApplicationForm.apDocumentUpload)
  //                     .subscribe(res => {
  //                     }, error => {
  //                       // Error insert document
  //                       console.log(error);
  //                       this.layoutService.setMsgDisplay(
  //                         Severity.ERROR,
  //                         "บันทึกข้อมูลผิดพลาด",
  //                         ""
  //                       );
  //                       this.ngProgress.done();
  //                     }, () => {
  //                       this.layoutService.setMsgDisplay(
  //                         Severity.SUCCESS,
  //                         "บันทึกข้อมูลสำเร็จ",
  //                         ""
  //                       );
  //                       this.ngProgress.done();
  //                       this.display = true;
  //                       this.referenceService.nextIndex(0);
  //                       this.utilsService.activeIndex = this.referenceService.getIndex();
  //                     })
  //                 }, error=>{
  //                   //Error insert Familyand Financial
  //                   console.log(error);
  //                   this.layoutService.setMsgDisplay(
  //                     Severity.ERROR,
  //                     "บันทึกข้อมูลผิดพลาด",
  //                     error
  //                   );
  //                   this.ngProgress.done();
  //                 })
  //             }, error=>{
  //               //Error insert Student Loan Fund
  //               console.log(error);
  //               this.layoutService.setMsgDisplay(
  //                 Severity.ERROR,
  //                 "บันทึกข้อมูลผิดพลาด",
  //                 error
  //               );
  //               this.ngProgress.done();
  //             })
  //         }, error=>{
  //           //Error Scholarship History
  //           console.log(error);
  //           this.layoutService.setMsgDisplay(
  //             Severity.ERROR,
  //             "บันทึกข้อมูลผิดพลาด",
  //             error
  //           );
  //           // this.scholarshipInfo.scholarshipFormGroup.controls['scholarshipAnnouncementName'].markAsDirty();
  //           this.ngProgress.done();
  //         })
  //     }, error=>{
  //       //Error insert Apapplication
  //       console.log(error);
  //       this.layoutService.setMsgDisplay(
  //         Severity.ERROR,
  //         "บันทึกข้อมูลผิดพลาด",
  //         "คุณได้ทำการยื่นความจำนงขอทุน " +
  //           this.applyApplication.applyApplicationForm.autocompleteScholarshipAnnouncement.name +
  //           " แล้ว กรุณาตรวจสอบข้อมูลอีกครั้ง"
  //       );
  //       this.referenceService.nextIndex(1);
  //       this.utilsService.activeIndex = this.referenceService.getIndex();
  //       this.ngProgress.done();
  //     })
  }


  updateApplication(financialAndDebt) {
  //   this.applyScholarshipService.updateApplication(this.applyApplication.applyApplicationForm.apApplication)
  //     .subscribe(res => {
  //       this.applyApplication.applyApplicationForm.apApplication = res;
  //       this.applyApplication.applyApplicationForm.apFamilyFinancial.application_ref = res.application_ref;
  //       console.log(this.applyApplication.applyApplicationForm.apScholarshipHistory)
  //       this.applyScholarshipService.updateScholarshipHistory(this.applyApplication.applyApplicationForm.apScholarshipHistory)
  //         .subscribe(res => {
  //           this.applyScholarshipService.updateStudentLoanFund(this.applyApplication.applyApplicationForm.apStudentLoanFund)
  //             .subscribe(res => {
  //               this.applyScholarshipService.updateFamilyFinancialAndFamilyDebt(financialAndDebt)
  //                 .subscribe(res => {
  //                   console.log(this.applyApplication.applyApplicationForm.apDocumentUpload)
  //                   for (let obj of this.applyApplication.applyApplicationForm.apDocumentUpload) {
  //                     obj.application_ref = this.applyApplication.applyApplicationForm.apApplication.application_ref;
  //                   }
  //                   this.applyScholarshipService.updateDocumentUpload(this.applyApplication.applyApplicationForm.apDocumentUpload)
  //                     .subscribe(res => {
  //                     }, error => {
  //                       console.log(error);
  //                       this.errorMsg( 4, "");
  //                     }, () => {
  //                       this.layoutService.setMsgDisplay(
  //                         Severity.SUCCESS,
  //                         "แก้ไขข้อมูลสำเร็จ",
  //                         ""
  //                       );
  //                       this.ngProgress.done();
  //                       this.display = true;
  //                       this.utilsService.goToPage('search-sholarships-applied');
  //                     })
  //                 }, error=>{
  //                   //error Update Family Financial And Debt
  //                   console.log(error)
  //                   this.errorMsg(2, "");
  //                   this.ngProgress.done();
  //                 })
  //             }, error=>{
  //               //error upDate Student Loan Fund
  //               console.log(error);
  //               this.errorMsg( 1, "");
  //               this.ngProgress.done();
  //             })
  //         }, error=>{
  //           //error Update Scholarship History
  //         console.log(error);
  //         this.errorMsg( 1, "");
  //         this.ngProgress.done();
  //         })
  //     }, error=>{
  //       //error Update Application
  //       console.log(error);
  //       this.errorMsg( 0, "");
  //       this.ngProgress.done();
  //     })
  }

  errorMsg( index, msg){
    this.layoutService.setMsgDisplay(
      Severity.ERROR,
      "แก้ไขข้อมูลผิดพลาด",
      msg
    );
    this.referenceService.nextIndex(index);
      this.utilsService.activeIndex = this.referenceService.getIndex();
  }
}

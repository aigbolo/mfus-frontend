import { Severity } from './../../../enum';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Rx';
import { ApplyScholarshipsComponent } from './../apply-scholarships.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { M040101ApplyScholarshipService } from '../../../services/students/m040101-apply-scholarship.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { ApDocumentUpload } from '../../../models/ap-document-upload';
import { LayoutService } from '../../../services/utils/layout.service';

@Component({
  selector: 'app-m040105-manage-document-upload',
  encapsulation: ViewEncapsulation.None,
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
  uploadDocument: ApDocumentUpload

  constructor(public applyApplication: ApplyScholarshipsComponent,
    private applyScholarshipService: M040101ApplyScholarshipService,
    private utilsService: UtilsService,
    private layoutService: LayoutService) { }

  ngOnInit() {
    this.initialDocumentList()
  }

  initialDocumentList() {
    this.applyApplication.applyApplicationForm.documentList = []
    this.applyScholarshipService.initialDocumentUpload().subscribe(data => {
      for (let obj of data) {
        obj.label = 'เลือกไฟล์'
        obj.upload_name = this.file_name
        this.applyApplication.applyApplicationForm.documentList.push(obj)
      }
    })
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
        this.uploadDocument.document_image = this.uploadedFiles[0].objectURL;
        this.uploadDocument.document_name = this.uploadedFiles[0].name;
        this.uploadDocument.document_type = this.uploadedFiles[0].type;
        this.uploadDocument.document_ref = ref
        this.uploadDocument.create_user = this.applyApplication.user_ref
        this.uploadDocument.update_user = this.applyApplication.user_ref
        this.utilsService
          .convertBlobToString(this.uploadDocument.document_image)
          .subscribe(val => {
            this.uploadDocument.document_image = val;
          });

        // let index = new ApDocumentUpload()
        // index = documentList.find(i => i.document_ref == ref)
        if (typeof documentList.find(i => i.document_ref == ref).upload_name === "undefined") {
          documentList.find(i => i.document_ref == ref).upload_name = this.uploadDocument.document_name
          documentList.find(i => i.document_ref == ref).label = 'แก้ไข'
          documentUpload.push(this.uploadDocument)
        } else {
          documentList.find(i => i.document_ref == ref).upload_name = this.uploadDocument.document_name
          documentList.find(i => i.document_ref == ref).label = 'แก้ไข'
          documentUpload[documentUpload.indexOf(documentUpload.find(i => i.document_ref == ref))] = this.uploadDocument;
        }

        console.log(documentUpload)
      }, 2000);
    }).subscribe()
  }

  onDelete(doc, ref) {
    this.applyApplication.applyApplicationForm.documentList.find(i => i.document_ref == ref).upload_name = ""
    this.applyApplication.applyApplicationForm.documentList.find(i => i.document_ref == ref).label = "เลือกไฟล์"
    this.applyApplication.applyApplicationForm.apDocumentUpload.splice(this.applyApplication.applyApplicationForm.documentList.indexOf(doc), 1);
    this.applyApplication.applyApplicationForm.apDocumentUpload[this.applyApplication.applyApplicationForm.documentList.indexOf(doc)]
    console.log(this.applyApplication.applyApplicationForm.apDocumentUpload)
  }

  onInsertClick() {
    console.log('student: ------------------------------------------------')
    console.log(this.applyApplication.applyApplicationForm.acStudent)
    console.log('application: --------------------------------------------')
    console.log(this.applyApplication.applyApplicationForm.apApplication)
    console.log('scholarshipHistory: -------------------------------------')
    console.log(this.applyApplication.applyApplicationForm.apScholarshipHistory)
    console.log('studentLoanFund: ----------------------------------------')
    console.log(this.applyApplication.applyApplicationForm.apStudentLoanFund)
    console.log('familyFinancial: ----------------------------------------')
    console.log(this.applyApplication.applyApplicationForm.apFamilyFinancial)
    console.log('familyDebt: ---------------------------------------------')
    console.log(this.applyApplication.applyApplicationForm.apFamiyDebt)
    console.log('documentUpload: -----------------------------------------')
    console.log(this.applyApplication.applyApplicationForm.apDocumentUpload)

    // let financialAndDebt = {
    //   ap_family_financial: this.applyApplication.applyApplicationForm.apFamilyFinancial,
    //   family_dept_list: this.applyApplication.applyApplicationForm.apFamiyDebt
    // }
    // this.applyScholarshipService.upDateStudent(this.applyApplication.applyApplicationForm.acStudent)
    //   .subscribe(res => {
    //     this.applyScholarshipService.insertApplication(this.applyApplication.applyApplicationForm.apApplication)
    //       .subscribe(res => {
    //         console.log(res)
    //         this.applyApplication.applyApplicationForm.apApplication.application_ref = res
    //         this.applyScholarshipService.insertScholarshipHistory(this.applyApplication.applyApplicationForm.apScholarshipHistory)
    //           .subscribe(res => {
    //             this.applyScholarshipService.insertStudentLoanFund(this.applyApplication.applyApplicationForm.apStudentLoanFund)
    //               .subscribe(res => {
    //                 this.applyScholarshipService.insertFamilyFinancialAndFamilyDebt(financialAndDebt)
    //                   .subscribe(res => {
    //                     this.applyApplication.applyApplicationForm.apFamilyFinancial.application_ref = this.applyApplication.applyApplicationForm.apApplication.application_ref
    //                     this.applyScholarshipService.insertDocumentUpload(this.applyApplication.applyApplicationForm.apDocumentUpload)
    //                       .subscribe(res => {
    //                         console.log('complete')
    //                       }, error => {
    //                         console.log(error)
    //                         this.layoutService.setMsgDisplay(
    //                           Severity.ERROR,
    //                           "บันทึกข้อมูลผิดพลาด",
    //                           ""
    //                         );
    //                       }, () => {

                            this.display = true
      //                     })
      //                 })
      //             })
      //         })
      //     })
      // })
  }


}

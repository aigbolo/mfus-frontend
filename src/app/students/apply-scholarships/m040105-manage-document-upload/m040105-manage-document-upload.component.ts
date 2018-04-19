import { ApDocumentUpload } from './../../../models/ap-document-upload';
import { RftApplicationDocument } from './../../../models/rft-application-document';
import { ApplyScholarshipForm } from './../../../forms/apply-scholarship-form';
import { M040102ManageScholarshipInfoComponent } from './../m040102-manage-scholarship-info/m040102-manage-scholarship-info.component';
import { Severity } from './../../../enum';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Rx';
import { ApplyScholarshipsComponent } from './../apply-scholarships.component';
import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { M040101ApplyScholarshipService } from '../../../services/students/m040101-apply-scholarship.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { LayoutService } from '../../../services/utils/layout.service';
import { NgProgress } from 'ngx-progressbar';
import { ReferenceService } from '../../../services/general/reference.service';
import { AcUser } from '../../../models/ac-user';
import { AuthenticationService } from '../../../services/general/authentication.service';

@Component({
  selector: 'app-m040105-manage-document-upload',
  templateUrl: './m040105-manage-document-upload.component.html',
  styleUrls: ['./../apply-scholarships.component.css', './m040105-manage-document-upload.component.css']
})
export class M040105ManageDocumentUploadComponent implements OnInit {

  uploadedFiles: any[] = [];
  pageRender = false;
  // display: boolean;
  // application_code:string = '';
  documentList:any[]=[];

  user: AcUser =  this.authService.getUser();

  @Input() apDocumentUploadList: ApDocumentUpload[]=[];
  @Output() changeIndex = new EventEmitter<any>();
  constructor(
    private applyScholarshipService: M040101ApplyScholarshipService,
    private utilsService: UtilsService,
    private layoutService: LayoutService,
    private ngProgress: NgProgress,
    private referenceService: ReferenceService,
    private authService: AuthenticationService,) { }

  ngOnInit() {
    this.ngProgress.start()
    this.initialDocumentList()
  }

  async initialDocumentList() {

    await new Promise((resolve)=>{
      this.applyScholarshipService.initialApplicationDocument().subscribe(
        async data=>{
          await data.map(
            async (obj)=>{
              let apDocumentUpload = new ApDocumentUpload;
              await this.apDocumentUploadList.forEach(
                docUpload=>{
                  if(docUpload.document_ref == obj.document_ref){
                    apDocumentUpload = docUpload;
                  }
                }
              )
              const rftDoc = {doc_name:obj.document_name,document_ref:obj.document_ref}
              const documentReq = {...apDocumentUpload,...rftDoc}
              console.log(documentReq);
              this.documentList = [...this.documentList,documentReq]
               return true;
            })
            return resolve()
        })
        this.ngProgress.done()
        this.pageRender = true;
    })

  }

  async onUpload(event, ref: string,index) {
    console.log('event file: ',event);

    let uploadDocument = new ApDocumentUpload();

    uploadDocument.document_image = await new Promise((resolve)=>{
      this.utilsService.convertBlobToString(event.files[0].objectURL)
      .subscribe(val => { return resolve(val)});
    })
      uploadDocument.document_ref = ref;
      uploadDocument.document_name = event.files[0].name;
      uploadDocument.document_type = event.files[0].type;
      uploadDocument.create_user = this.user.account_ref;
      uploadDocument.update_user = this.user.account_ref;

      this.documentList.forEach(
        data=>{
          if(data.document_ref == ref){
            Object.assign(data,uploadDocument)

          }

        }
      )

  }

  onDelete(ref) {

  }


  onGoBack() {
    const documentUploads = this.documentList.filter(data=>data.document_image)
    console.log('documentUploads:',documentUploads)
    const data = {
      currentIndex:4,newIndex:3,
      apDocumentUpload:[...documentUploads]
    }
    this.changeIndex.emit(data);
  }

  onInsertClick() {
    const documentUploads = this.documentList.filter(data=>data.document_image)
    const data = {
      currentIndex:4,newIndex:5,
      apDocumentUpload:[...documentUploads]
    }
    this.changeIndex.emit(data);
  }
}

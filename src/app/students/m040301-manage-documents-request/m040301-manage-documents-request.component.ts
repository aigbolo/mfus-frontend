import { Observable } from 'rxjs/Observable';
import { DocumentsRequestedService} from './../../services/students/m040301-documents-requested.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '../../services/utils/layout.service';
import { AcUser } from '../../models/ac-user';
import { AuthenticationService } from '../../services/general/authentication.service';
import { UtilsService } from '../../services/utils/utils.service';
import { ApDocumentUpload } from '../../models/ap-document-upload';
import { SmDocumentRequest } from '../../models/sm-document-request';
import { NgProgress } from 'ngx-progressbar';
import { Severity } from '../../enum';

@Component({
  selector: 'app-m040301-manage-documents-request',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m040301-manage-documents-request.component.html',
  styleUrls: ['./m040301-manage-documents-request.component.css']
})
export class M040301ManageDocumentsRequestComponent implements OnInit {
  public documentRequestList:any[] = [];
  user: AcUser =  this.authService.getUser();
  uploadedFile: any;
  constructor( private layoutService: LayoutService,
    private authService: AuthenticationService,
    private documentsRequestedService: DocumentsRequestedService,
    private utilsService: UtilsService,
    public ngProgress: NgProgress,
  ) { }

  ngOnInit() {
    this.layoutService.setPageHeader('บันทึกส่งเอกสารเพิ่มเติม');
    this.findDocumentRequested();
  }

  findDocumentRequested(){
    this.ngProgress.start();
    this.documentsRequestedService.findDocumentRequested(this.user.account_ref).subscribe(
      data=>{
        this.documentRequestList = data;
        this.ngProgress.done();
      },
      err=>{
        console.log('Exception: ',err);
      }
    );
  }
  onUpload(event,document_request_ref,document_request_detail_ref){
    var oriReader:FileReader = new FileReader();
    let image = '';
    if (event.files.length>0){
      this.uploadedFile = null;
      this.uploadedFile = event.files[0];

      oriReader.readAsDataURL(this.uploadedFile);
      oriReader.onloadend = (e) =>{ image = oriReader.result};

      setTimeout(()=>{
        for (let data of this.documentRequestList){
          if(data.document_request_ref == document_request_ref){
            for(let dr of data.document_requests){
              if(dr.document_request_detail_ref == document_request_detail_ref){
                dr.uploaded = 2;
                dr.document_name = this.uploadedFile.name;
                dr.document_type = this.uploadedFile.type;
                dr.document_image = image;
              }
            }
          }
        }
      },1000)
    }

  }

  onSubmit(data){
    this.ngProgress.start();
    let documentUploads: ApDocumentUpload[] = [];
    let documentRequest:SmDocumentRequest = new SmDocumentRequest;
    let isMaped = false;
    let unUpload:any[] = [];

    documentRequest.document_request_ref = data.document_request_ref;
    documentRequest.reply_flag = '2';
    documentRequest.update_user = this.user.account_ref;
    unUpload = data.document_requests.filter((element)=>{ return (element.uploaded == 1); });

    if(unUpload.length == 0){
      let index = 1;
      const size = data.document_requests.length;
      for(let item of data.document_requests){
        let documentUpload:ApDocumentUpload = new ApDocumentUpload;
        documentUpload.application_ref = documentRequest.application_ref;
        documentUpload.document_ref = item.document_ref;
        documentUpload.document_name = item.document_name;
        documentUpload.document_type = item.document_type;
        documentUpload.document_image = item.document_image;
        documentUpload.create_user = this.user.account_ref;
        documentUpload.update_user = this.user.account_ref;
        documentUploads = documentUploads.concat(documentUpload);
        if(index<size){
          index += 1;
        }else{
          isMaped = true;
        }
      }
      this.documentsRequestedService.updateDocumentUpload(data.application_ref,documentUploads).subscribe(
        data=>{
          this.documentsRequestedService.updateDocumentRequestFlag(documentRequest).subscribe(
            data=>{
              this.layoutService.setMsgDisplay(Severity.SUCCESS,"บันทึกส่งเอกสารเพิ่มเติมสำเร็จ","");
              this.findDocumentRequested();
              this.ngProgress.done();
            },
            err=>{
              this.layoutService.setMsgDisplay(Severity.ERROR,"เกิดข้อผิดพลาด","");
              console.log('error: ',err)
              this.ngProgress.done();
            }
          )
        },err=>{
          this.layoutService.setMsgDisplay(Severity.ERROR,"เกิดข้อผิดพลาด","");
          console.log('error',err)
          this.ngProgress.done();
        }
      )
    }
  }
  ngOnDestroy() {
    this.ngProgress.done();
  }

}

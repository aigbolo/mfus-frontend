import { ConfigurationService } from './../utils/configuration.service';
import { Injectable } from '@angular/core';
import { SmDocumentRequest } from '../../models/sm-document-request';
@Injectable()
export class DocumentsRequestedService {

  constructor(
    private configurationService: ConfigurationService
  ) { }

  findDocumentRequested(studentRef){
    const body = {student_ref:studentRef};
    return this.configurationService.requestMethodPOST('documentrequest',body);
  }

  updateDocumentUpload(applicationRef,documentUploads){
    const body = {application_ref:applicationRef,document_uploads:documentUploads}
    return this.configurationService.requestMethodPOST('documentupload-request-insert',body);
  }

  updateDocumentRequestFlag(documentRequest:SmDocumentRequest){

    return this.configurationService.requestMethodPOST('documentrequest-update-flag',documentRequest);
  }
}

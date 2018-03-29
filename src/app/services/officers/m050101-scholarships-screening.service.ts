import { ScholarshipScreeningForm } from './../../forms/scholarship-screening-form';
import { Injectable } from '@angular/core';
import { ReferenceService } from './../general/reference.service';
import { ConfigurationService } from './../utils/configuration.service';
@Injectable()
export class M050101ScholarshipsScreeningService {



  constructor(private config: ConfigurationService,
              private referenceService: ReferenceService,) { }

      doSearch(form:ScholarshipScreeningForm){
        return this.config.requestMethodPOST('document_screening',form.search_criteria);
      }

      doCreateRequestDocument(form:ScholarshipScreeningForm){
        return this.config.requestMethodPOST('documentrequest-insert',form);
      }

      doUpdateRequestDocument(form:ScholarshipScreeningForm){
        return this.config.requestMethodPUT('documentrequest',form);
      }

      getDocumentRequestLatest(applicationRef:string){
        let param = {application_ref:applicationRef,reply_flag:'1'}
        return this.config.requestMethodPOST('documentrequest-update',param);
      }

      getDocumentRequestDetailLatest(applicationRef:string){
        let param = {application_ref:applicationRef}
        return this.config.requestMethodPOST('documentrequest-detail-update',param);
      }

  }

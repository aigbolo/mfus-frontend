import { ScholarshipScreeningForm } from './../../forms/scholarship-screening-form';
import { Injectable } from '@angular/core';
import { ReferenceService } from './../general/reference.service';
import { ConfigurationService } from './../utils/configuration.service';
@Injectable()
export class M050101ScholarshipsScreeningService {



  constructor(private config: ConfigurationService,
              private referenceService: ReferenceService,) { }

  doSearch(form:ScholarshipScreeningForm){
    console.log(JSON.stringify(form.search_criteria))
    return this.config.requestMethodPOST('document_screening',form.search_criteria);
  }

  doRequestDocument(form:ScholarshipScreeningForm){
    console.log(form);
    return this.config.requestMethodPOST('documentrequest-insert',form);
  }

  }

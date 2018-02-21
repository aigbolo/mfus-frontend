import { Injectable } from '@angular/core';
import { ScholarshipEarningForm } from './../../forms/scholarship-earning-form';
import { ReferenceService } from './../general/reference.service';
import { ConfigurationService } from './../utils/configuration.service';
@Injectable()
export class M050103ScholarshipEarningService {



  constructor(private config: ConfigurationService,
              private referenceService: ReferenceService,) { }

      doSearch(form:ScholarshipEarningForm){
        return this.config.requestMethodPOST('scholarship-grantee',form.search_criteria);
      }

  }

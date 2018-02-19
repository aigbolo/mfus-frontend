import { Injectable } from '@angular/core';
import { ReferenceService } from './../general/reference.service';
import { ConfigurationService } from './../utils/configuration.service';
import { ScholarshipEarningForm } from '../../forms/scholarship-earning-form';

@Injectable()
export class M050103ScholarshipEarningService {

  constructor(private config: ConfigurationService,
              private referenceService: ReferenceService,) { }

      doSearch(form:ScholarshipEarningForm){
        return this.config.requestMethodPOST('scholarship-grantee',form.search_criteria);
      }
    }
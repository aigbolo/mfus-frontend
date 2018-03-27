import { Injectable } from '@angular/core';
import { ScholarshipEarningForm } from './../../forms/scholarship-earning-form';
import { ReferenceService } from './../general/reference.service';
import { ConfigurationService } from './../utils/configuration.service';
import { ApApplication } from '../../models/ap-application';
@Injectable()
export class M050103ScholarshipEarningService {



  constructor(private config: ConfigurationService,
              private referenceService: ReferenceService,) { }

      doSearch(form:ScholarshipEarningForm){
        return this.config.requestMethodPOST('applicants',form.search_criteria);
      }

      doSearchInterviewees(announcementRef){
        const body = {announcement_ref:announcementRef,interview_flag:'2'};
        return this.config.requestMethodPOST('interviewees',body);
      }
      doInsert(applications:ApApplication[]){
        return this.config.requestMethodPUT('apply-grantee',applications);
      }



  }

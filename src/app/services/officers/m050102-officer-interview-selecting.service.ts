import { HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './../utils/configuration.service';
import { Injectable } from '@angular/core';
import { InterviewForm } from '../../forms/interview-form';
import { ApApplication } from '../../models/ap-application';

@Injectable()
export class M050102OfficerInterviewSelectingService{
    constructor(private config: ConfigurationService) { }

    doSearch(form:InterviewForm){
        console.log(form.search_criteria);
        return this.config.requestMethodPOST('applicants',form.search_criteria);
    }
    doUpdateRequestDocument(form:InterviewForm){
      return this.config.requestMethodPUT('applicants',form);
    }

    updateInterviewees(applications: ApApplication[]) {
      return this.config.requestMethodPUT('apply-grantee', applications)
    }

}

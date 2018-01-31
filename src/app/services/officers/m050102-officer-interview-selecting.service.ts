import { HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './../utils/configuration.service';
import { Injectable } from '@angular/core';
import { InterviewForm } from '../../forms/interview-form';

@Injectable()
export class M050102OfficerInterviewSelectingService{
    constructor(private config: ConfigurationService) { }

    doSearch(form:InterviewForm){
        console.log(form.search_criteria);
        return this.config.requestMethodPOST('applicants',form.search_criteria);
    }
}
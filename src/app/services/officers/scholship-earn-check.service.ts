import { ScholarshipEarnCheckForm } from './../../forms/scholarship-earn-check';
import { HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './../utils/configuration.service';
import { Injectable } from '@angular/core';
import { InterviewForm } from '../../forms/interview-form';
import { ApApplication } from '../../models/ap-application';

@Injectable()
export class ScholarshipEarnCheckService{
    constructor(private config: ConfigurationService) { }

    doSearch(form:ScholarshipEarnCheckForm){
        console.log(form.search_criteria);
        return this.config.requestMethodPOST('grantee',form.search_criteria);
    }

}

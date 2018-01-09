import { HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './../utils/configuration.service';
import { Injectable } from '@angular/core';
import { ScholarshipAnnouncementForm } from '../../forms/scholarship-announcement-form';

@Injectable()
export class M030103ScholarshipAnnouncementService {



  constructor(private config: ConfigurationService) { }

  doSearch(form:ScholarshipAnnouncementForm){
    console.log(form.search_criteria);
    return this.config.requestMethodPOST('scholarships-announcement',form.search_criteria);
  }

  doInsert(form:ScholarshipAnnouncementForm){
    console.log('doInsert')
    console.log(JSON.stringify(form.scholarships_announcement))
    return this.config.requestMethodPOST('scholarships-announcement-insert',form.scholarships_announcement)

  }

  doUpdate(form:ScholarshipAnnouncementForm){
    console.log('doUpdate')
    return this.config.requestMethodPUT('scholarships-announcement',form.scholarships_announcement)
  }


  onRowSelect(form:ScholarshipAnnouncementForm){
    console.log('onRowSelects');
    return this.config.requestMethodPOST('sponsors-update',form.scholarships_announcement)
  }
}

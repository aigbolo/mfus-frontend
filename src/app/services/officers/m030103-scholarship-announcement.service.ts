import { HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './../utils/configuration.service';
import { Injectable } from '@angular/core';
import { ScholarshipAnnouncementForm } from '../../forms/scholarship-announcement-form';
import { SmScholarshipAnnouncement } from '../../models/sm-scholarship-announcement';
import { SmScholarship } from '../../models/sm-scholarship';
import { M030102ScholarshipService } from './m030102-scholarship.service';

@Injectable()
export class M030103ScholarshipAnnouncementService {



  constructor(private config: ConfigurationService,
              private scholarshipService: M030102ScholarshipService) { }

  doSearch(form:ScholarshipAnnouncementForm){
    return this.config.requestMethodPOST('scholarships-announcement',form.search_criteria);
  }

  doInsert(form:ScholarshipAnnouncementForm){
    return this.config.requestMethodPOST('scholarships-announcement-insert',form.scholarships_announcement)

  }

  doUpdate(form:ScholarshipAnnouncementForm){
    return this.config.requestMethodPUT('scholarships-announcement',form.scholarships_announcement)
  }


  onRowSelect(model:SmScholarshipAnnouncement){
    return this.config.requestMethodPOST('scholarships-announcement-update',model)
  }

  getScholarship(scholarhipRef:string){
    console.log(scholarhipRef);
    let model: SmScholarship = new SmScholarship();
    model.scholarship_ref = scholarhipRef;
    console.log(JSON.stringify(model));
    return this.scholarshipService.selectScholarship(model);
  }

}

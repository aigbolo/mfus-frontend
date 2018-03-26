import { ReferenceService } from './../general/reference.service';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './../utils/configuration.service';
import { Injectable } from '@angular/core';
import { ScholarshipAnnouncementForm } from '../../forms/scholarship-announcement-form';
import { SmScholarshipAnnouncement } from '../../models/sm-scholarship-announcement';
import { SmScholarship } from '../../models/sm-scholarship';
import { M030102ScholarshipService } from './m030102-scholarship.service';
import { SmSponsors } from '../../models/sm-sponsors';

@Injectable()
export class M030103ScholarshipAnnouncementService {



  constructor(private config: ConfigurationService,
              private scholarshipService: M030102ScholarshipService,
              private referenceService: ReferenceService,) { }

  doSearch(form:ScholarshipAnnouncementForm){
    console.log(JSON.stringify(form.search_criteria))
    return this.config.requestMethodPOST('scholarships-announcement',form.search_criteria);
  }

  doInsert(form:ScholarshipAnnouncementForm){
    return this.config.requestMethodPOST('scholarships-announcement-insert',form.scholarships_announcement)

  }

  doUpdate(form:ScholarshipAnnouncementForm){
    return this.config.requestMethodPUT('scholarships-announcement',form.scholarships_announcement)
  }


  getScholarshipAnnouncement(model:SmScholarshipAnnouncement){
    return this.config.requestMethodPOST('scholarships-announcement-update',model)
  }

  getScholarshipAnnouncementList(type: any){
    return this.config.requestMethodPOST('scholarship-list',type)
  }
}

import { SmScholarshipAnnouncement } from "../models/sm-scholarship-announcement";





export class ScholarshipAnnouncementForm {

  scholarships_announcement: SmScholarshipAnnouncement;
  search_criteria:SearchCriteria;


  constructor(){
    this.scholarships_announcement = new SmScholarshipAnnouncement;
    this.search_criteria = new SearchCriteria;
  }
}

class SearchCriteria{
  sponsors_name: string;
  active_flag: string;
  constructor(){
  this.sponsors_name = null;
  this.active_flag = null;
  }
}

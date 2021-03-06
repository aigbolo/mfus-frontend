import { SmScholarshipAnnouncement } from "../models/sm-scholarship-announcement";
import { ApApplication } from "../models/ap-application";

export class ScholarshipEarningForm{
  application: ApApplication;
  search_criteria:SearchCriteria;
  scholarshipAnnouncement: SmScholarshipAnnouncement;

constructor(){
  this.application = new ApApplication;
  this.search_criteria = new SearchCriteria;
  this.scholarshipAnnouncement = new SmScholarshipAnnouncement;
}
}

class SearchCriteria{
  year: number;
  announcement_ref: string;

  constructor(){
    this.year = null;
    this.announcement_ref = null;
  }
}

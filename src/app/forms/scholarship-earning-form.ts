import { SmScholarshipAnnouncement } from "../models/sm-scholarship-announcement";
import { ApApplication } from "../models/ap-application";

export class ScholarshipEarningForm{
  scholarshipAnnouncement: SmScholarshipAnnouncement;
  search_criteria:SearchCriteria;
  application: ApApplication;
  
constructor(){
  this.application = new ApApplication;
  this.search_criteria = new SearchCriteria();
  this.scholarshipAnnouncement = new SmScholarshipAnnouncement;
  this.application = new ApApplication;
}
}

class SearchCriteria{
  year: number;
  announcement_ref: string;
  interview_start_date: string;
  interview_end_date: string;
  document_ref_no: string;
  round: number;
  constructor(){
    this.year = null;
    this.announcement_ref = null;
    this.interview_start_date = null;
    this.interview_end_date = null;
    this.document_ref_no = null;
    this.round = null;
}
}
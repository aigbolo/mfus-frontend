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
  year: number;
  round: number;
  document_ref_no: string;
  sponsors_ref: string;
  scholarship_ref:string;
  constructor(){
  this.year = null;
  this.round = null;
  this.document_ref_no = null;
  this.sponsors_ref = null;
  this.scholarship_ref = null;
  }
}

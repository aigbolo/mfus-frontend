import { AcStudent } from './../models/ac-student';
import { ApApplication } from "./../models/ap-application";
import { SmScholarshipAnnouncement } from "../models/sm-scholarship-announcement";
import { SmScholarship } from "../models/sm-scholarship";

export class InterviewForm {
  student: AcStudent;
  scholarshipAnnouncement: SmScholarshipAnnouncement;
  search_criteria: SearchCriteria;
  application_ref: ApApplication;
  application: ApApplication;
  selected_interviewees: ApApplication;


  constructor() {
    this.student = new AcStudent;
    this.application_ref = new ApApplication;
    this.application = new ApApplication;
    this.selected_interviewees = new ApApplication;
    this.scholarshipAnnouncement = new SmScholarshipAnnouncement;
    this.search_criteria = new SearchCriteria();
  }
}

class SearchCriteria {
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

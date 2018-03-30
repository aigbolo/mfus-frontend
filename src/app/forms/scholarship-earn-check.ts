import { AcStudent } from "./../models/ac-student";
import { ApApplication } from "./../models/ap-application";
import { SmScholarshipAnnouncement } from "../models/sm-scholarship-announcement";
import { SmScholarship } from "../models/sm-scholarship";

export class ScholarshipEarnCheckForm {
  student: AcStudent;
  application: ApApplication;
  application_ref: ApApplication;
  scholarshiP_ref: SmScholarship
  scholarshipAnnouncement: SmScholarshipAnnouncement;

  search_criteria: SearchCriteria;

  constructor() {
    this.student = new AcStudent();
    this.application_ref = new ApApplication();
    this.application = new ApApplication();
    this.scholarshipAnnouncement = new SmScholarshipAnnouncement();
    this.search_criteria = new SearchCriteria();
  }
}

class SearchCriteria {
  year: number;
  school_ref: string;
  major_ref: string;
  round: number;
  student_id: string;
  scholarship_ref:string
  constructor() {
    this.year = null;
    this.round = null;
    this.school_ref = null;
    this.scholarship_ref = null;
    this.major_ref = null;
    this.student_id = null;
  }
}

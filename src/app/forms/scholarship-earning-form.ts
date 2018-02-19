<<<<<<< HEAD
import { SmConditionMajor } from "../models/sm-condition-major";
import { SmScholarship } from "../models/sm-scholarship";

export class ScholarshipEarningForm {

    search_criteria:SearchCriteria;

    constructor(){
        this.search_criteria = new SearchCriteria();
        // this.scholarships_earning = new SmScholarshipEarning;
    }

}

class SearchCriteria{
    year:number;
    announcement_ref: string;

constructor() {
    this.year = null;
    this.announcement_ref = null;

}
}

//     class SmScholarshipEarning{
//         year: number;
//         round: number;
//         document_ref_no: string;
//         sponsors_ref: string;
//         scholarship_ref:string;
//         announcement_ref: string;
//         unit: number;
//         financial_aid: number;
//         announce_interview_date: Date;
//         scholarship_type: string;
//         scholarship_name: string;

//         constructor(){
//         this.year = null;
//         this.round = null;
//         this.document_ref_no = null;
//         this.sponsors_ref = null;
//         this.scholarship_ref = null;
//         this.announcement_ref = null;
//         this.unit = null;
//         this.financial_aid = null;
//         this.announce_interview_date = null;
//         this.scholarship_type = null;
//         this.scholarship_name = null;
//         }
// }
=======

export class ScholarshipEarningForm{

  search_criteria:SearchCriteria;
constructor(){
  this.search_criteria = new SearchCriteria();
}
}

class SearchCriteria{
  year:number;
  announcement_ref:string;
  constructor(){
    this.year = null;
    this.announcement_ref = null;
  }
}
>>>>>>> eb9f2652a84877f828f3d15f3a39823f04659633

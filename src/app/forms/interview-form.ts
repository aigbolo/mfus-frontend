import { SmScholarshipAnnouncement } from "../models/sm-scholarship-announcement";
import { SmScholarship } from "../models/sm-scholarship";

export class InterviewForm{
    smScholarshipAnnouncement: SmScholarshipAnnouncement;
    search_criteria: SearchCriteria;
    constructor(){
        this.search_criteria = new SearchCriteria();
    }
}

class SearchCriteria{
    year:string;
    scholarship_ref:string;
    interview_start_date:string;
    interview_end_date:string;
}

import { SmScholarship } from "../models/sm-scholarship";
import { SmSponsors } from '../models/sm-sponsors';

export class ScholarshipForm{
  smScholarship: SmScholarship;
  smSponsors: SmSponsors;
  searchCriteria: SearchCriteria;
  activeFlag: any[]

  constructor(){
    this.smScholarship = new SmScholarship();
    this.smSponsors = new SmSponsors();
    this.searchCriteria = new SearchCriteria();
  }
}

class SearchCriteria{
  active_flag: string
  sponsors_ref: string
  scholarship_type: string
  scholarship_name: string

}

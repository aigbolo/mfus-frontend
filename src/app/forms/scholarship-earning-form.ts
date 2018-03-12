import { ApApplication } from "../models/ap-application";

export class ScholarshipEarningForm{
  application: ApApplication;
  search_criteria:SearchCriteria;
constructor(){
  this.application = new ApApplication;
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

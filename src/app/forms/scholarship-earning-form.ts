
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

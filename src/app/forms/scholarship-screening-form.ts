export class ScholarshipScreeningForm {


  search_criteria:SearchCriteria;

  constructor(){

    this.search_criteria = new SearchCriteria;
  }
}

class SearchCriteria{
  year: number;
  announcement_ref: string;
  school_ref: string;
  major_ref: string;
  document_screening_flag: string;
  constructor(){
  this.year = null;
  this.announcement_ref = null;
  this.school_ref = null;
  this.major_ref = null;
  this.document_screening_flag = null;
  }
}


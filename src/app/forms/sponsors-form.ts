import { SmSponsors } from './../models/sm-sponsors';



export class SponsorsForm {

  sponsors: SmSponsors;
  search_criteria:SearchCriteria;

  constructor(){
    this.sponsors = new SmSponsors;
    this.search_criteria = new SearchCriteria;
  }
}

class SearchCriteria{
  sponsors_name: string;
  active_flag: string;
  constructor(){
  this.sponsors_name = null;
  this.active_flag = null;
  }
}


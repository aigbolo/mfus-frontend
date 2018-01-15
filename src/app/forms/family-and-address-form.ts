import { AcSibling } from './../models/ac-sibling';
import { AcAddress } from './../models/ac-address';
import { AcParent } from './../models/ac-parent';
export class FamilyAndAddressForm {



  public acParent: AcParent;
  public acAddress: AcAddress;
  public siblingList: AcSibling[];

  public search_criteria:SearchCriteria;

  constructor() {
    this.acParent = new AcParent();
    this.acAddress = new AcAddress();
    this.siblingList = [];
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


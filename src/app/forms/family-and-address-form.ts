import { RftSubDistrict } from './../models/rft-sub-district';
import { RftDistrict } from './../models/rft-district';
import { RftProvince } from './../models/rft-province';
import { AcSibling } from './../models/ac-sibling';
import { AcAddress } from './../models/ac-address';
import { AcParent } from './../models/ac-parent';
export class FamilyAndAddressForm {



  public acParent: AcParent;
  public acAddress: AcAddress;
  public siblingList: AcSibling[];

  public dadProvince: RftProvince;
  public dadDistrict: RftDistrict;
  public dadSubDistrict: RftSubDistrict;

  public momProvince: RftProvince;
  public momDistrict: RftDistrict;
  public momSubDistrict: RftSubDistrict;

  public patrolProvince: RftProvince;
  public patrolDistrict: RftDistrict;
  public patrolSubDistrict: RftSubDistrict;

  public homeProvince: RftProvince;
  public homeDistrict: RftDistrict;
  public homeSubDistrict: RftSubDistrict;

  public currentProvince: RftProvince;
  public currentDistrict: RftDistrict;
  public currentSubDistrict: RftSubDistrict;


  public search_criteria:SearchCriteria;

  constructor() {
    this.acParent = new AcParent();
    this.acAddress = new AcAddress();
    this.siblingList = [];

  this.dadProvince = new RftProvince();
  this.dadDistrict = new RftDistrict();
  this.dadSubDistrict = new RftSubDistrict();

  this.momProvince = new RftProvince();
  this.momDistrict = new RftDistrict();
  this.momSubDistrict = new RftSubDistrict();

  this.patrolProvince = new RftProvince();
  this.patrolDistrict = new RftDistrict();
  this.patrolSubDistrict = new RftSubDistrict();

  this.homeProvince = new RftProvince();
  this.homeDistrict = new RftDistrict();
  this.homeSubDistrict = new RftSubDistrict();

  this.currentProvince = new RftProvince();
  this.currentDistrict = new RftDistrict();
  this.currentSubDistrict = new RftSubDistrict();


    this.search_criteria = new SearchCriteria;
  }
}

class SearchCriteria{

  constructor(){

  }
}


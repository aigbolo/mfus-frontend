
import { AcOfficer } from '../models/ac-officer';
import { RftProvince } from'../models/rft-province';
import { RftDistrict } from'../models/rft-district';
import { RftSubDistrict } from'../models/rft-sub-district';

export class OfficerForm {

public acOfficer: AcOfficer;
public rftProvince: RftProvince;
public rftDistrict: RftDistrict;
public rftSubDistrict: RftSubDistrict;
public fullname: string;
public status: string;

public searchCriteria:SearchCriteria;

constructor(){
	this.acOfficer = new AcOfficer();
	this.rftProvince = new RftProvince();
	this.rftDistrict = new RftDistrict();
  this.rftSubDistrict = new RftSubDistrict();
  this.searchCriteria = new SearchCriteria();
	}
}

class SearchCriteria{
  public officer_code: string;
  public first_name: string;
  public last_name: string;
  public personal_id: string;
  public active_flag: string;
}

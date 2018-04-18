import { RftEducationLevel } from './../models/rft-education-level';
import { RftSubDistrict } from './../models/rft-sub-district';
import { RftDistrict } from './../models/rft-district';
import { RftProvince } from './../models/rft-province';
import { RftMajor } from './../models/rft-major';
import { RftSchool } from './../models/rft-school';
import { AcAddress } from './../models/ac-address';
import { AcParent } from './../models/ac-parent';
import { ApFamilyFinancial } from './../models/ap-family-financial';
import { ApStudentLoanFund } from './../models/ap-student-loan-fund';
import { SmScholarshipAnnouncement } from './../models/sm-scholarship-announcement';
import { AcStudent } from '../models/ac-student';
import { ApApplication } from '../models/ap-application';
import { ApScholarshipHistory } from '../models/ap-scholarship-history';
import { ApFamilyDebt } from '../models/ap-family-debt';
import { AcSibling } from '../models/ac-sibling';
import { ApDocumentUpload } from '../models/ap-document-upload';

export class ApplyScholarshipForm{
  public acStudent: AcStudent = new AcStudent;
  public apApplication: ApApplication = new ApApplication;
  public smScholarshipAnnouncement: SmScholarshipAnnouncement = new SmScholarshipAnnouncement;
  public apScholarshipHistorys: ApScholarshipHistory[] = [];
  public apStudentLoanFunds: ApStudentLoanFund[] = [];
  public apFamiyDebt: ApFamilyDebt[] = [];
  public apFamilyFinancial: ApFamilyFinancial = new ApFamilyFinancial;
  public acParent: AcParent = new AcParent;
  public acSiblings: AcSibling[] = [];
  public acAddress: AcAddress = new AcAddress;
  public apDocumentUpload: ApDocumentUpload[] = [];
  public rftSchool: RftSchool = new RftSchool;
  public rftMajor: RftMajor = new RftMajor;
  public student_name: string;
  public age: number;
  public birth_day: string;
  public year: string;
  public autocompleteScholarshipAnnouncement: any;
  public detail: string;
  public min_gpax: string;
  public sctype_name: string;
  public sponsors_name: string;
  public documentList: any[];
  public school_name_t: string;
  public major_name_t: string;
  public gender: string;
  public search_criteria:SearchCriteria;


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
  public siblingList: AcSibling[];
  public parentsFlag: string;
  public educationLevelList: RftEducationLevel[]
  public educationLevel: string

}
class SearchCriteria{
  public year: number;
  public application_code: string;
  public process_status: string;
  public scholarship_ref: string;
  public student_ref: string;
  constructor(){
    this.year = null;
    this.application_code = null;
    this.process_status = null;
    this.scholarship_ref = null;
    this.student_ref = null;
    }
}


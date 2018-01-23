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
  public acStudent: AcStudent;
  public apApplication: ApApplication;
  public smScholarshipAnnouncement: SmScholarshipAnnouncement;
  public apScholarshipHistory: ApScholarshipHistory[];
  public apStudentLoanFund: ApStudentLoanFund[];
  public apFamiyDebt: ApFamilyDebt[];
  public apFamilyFinancial: ApFamilyFinancial;
  public acParent: AcParent;
  public acSibling: AcSibling;
  public acAddress: AcAddress;
  public apDocumentUpload: ApDocumentUpload[];
  public rftSchool: RftSchool;
  public rftMajor: RftMajor;
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

  constructor(){
    this.acStudent = new AcStudent()
    this.apApplication = new ApApplication()
    this.smScholarshipAnnouncement = new SmScholarshipAnnouncement
    this.apScholarshipHistory = []
    this.apStudentLoanFund = []
    this.apFamiyDebt = []
    this.apFamilyFinancial = new ApFamilyFinancial
    this.acParent = new AcParent
    this.acSibling = new AcSibling
    this.acAddress = new AcAddress
    this.apDocumentUpload = []
    this.rftSchool = new RftSchool
    this.rftMajor = new RftMajor
    this.student_name = ""
    this.age = null
    this.birth_day = ""
    this.year = ""
    this.autocompleteScholarshipAnnouncement = null
    this.detail = ""
    this.min_gpax = ""
    this.sctype_name = ""
    this.sponsors_name = ""
    this.documentList = []
    this.school_name_t = ""
    this.major_name_t = ""
    this.gender = ""

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

  this.siblingList = []

  this.parentsFlag = ""
  this.educationLevelList = []
  this.educationLevel = ""
    this.acStudent = new AcStudent();
    this.apApplication = new ApApplication();
    this.smScholarshipAnnouncement = new SmScholarshipAnnouncement;
    this.apScholarshipHistory = [];
    this.apStudentLoanFund = [];
    this.apFamiyDebt = [];
    this.apFamilyFinancial = new ApFamilyFinancial;
    this.acParent = new AcParent;
    this.acSibling = new AcSibling;
    this.acAddress = new AcAddress;
    this.apDocumentUpload = [];
    this.rftSchool = new RftSchool;
    this.rftMajor = new RftMajor;
    this.student_name = "";
    this.age = null;
    this.birth_day = "";
    this.year = "";
    this.autocompleteScholarshipAnnouncement = null;
    this.detail = "";
    this.min_gpax = "";
    this.sctype_name = "";
    this.sponsors_name = "";
    this.documentList = [];
    this.school_name_t = "";
    this.major_name_t = "";
    this.gender = "";

    this.search_criteria = new SearchCriteria;
  }


}
class SearchCriteria{
  public year: number;
  public application_code: string;
  public process_status: string;
  public scholarship_ref: string;
  constructor(){
    this.year = null;
    this.application_code = null;
    this.process_status = null;
    this.scholarship_ref = null;
    }
}


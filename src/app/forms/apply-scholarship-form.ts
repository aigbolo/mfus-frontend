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
  public acStudent: AcStudent
  public apApplication: ApApplication
  public smScholarshipAnnouncement: SmScholarshipAnnouncement
  public apScholarshipHistory: ApScholarshipHistory[]
  public apStudentLoanFund: ApStudentLoanFund
  public apFamiyDebt: ApFamilyDebt
  public apFamilyFinancial: ApFamilyFinancial
  public acParent: AcParent
  public acSibling: AcSibling
  public acAddress: AcAddress
  public apDocumentUpload: ApDocumentUpload
  public rftSchool: RftSchool
  public rftMajor: RftMajor
  public fullname: string
  public age: number
  public birth_day: string
  public year: string

  constructor(){
    this.acStudent = new AcStudent()
    this.apApplication = new ApApplication()
    this.smScholarshipAnnouncement = new SmScholarshipAnnouncement
    this.apScholarshipHistory = []
    this. apStudentLoanFund = new ApStudentLoanFund
    this.apFamiyDebt = new ApFamilyDebt
    this.apFamilyFinancial = new ApFamilyFinancial
    this.acParent = new AcParent
    this.acSibling = new AcSibling
    this.acAddress = new AcAddress
    this.apDocumentUpload = new ApDocumentUpload
    this.rftSchool = new RftSchool
    this.rftMajor = new RftMajor
    this.fullname = ""
    this.age = null
    this.birth_day = ""
    this.year = ""
  }
}

import { RftSchool } from './../models/rft-school';
import { SmScholarship } from './../models/sm-scholarship';
import { RftMajor } from '../models/rft-major';
export class DocumentScreenForm{

  public scholarshipList: SmScholarship[]
  public schoolList: RftSchool[]
  public majorList: RftMajor[]
  public scholarship: SmScholarship
  public school: RftSchool
  public major: RftMajor

  constructor(){
    this.scholarshipList = []
    this.schoolList = []
    this.majorList = []
    this.school = new RftSchool()
    this.major = new RftMajor()
  }
}

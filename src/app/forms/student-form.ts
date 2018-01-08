import { RftMajor } from './../models/rft-major';
import { RftSchool } from '../models/rft-school';
import { AcStudent } from '../models/ac-student';

export class StudentForm{
  public rftSchool: RftSchool
  public acStudent: AcStudent
  public rftMajor: RftMajor

  constructor(){
    this.rftMajor = new RftMajor()
    this.rftSchool = new RftSchool()
    this.acStudent = new AcStudent()
  }
}


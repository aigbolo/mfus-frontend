import { AcOfficer } from './../models/ac-officer';
import { AcStudent } from './../models/ac-student';
import { AcUser } from './../models/ac-user';

export class LoginForm{
  user: AcUser = new AcUser;
  student: AcStudent = new AcStudent;
  officer: AcOfficer = new AcOfficer;

  constructor(){
    this.user = new AcUser();
    this.student = new AcStudent();
    this.officer = new AcOfficer();
  }
}

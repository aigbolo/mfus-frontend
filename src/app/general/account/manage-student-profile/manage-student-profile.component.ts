import { NgProgress } from 'ngx-progressbar';
import { LayoutService } from './../../../services/utils/layout.service';
import { Severity } from './../../../enum';
import { M010101StudentService } from './../../../services/students/m010101-student.service';
import { SelectItem } from 'primeng/primeng';
import { CalendarModel } from './../../../models/calendar-model';
import { AuthenticationService } from './../../../services/general/authentication.service';
import { RftMajor } from './../../../models/rft-major';
import { ReferenceService } from './../../../services/general/reference.service';
import { RftSchool } from './../../../models/rft-school';
import { StudentForm } from './../../../forms/student-form';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-manage-student-profile',
  templateUrl: './manage-student-profile.component.html',
  styleUrls: ['./manage-student-profile.component.css']
})
export class ManageStudentProfileComponent extends CalendarModel implements OnInit {

  majorsList: RftMajor[]
  schoolList: RftSchool[]
  pageRender: boolean = false
  studentFormGroup: FormGroup;
  manageStudentForm: StudentForm = new StudentForm();
  uploadedFiles: any[] = [];
  titleList: SelectItem[]
  constructor(public utilsService: UtilsService,
    private referenceService: ReferenceService,
    private authService: AuthenticationService,
    private m010101ManageStudentService: M010101StudentService,
    private layoutService: LayoutService,
    private ngprogress: NgProgress) {
    super();

  }

  ngOnInit() {
    this.ngprogress.start()
    this.gettitleList()
    this.initialData()
    this.referenceService.initialSchools();
    this.validateForm()
  }

  initialData() {
    this.manageStudentForm.acStudent.student_ref = this.authService.getUser().account_ref
    this.m010101ManageStudentService.doSelect(this.manageStudentForm.acStudent).subscribe(data => {
      console.log(data)
      this.manageStudentForm.acStudent = data
      this.manageStudentForm.acStudent.birth_date = new Date(this.manageStudentForm.acStudent.birth_date)
      this.referenceService.getSchoolByRef(this.manageStudentForm.acStudent.school_ref).subscribe(
        data => {
          this.manageStudentForm.rftSchool = data
        }, error => {
        }, () => {
          this.referenceService.getMajorByRef(this.manageStudentForm.acStudent.major_ref).subscribe(
            data => {
              this.manageStudentForm.rftMajor = data
            }, error => {
            }, () => {
              this.ngprogress.done();
              this.pageRender = true
            }
          )
        })
    },error=>{
      console.log(error)
    }
  )
  }

  gettitleList() {
    this.titleList = this.utilsService.getTitleList()
  }

  validateForm() {
    this.studentFormGroup = new FormGroup({
      personal_id: new FormControl(
        this.manageStudentForm.acStudent.personal_id,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ])
      ),
      student_id: new FormControl(
        this.manageStudentForm.acStudent.student_id,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ])
      ),
      gender: new FormControl((this.manageStudentForm.acStudent.gender)),
      first_name_t: new FormControl(
        this.manageStudentForm.acStudent.first_name_t,
        Validators.compose([Validators.required])
      ),
      birth_date: new FormControl(
        this.manageStudentForm.acStudent.birth_date,
        Validators.compose([Validators.required])
      ),
      title_ref: new FormControl(
        (this.manageStudentForm.acStudent.title_ref)
      ),
      last_name_t: new FormControl(
        this.manageStudentForm.acStudent.last_name_t,
        Validators.compose([Validators.required])
      ),
      first_name_e: new FormControl(
        this.manageStudentForm.acStudent.first_name_e
      ),
      last_name_e: new FormControl(
        this.manageStudentForm.acStudent.last_name_e
      ),
      school: new FormControl(this.manageStudentForm.rftSchool),
      major: new FormControl(this.manageStudentForm.rftMajor),
      nationality: new FormControl(
        this.manageStudentForm.acStudent.nationality
      ),
      race: new FormControl(this.manageStudentForm.acStudent.race),
      religion: new FormControl(this.manageStudentForm.acStudent.religion),
      phone_no: new FormControl(
        this.manageStudentForm.acStudent.phone_no,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ])
      ),
      email: new FormControl(
        this.manageStudentForm.acStudent.email,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          )
        ])
      )
    });
  }

  getYearRange() {
    let yearRange: number = new Date().getFullYear();
    return yearRange - 30 + ":" + yearRange;
  }

  autoCompleteSchools(event) {
    let query = event.query;
    this.schoolList = [];
    let objList: RftSchool[];
    objList = this.referenceService.getSchool();
    for (let obj of objList) {
      if (obj.school_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.schoolList.push(obj);
      }
    }
  }

  handleCompleteClickSchools() {
    setTimeout(() => {
      this.schoolList = this.referenceService.getSchool();
    }, 100);
  }

  selectSchool() {
    this.referenceService.initialMajors(
      this.manageStudentForm.rftSchool.school_ref
    );
    setTimeout(() => {
      this.manageStudentForm.rftMajor = new RftMajor();
    }, 100);
  }

  autoCompleteMajor(event) {
    let query = event.query;
    this.majorsList = [];
    let objList: RftMajor[];
    objList = this.referenceService.getMajors();
    console.log(objList);
    for (let obj of objList) {
      if (obj.major_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.majorsList.push(obj);
      }
    }
  }

  handleCompleteClickMajor() {
    setTimeout(() => {
      this.majorsList = this.referenceService.getMajors();
    }, 100);
  }

  onUpload(event) {
    if (event.files != null) this.uploadedFiles = [];

    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.manageStudentForm.acStudent.profile_image = this.uploadedFiles[0].objectURL;
    this.manageStudentForm.acStudent.profile_name = this.uploadedFiles[0].name;
    this.manageStudentForm.acStudent.profile_type = this.uploadedFiles[0].type;

    this.utilsService
      .convertBlobToString(this.manageStudentForm.acStudent.profile_image)
      .subscribe(val => {
        this.manageStudentForm.acStudent.profile_image = val;
      });
  }

  onSubmit() {
    this.manageStudentForm.acStudent.update_user = this.authService.getUser().user_ref
    this.m010101ManageStudentService.doUpdate(this.manageStudentForm.acStudent).subscribe(data => {
      console.log('complete')
    }, error => {
      console.log(error)
    }, () => {
      this.layoutService.setMsgDisplay(
        Severity.SUCCESS,
        "บันทึกข้อมูลสำเร็จ",
        ""
      );
    })
  }


}

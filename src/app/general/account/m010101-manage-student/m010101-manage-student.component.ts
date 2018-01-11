import { SelectItem } from "primeng/primeng";
import { Severity } from "./../../../enum";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { M010101StudentService } from "./../../../services/students/m010101-student.service";
import { UtilsService } from "./../../../services/utils/utils.service";
import { LayoutService } from "./../../../services/utils/layout.service";
import { Component, OnInit } from "@angular/core";
import { RftSchool } from "../../../models/rft-school";
import { ReferenceService } from "../../../services/general/reference.service";
import { StudentForm } from "../../../forms/student-form";
import { RftMajor } from "../../../models/rft-major";
import { CalendarModel } from '../../../models/calendar-model';

@Component({
  selector: "app-m010101-manage-student",
  templateUrl: "./m010101-manage-student.component.html",
  styleUrls: ["./m010101-manage-student.component.css"]
})
export class M010101ManageStudentComponent extends CalendarModel implements OnInit {
  user = localStorage.getItem("username");

  pageRender: boolean = false;
  schoolList: RftSchool[];
  majorsList: RftMajor[];
  studentFormGroup: FormGroup;
  manageStudentForm: StudentForm = new StudentForm();
  minyear: string;
  uploadedFiles: any[] = [];
  btnLabel: string;
  titleList: SelectItem[];

  constructor(
    private studentService: M010101StudentService,
    private referenceService: ReferenceService,
    private layoutService: LayoutService,
    private utilsService: UtilsService
  ) {
    super();
  }

  ngOnInit() {
    this.getYearRange();
    this.titleList = this.utilsService.getTitleList();
    this.pageRender = true;
    this.btnLabel = "บันทึก";
    this.referenceService.initialSchools();
    this.layoutService.setPageHeader("บันทึกข้อมูลผู้ใช้");
    this.manageStudentForm.acStudent.profile_image =
      "../../../../assets/images/empty_profile.png";
    this.validateForm();
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
      gender: new FormControl((this.manageStudentForm.acStudent.gender = "M")),
      first_name_t: new FormControl(
        this.manageStudentForm.acStudent.first_name_t,
        Validators.compose([Validators.required])
      ),
      birth_date: new FormControl(
        this.manageStudentForm.acStudent.birth_date,
        Validators.compose([Validators.required])
      ),
      title_ref: new FormControl(
        (this.manageStudentForm.acStudent.title_ref = "Mr")
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
    console.log(this.manageStudentForm.acStudent.birth_date)
    if (this.studentFormGroup.invalid) {
      this.utilsService.findInvalidControls(this.studentFormGroup);
      return;
    }
    this.manageStudentForm.acStudent.school_ref = this.manageStudentForm.rftSchool.school_ref;
    this.manageStudentForm.acStudent.major_ref = this.manageStudentForm.rftMajor.major_ref;
    console.log(this.manageStudentForm);
    this.studentService
      .doInsert(this.manageStudentForm.acStudent, this.user)
      .subscribe(
        res => {},
        error => {
          console.log(error);
        },
        () => {
          this.onResetClick()
          this.layoutService.setMsgDisplay(
            Severity.SUCCESS,
            "บันทึกข้อมูลสำเร็จ",
            ""
          );
        }
      );
  }

  onResetClick(){
    this.manageStudentForm = new StudentForm();
    this.manageStudentForm.acStudent.profile_image =
      "../../../../assets/images/empty_profile.png";
  }
}
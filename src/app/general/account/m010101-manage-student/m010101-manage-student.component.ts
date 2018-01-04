import { UtilsService } from './../../../services/utils/utils.service';
import { LayoutService } from "./../../../services/utils/layout.service";
import { Component, OnInit } from "@angular/core";
import { RftSchool } from "../../../models/rft-school";
import { ReferenceService } from "../../../services/general/reference.service";
import { StudentForm } from "../../../forms/student-form";
import { RftMajor } from "../../../models/rft-major";

@Component({
  selector: "app-m010101-manage-student",
  templateUrl: "./m010101-manage-student.component.html",
  styleUrls: ["./m010101-manage-student.component.css"]
})
export class M010101ManageStudentComponent implements OnInit {
  schoolList: RftSchool[];
  majorsList: RftMajor[];
  manageStudentForm: StudentForm = new StudentForm();

  uploadedFiles: any[] = [];

  btnLabel: string
  constructor(
    private referenceService: ReferenceService,
    private layoutService: LayoutService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.btnLabel = 'บันทึก'
    this.referenceService.initialSchools();
    this.layoutService.setPageHeader("บันทึกข้อมูลผู้ใช้");
    this.manageStudentForm.acStudent.profile_image = '../../../../assets/images/empty_profile.png'
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

  onSubmit(){
    this.manageStudentForm.acStudent.school_ref = this.manageStudentForm.rftSchool.school_ref
    this.manageStudentForm.acStudent.major_ref = this.manageStudentForm.rftMajor.major_ref
    console.log(this.manageStudentForm)
  }
}

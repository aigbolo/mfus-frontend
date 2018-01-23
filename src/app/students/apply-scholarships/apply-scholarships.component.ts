import { RftEducationLevel } from './../../models/rft-education-level';
import { AddressService } from './../../services/utils/address.service';
import { AcOfficer } from './../../models/ac-officer';
import { AcStudent } from './../../models/ac-student';
import { AcUser } from './../../models/ac-user';
import { AuthenticationService } from './../../services/general/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LayoutService } from "./../../services/utils/layout.service";
import { UtilsService } from "./../../services/utils/utils.service";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";
import { ApplyScholarshipForm } from "../../forms/apply-scholarship-form";
import { M040101ApplyScholarshipService } from "../../services/students/m040101-apply-scholarship.service";
import { ReferenceService } from "../../services/general/reference.service";
import { NgProgress } from 'ngx-progressbar';
import { M020103FamilyAndAddressService } from '../../services/students/m020103-family-and-address.service';

@Component({
  selector: "app-apply-scholarships",
  templateUrl: "./apply-scholarships.component.html",
  styleUrls: ["./apply-scholarships.component.css"]
})
export class ApplyScholarshipsComponent implements OnInit {
  pageRender: boolean = false
  applyApplicationForm: ApplyScholarshipForm = new ApplyScholarshipForm();
  applicationFormGroup: FormGroup
  page_header: string;
  user_ref: string = ""
  account_ref: string = ""
  user: AcUser = new AcUser;
  student: AcStudent = new AcStudent;
  officer: AcOfficer = new AcOfficer;
  constructor(
    private layoutService: LayoutService,
    private applyScholarshipService: M040101ApplyScholarshipService,
    public utilsService: UtilsService,
    private referenceService: ReferenceService,
    private ngProgress: NgProgress,
    private authService: AuthenticationService,
    private familyAndAddressService: M020103FamilyAndAddressService,
    private fatherAddressService: AddressService,
    private motherAddressService: AddressService,
    private patrolAddressService: AddressService,
    private homeAddressService: AddressService,
    private currentAddressService: AddressService,
  ) { }

  ngOnInit() {
    this.ngProgress.start()
    this.login()
    this.utilsService.getApplicationStep();
    this.getApplicationData();
    this.initialFamilyAndAddress()
    this.getEducationLevel()
  }

  login() {
    this.student = this.authService.getAccount();
    this.user = this.authService.getUser();
    this.user_ref = this.user.user_ref
    this.account_ref = this.student.student_ref
    this.applyApplicationForm.acStudent.update_user = this.user_ref
    this.applyApplicationForm.apApplication.create_user = this.user_ref
    this.applyApplicationForm.apApplication.update_user = this.user_ref
    this.applyApplicationForm.apFamilyFinancial.create_user = this.user_ref
    this.applyApplicationForm.apFamilyFinancial.update_user = this.user_ref
    this.applyApplicationForm.apApplication.student_ref = this.account_ref

  }

  getApplicationData() {
    this.applyScholarshipService
      .getApplySchcolarshipData(this.account_ref)
      .subscribe(data => {
        this.applyApplicationForm.acStudent = data;
        this.applyApplicationForm.student_name = data.student_name
        this.applyApplicationForm.school_name_t = data.school_name_t
        this.applyApplicationForm.major_name_t = data.major_name_t
        this.applyApplicationForm.birth_day = this.utilsService.getBirthDay(
          data.birth_date
        );
        this.applyApplicationForm.gender = this.utilsService.getGender(
          data.gender
        );
        this.applyApplicationForm.age = this.utilsService.getAge(
          data.birth_date
        );
        this.pageRender = true;
        this.ngProgress.done()
      }, error => {
        console.log(error)
      }, () => {
      });
  }

  initialFamilyAndAddress() {
    this.familyAndAddressService.doGetParent(this.student.student_ref).subscribe(
      data => {
        setTimeout(() => {
          this.applyApplicationForm.acParent = data;
        }, 1000);
        setTimeout(() => {
          this.getParentProvince();
          this.getParentDistrict();
          this.getParentSubDistrict();
          this.convertDateBackToFront();
          this.initialParentAddress();
        }, 2000);
      }, err => {
        console.log(err)
      },
      () => {
      }
    );
    setTimeout(() => {
      this.familyAndAddressService.doGetSiblings(this.student.student_ref).subscribe(
        data => {
          console.log(data)
          if (data)
            this.applyApplicationForm.siblingList = data;
        }, err => {
          console.log(err)
        },()=>{
        }
      )
      this.familyAndAddressService.doGetAddress(this.student.student_ref).subscribe(
        data => {
          if (data.address_ref)
            this.applyApplicationForm.acAddress = data;

        }, err => {
          console.log(err)
        },
        () => {
          this.initialLivingAddress();
          this.getLivingProvince();
          this.getLivingDistrict();
          this.getLivingSubDistrict();
        }
      )
    }, 1000)
  }

  getParentProvince() {
    if (this.applyApplicationForm.acParent.father_province != null || this.applyApplicationForm.acParent.father_province != undefined) {
      this.fatherAddressService.getProvinceByRef(this.applyApplicationForm.acParent.father_province).subscribe(
        data => {
          this.applyApplicationForm.dadProvince = data;
        },
        err => {
          console.log(err);
        }
      );
    }
    if (this.applyApplicationForm.acParent.mother_province != null || this.applyApplicationForm.acParent.mother_province != undefined) {
      this.fatherAddressService.getProvinceByRef(this.applyApplicationForm.acParent.mother_province).subscribe(
        data => {
          this.applyApplicationForm.momProvince = data;
        },
        err => {
          console.log(err);
        }
      );
    }
    if (this.applyApplicationForm.acParent.patrol_province != null || this.applyApplicationForm.acParent.patrol_province != undefined) {
      this.fatherAddressService.getProvinceByRef(this.applyApplicationForm.acParent.patrol_province).subscribe(
        data => {
          this.applyApplicationForm.patrolProvince = data;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getParentDistrict() {
    if (this.applyApplicationForm.acParent.father_district != null || this.applyApplicationForm.acParent.father_district != undefined) {
      this.fatherAddressService.getDistrictByRef(this.applyApplicationForm.acParent.father_district).subscribe(
        data => {
          console.log(data);
          this.applyApplicationForm.dadDistrict = data;
        },
        err => {
          console.log(err);
        }
      );
    }
    if (this.applyApplicationForm.acParent.mother_district != null || this.applyApplicationForm.acParent.father_district != undefined) {
      this.fatherAddressService.getDistrictByRef(this.applyApplicationForm.acParent.mother_district).subscribe(
        data => {
          this.applyApplicationForm.momDistrict = data;
        },
        err => {
          console.log(err);
        }
      );
    }
    if (this.applyApplicationForm.acParent.patrol_district != null || this.applyApplicationForm.acParent.father_district != undefined) {
      this.fatherAddressService.getDistrictByRef(this.applyApplicationForm.acParent.patrol_district).subscribe(
        data => {
          this.applyApplicationForm.patrolDistrict = data;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getParentSubDistrict() {
    if (this.applyApplicationForm.acParent.father_sub_district != null || this.applyApplicationForm.acParent.father_sub_district != undefined) {
      this.fatherAddressService.getSubDistrictByRef(this.applyApplicationForm.acParent.father_sub_district).subscribe(
        data => {
          console.log(data);
          this.applyApplicationForm.dadSubDistrict = data;
        },
        err => {
          console.log(err);
        }
      );
    }
    if (this.applyApplicationForm.acParent.mother_sub_district != null || this.applyApplicationForm.acParent.mother_sub_district != undefined) {
      this.fatherAddressService.getSubDistrictByRef(this.applyApplicationForm.acParent.mother_sub_district).subscribe(
        data => {
          this.applyApplicationForm.momSubDistrict = data;
        },
        err => {
          console.log(err);
        }
      );
    }
    if (this.applyApplicationForm.acParent.patrol_sub_district != null || this.applyApplicationForm.acParent.patrol_sub_district != undefined) {
      this.fatherAddressService.getSubDistrictByRef(this.applyApplicationForm.acParent.patrol_sub_district).subscribe(
        data => {
          this.applyApplicationForm.patrolSubDistrict = data;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  convertDateBackToFront() {
    if (this.applyApplicationForm.acParent.father_birth_date != null)
      this.applyApplicationForm.acParent.father_birth_date = new Date(this.applyApplicationForm.acParent.father_birth_date);
    if (this.applyApplicationForm.acParent.mother_birth_date != null)
      this.applyApplicationForm.acParent.mother_birth_date = new Date(this.applyApplicationForm.acParent.mother_birth_date);
    if (this.applyApplicationForm.acParent.patrol_birth_date != null)
      this.applyApplicationForm.acParent.patrol_birth_date = new Date(this.applyApplicationForm.acParent.patrol_birth_date);
  }

  initialParentAddress() {
    if (this.applyApplicationForm.acParent.parent_ref != undefined && this.applyApplicationForm.acParent.parent_flag == '1') {
      this.fatherAddressService.initialDistrict(this.applyApplicationForm.dadProvince.province_ref);
      this.motherAddressService.initialDistrict(this.applyApplicationForm.momProvince.province_ref);
      this.fatherAddressService.initialSubDistrict(this.applyApplicationForm.dadDistrict.district_ref);
      this.motherAddressService.initialSubDistrict(this.applyApplicationForm.momDistrict.district_ref);
    }
    if (this.applyApplicationForm.acParent.parent_ref != undefined && this.applyApplicationForm.acParent.parent_flag == '2') {
      this.patrolAddressService.initialDistrict(this.applyApplicationForm.patrolProvince.province_ref);
      this.patrolAddressService.initialSubDistrict(this.applyApplicationForm.patrolDistrict.district_ref);
    }
  }

  initialLivingAddress() {
    if (this.applyApplicationForm.acAddress.address_ref != undefined) {
      this.homeAddressService.initialDistrict(this.applyApplicationForm.homeProvince.province_ref);
      this.currentAddressService.initialDistrict(this.applyApplicationForm.currentProvince.province_ref);
      this.homeAddressService.initialSubDistrict(this.applyApplicationForm.homeDistrict.district_ref);
      this.currentAddressService.initialSubDistrict(this.applyApplicationForm.currentDistrict.district_ref);
    }
  }

  getLivingProvince() {
    if (this.applyApplicationForm.acAddress.home_province != null || this.applyApplicationForm.acAddress.home_province != undefined) {
      this.fatherAddressService.getProvinceByRef(this.applyApplicationForm.acAddress.home_province).subscribe(
        data => {
          this.applyApplicationForm.homeProvince = data;
        },
        err => {
          console.log(err);
        }
      );
    }
    if (this.applyApplicationForm.acAddress.current_province != null || this.applyApplicationForm.acAddress.current_province != undefined) {
      this.fatherAddressService.getProvinceByRef(this.applyApplicationForm.acAddress.current_province).subscribe(
        data => {
          this.applyApplicationForm.currentProvince = data;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getLivingDistrict() {
    if (this.applyApplicationForm.acAddress.home_district != null || this.applyApplicationForm.acParent.father_district != undefined) {
      this.fatherAddressService.getDistrictByRef(this.applyApplicationForm.acAddress.home_district).subscribe(
        data => {
          this.applyApplicationForm.homeDistrict = data;
        },
        err => {
          console.log(err);
        }
      );
    }
    if (this.applyApplicationForm.acAddress.current_district != null || this.applyApplicationForm.acParent.father_district != undefined) {
      this.fatherAddressService.getDistrictByRef(this.applyApplicationForm.acAddress.current_district).subscribe(
        data => {
          this.applyApplicationForm.currentDistrict = data;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getLivingSubDistrict() {
    if (this.applyApplicationForm.acAddress.home_sub_district != null || this.applyApplicationForm.acAddress.home_sub_district != undefined) {
      this.fatherAddressService.getSubDistrictByRef(this.applyApplicationForm.acAddress.home_sub_district).subscribe(
        data => {
          this.applyApplicationForm.homeSubDistrict = data;
        },
        err => {
          console.log(err);
        }
      );
    }
    if (this.applyApplicationForm.acAddress.current_sub_district != null || this.applyApplicationForm.acAddress.current_sub_district != undefined) {
      this.fatherAddressService.getSubDistrictByRef(this.applyApplicationForm.acAddress.current_sub_district).subscribe(
        data => {
          this.applyApplicationForm.currentSubDistrict = data;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getEducationLevel() {
    this.referenceService
      .getEducationLevel()
      .subscribe((res: RftEducationLevel[]) => {
        this.applyApplicationForm.educationLevelList = res
      });
  }


}

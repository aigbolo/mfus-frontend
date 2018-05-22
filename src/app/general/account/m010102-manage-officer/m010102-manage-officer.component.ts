import { AuthenticationService } from './../../../services/general/authentication.service';
import { AcStudent } from './../../../models/ac-student';
import { Severity } from "./../../../enum";
import { OfficerForm } from "./../../../forms/officer-form";
import { NgProgress } from "ngx-progressbar";
import { Subject } from "rxjs/Subject";
import { AcOfficer } from "./../../../models/ac-officer";
import { ActivatedRoute } from "@angular/router";
import { LayoutService } from "./../../../services/utils/layout.service";
import { M010102OfficerService } from "./../../../services/officers/m010102-officer.service";
import { ReferenceService } from "./../../../services/general/reference.service";

import { RftSubDistrict } from "./../../../models/rft-sub-district";
import { RftDistrict } from "./../../../models/rft-district";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RftProvince } from "../../../models/rft-province";
import { UtilsService } from "../../../services/utils/utils.service";
import { SelectItem } from "primeng/primeng";
import { AcUser } from "../../../models/ac-user";

@Component({
  selector: "app-manage-officer",
  templateUrl: "./m010102-manage-officer.component.html",
  styleUrls: ["./m010102-manage-officer.component.css"]
})
export class M010102ManageOfficerComponent implements OnInit {
  pageRender = false;
  manageOfficerForm: OfficerForm;
  manageOfficerForm2: OfficerForm;
  officerFormGroup: FormGroup;

  user: AcUser = new AcUser()
  officer: AcOfficer = new AcOfficer()

  // Autocomplete Province
  provinceList: RftProvince[] = [];
  provinceObject: RftProvince = new RftProvince();
  // Autocomplete District
  districtList: RftDistrict[] = [];
  districtObject: RftDistrict = new RftDistrict();
  district_ref: string;

  // Autocomplete SubDistrict
  subDistrictList: RftSubDistrict[] = [];
  subDistrictObject: RftSubDistrict = new RftSubDistrict();

  activeFlag: any[];
  titleList: any[];

  uploadedFiles: any[] = [];
  flag: boolean;
  btnLabel: string;

  user_ref:string;

  constructor(
    private utilsService: UtilsService,
    private referenceService: ReferenceService,
    private officerService: M010102OfficerService,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    public ngProgress: NgProgress,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.ngProgress.start();
    this.manageOfficerForm = new OfficerForm();
    this.btnLabel = "เพิ่มข้อมูล";
    this.layoutService.setPageHeader("เพิ่มข้อมูลเจ้าหน้าที่");
    this.login()
    this.validateForm();
    this.activeFlag = this.utilsService.getActiveFlag("M");
    
    this.referenceService.initialProvince();
    this.manageOfficerForm.acOfficer.officer_ref = this.route.snapshot.params["id"];
    if (this.manageOfficerForm.acOfficer.officer_ref != null) {
      console.log('onrow')
      this.btnLabel = "แก้ไขข้อมูล";
      this.layoutService.setPageHeader("แก้ไขข้อมูลเจ้าหน้าที่");
      this.officerFormGroup.controls["officer_code"].disable();
      this.onRowSelected();
    } else {
      this.manageOfficerForm.acOfficer.active_flag = "Y";
      this.manageOfficerForm.acOfficer.gender = "M";
      this.pageRender = true;
      this.ngProgress.done();
    }
    this.utilsService.getTitleNameByGender(this.manageOfficerForm.acOfficer.gender);
  }

  login(){
    this.user = this.authService.getUser();
    this.user_ref = this.officer.officer_ref

  }
  validateForm() {
    this.officerFormGroup = new FormGroup({
      officer_code: new FormControl(
        this.manageOfficerForm.acOfficer.officer_code,
        Validators.compose([Validators.required])
      ),
      active_flag: new FormControl(
        (this.manageOfficerForm.acOfficer.active_flag)
      ),
      gender: new FormControl(
        (this.manageOfficerForm.acOfficer.gender),
        Validators.compose([Validators.required])
      ),
      title_ref: new FormControl(
        (this.manageOfficerForm.acOfficer.title_ref),
        Validators.compose([Validators.required])
      ),
      personal_id: new FormControl(
        this.manageOfficerForm.acOfficer.personal_id,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ])
      ),
      first_name: new FormControl(
        this.manageOfficerForm.acOfficer.first_name,
        Validators.compose([Validators.required])
      ),
      last_name: new FormControl(
        this.manageOfficerForm.acOfficer.last_name,
        Validators.compose([Validators.required])
      ),
      address: new FormControl(
        this.manageOfficerForm.acOfficer.address,
        Validators.required
      ),
      postcode: new FormControl(this.manageOfficerForm.acOfficer.postcode),
      phone_no: new FormControl(
        this.manageOfficerForm.acOfficer.phone_no,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ])
      ),
      email: new FormControl(
        this.manageOfficerForm.acOfficer.email,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          )
        ])
      ),
      province: new FormControl(this.manageOfficerForm.rftProvince),
      district: new FormControl(this.manageOfficerForm.rftDistrict),
      sub_district: new FormControl(this.manageOfficerForm.rftSubDistrict),
      manage_officer_flag: new FormControl((this.flag = false)),
      image: new FormControl(
        (this.manageOfficerForm.acOfficer.profile_image =
          "../../../../assets/images/empty_profile.png"),
        Validators.compose([Validators.required])
      )
    });
  }

  autocompleteProvince(event) {
    let query = event.query;
    this.provinceList = [];
    let objList: RftProvince[];
    objList = this.referenceService.getProvinces();
    for (let obj of objList) {
      if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.provinceList.push(obj);
      }
    }
  }

  handleCompleteClickProvince() {
    setTimeout(() => {
      this.provinceList = this.referenceService.getProvinces();
    }, 100);
  }

  selectProvince() {
    this.referenceService.initialDistrict(
      this.manageOfficerForm.rftProvince.province_ref
    );
    setTimeout(() => {
      this.manageOfficerForm.rftDistrict = new RftDistrict();
      this.manageOfficerForm.rftSubDistrict = new RftSubDistrict();
    }, 100);
  }

  autocompleteDistrict(event) {
    let query = event.query;
    this.districtList = [];
    let objList: RftDistrict[];
    objList = this.referenceService.getDistricts();
    for (let obj of objList) {
      if (obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.districtList.push(obj);
      }
    }
  }

  handleCompleteClickDistrict() {
    setTimeout(() => {
      this.districtList = this.referenceService.getDistricts();
    }, 100);
  }

  selectDistrict() {
    this.referenceService.initialSubDistrict(
      this.manageOfficerForm.rftDistrict.district_ref
    );
    setTimeout(() => {
      this.manageOfficerForm.rftSubDistrict = new RftSubDistrict();
      this.manageOfficerForm.acOfficer.postcode = "";
    }, 100);
  }

  autocompleteSubDistrict(event) {
    let query = event.query;
    this.subDistrictList = [];
    let objList: RftSubDistrict[];
    objList = this.referenceService.getSubDistricts();
    for (let obj of objList) {
      if (
        obj.sub_district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        this.subDistrictList.push(obj);
      }
    }
  }

  handleCompleteClickSubDistrict() {
    setTimeout(() => {
      this.subDistrictList = this.referenceService.getSubDistricts();
    }, 100);
  }

  selectSubDistrict() {
    this.manageOfficerForm.acOfficer.postcode = this.manageOfficerForm.rftSubDistrict.postcode;
  }

  onUpload(event) {
    if (event.files != null) this.uploadedFiles = [];

    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.manageOfficerForm.acOfficer.profile_image = this.uploadedFiles[0].objectURL;
    this.manageOfficerForm.acOfficer.profile_name = this.uploadedFiles[0].name;
    this.manageOfficerForm.acOfficer.profile_type = this.uploadedFiles[0].type;

    this.utilsService
      .convertBlobToString(this.manageOfficerForm.acOfficer.profile_image)
      .subscribe(val => {
        this.manageOfficerForm.acOfficer.profile_image = val;
      });
  }

  onRowSelected() {
    console.log(this.manageOfficerForm.acOfficer)
    this.officerService
      .selectOfficer(this.manageOfficerForm.acOfficer)
      .subscribe(
      res => {
        this.manageOfficerForm.acOfficer = res;
        this.flag = this.utilsService.setManageStatus(
          res.manage_officer_flag
        );
        if (this.manageOfficerForm.acOfficer.profile_image == null) {
          this.manageOfficerForm.acOfficer.profile_image =
            "../../../../assets/images/empty_profile.png";
        }
      },
      error => {
        console.log(error);
      },
      () => {
        setTimeout(() => {
          let result: Array<any> = [];
          this.referenceService
            .getReferencesAddress(
            this.manageOfficerForm.acOfficer.province,
            this.manageOfficerForm.acOfficer.district,
            this.manageOfficerForm.acOfficer.sub_district
            )
            .subscribe(
            data => {
              result.push(data);
              this.manageOfficerForm.rftProvince = result[0];
              this.manageOfficerForm.rftDistrict = result[1];
              this.manageOfficerForm.rftSubDistrict = result[2];
            },
            error => {
              console.log("error", error);
            },
            () => {
              this.pageRender = true;
              this.ngProgress.done();
            }
            );
        }, 3000);
      }
      );
  }

  onSubmit() {
    this.manageOfficerForm.acOfficer.province = this.manageOfficerForm.rftProvince.province_ref;
      this.manageOfficerForm.acOfficer.district = this.manageOfficerForm.rftDistrict.district_ref;
      this.manageOfficerForm.acOfficer.sub_district = this.manageOfficerForm.rftSubDistrict.sub_district_ref;
      this.manageOfficerForm.acOfficer.manage_officer_flag = this.utilsService.getManageStatus(
        this.flag
      );
    if (this.officerFormGroup.invalid) {
      this.utilsService.findInvalidControls(this.officerFormGroup);
      return;
    }
    if (this.btnLabel == "เพิ่มข้อมูล") {
      this.manageOfficerForm.acOfficer.manage_officer_flag = this.utilsService.getManageStatus(
        this.flag
      );
      this.officerService
        .doInsert(this.manageOfficerForm.acOfficer, this.user_ref)
        .subscribe(
        res => {
        },
        error => {
          console.log(error);
          this.layoutService.setMsgDisplay(
            Severity.ERROR,
            "เกิดข้อผิดพลาาด",
            ""
          );
        },
        () => {
          this.manageOfficerForm = new OfficerForm();
          this.validateForm();
          this.layoutService.setMsgDisplay(
            Severity.SUCCESS,
            "บันทึกข้อมูลสำเร็จ",
            ""
          );
        }
        );
    } else {
      console.log(this.manageOfficerForm.acOfficer)
      this.officerService.doUpdate(this.manageOfficerForm.acOfficer).subscribe(res => {
      }, error => {
        console.log(error)
        this.layoutService.setMsgDisplay(Severity.ERROR, 'เกิดข้อผิดพลาาด', error)
      }, () => {
        this.utilsService.goToPage('search-officer')
        this.layoutService.setMsgDisplay(Severity.SUCCESS, 'แก้ไขข้อมูลสำเร็จ', '')
      })
    }
  }

  onResetClick() {
    if (this.btnLabel == "เพิ่มข้อมูล") {
      this.manageOfficerForm = new OfficerForm();
      this.manageOfficerForm.acOfficer.profile_image =
        "../../../../assets/images/empty_profile.png";
      this.manageOfficerForm.acOfficer.profile_name = "";
      this.manageOfficerForm.acOfficer.profile_type = "";
    } else {
      window.location.reload();
    }
  }

  onPageSearch() {
    this.utilsService.goToPage("search-officer");
  }
}

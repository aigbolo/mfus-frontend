import { Severity } from './../../../enum';
import { LayoutService } from './../../../services/utils/layout.service';
import { NgProgress } from 'ngx-progressbar';
import { RftSubDistrict } from './../../../models/rft-sub-district';
import { RftDistrict } from './../../../models/rft-district';
import { RftProvince } from './../../../models/rft-province';
import { SelectItem } from 'primeng/primeng';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { OfficerForm } from './../../../forms/officer-form';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/general/authentication.service';
import { M010102OfficerService } from '../../../services/officers/m010102-officer.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { ReferenceService } from '../../../services/general/reference.service';

@Component({
  selector: 'app-manage-officer-profile',
  templateUrl: './manage-officer-profile.component.html',
  styleUrls: ['./manage-officer-profile.component.css']
})
export class ManageOfficerProfileComponent implements OnInit {

  pageRender: boolean = false
  manageOfficerForm: OfficerForm = new OfficerForm
  officerFormGroup: FormGroup
  flag: boolean = false
  titleList: SelectItem[]
  activeFlag: SelectItem[]

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

  uploadedFiles: any[] = [];

  constructor(private authService: AuthenticationService,
    private officerService: M010102OfficerService,
    private utilsService: UtilsService,
    private referenceService: ReferenceService,
    private ngProgress: NgProgress,
    private layoutService: LayoutService) { }

  ngOnInit() {
    this.layoutService.setPageHeader('แก้ไขข้อมูลส่วนตัว');
    this.ngProgress.start();
    this.validateForm();
    this.initialOfficerData();
    this.referenceService.initialProvince();
    this.titleList = this.utilsService.getTitleList();
  }

  initialOfficerData() {
    this.manageOfficerForm.acOfficer.officer_ref = this.authService.getUser().account_ref
    this.officerService.selectOfficer(this.manageOfficerForm.acOfficer).subscribe(
      data => {
        this.manageOfficerForm.acOfficer = data
      }, error => {

      }, () => {
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
      })
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
        (this.manageOfficerForm.acOfficer.profile_image),
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
    this.manageOfficerForm.acOfficer.province = this.manageOfficerForm.rftProvince.province_ref;
    this.manageOfficerForm.acOfficer.district = this.manageOfficerForm.rftDistrict.district_ref
    this.manageOfficerForm.acOfficer.sub_district = this.manageOfficerForm.rftSubDistrict.sub_district_ref
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

  onSubmit() {
    this.officerService.doUpdate(this.manageOfficerForm.acOfficer).subscribe(res => {
    }, error => {

    }, () => {
      this.layoutService.setMsgDisplay(Severity.SUCCESS, "แก้ไขข้อมูลสำเร็จ", "")
    })
  }
  onResetClick(){
    window.location.reload();
  }
}

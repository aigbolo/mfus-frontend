import { Validators, FormControl, FormGroup } from '@angular/forms';
import { OfficerForm } from './../../../forms/officer-form';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/general/authentication.service';
import { M010102OfficerService } from '../../../services/officers/m010102-officer.service';

@Component({
  selector: 'app-manage-officer-profile',
  templateUrl: './manage-officer-profile.component.html',
  styleUrls: ['./manage-officer-profile.component.css']
})
export class ManageOfficerProfileComponent implements OnInit {

  manageOfficerForm: OfficerForm
  officerFormGroup: FormGroup

  constructor(private authService: AuthenticationService,
              private officerService: M010102OfficerService) { }

  ngOnInit() {
    this.initialOfficerData()
  }

  initialOfficerData(){
    this.manageOfficerForm.acOfficer = this.authService.getAccount()
    console.log(this.manageOfficerForm.acOfficer)
  }

  validateForm() {
    this.officerFormGroup = new FormGroup({
      officer_code: new FormControl(
        this.manageOfficerForm.acOfficer.officer_code,
        Validators.compose([Validators.required])
      ),
      active_flag: new FormControl(
        (this.manageOfficerForm.acOfficer.active_flag = "Y")
      ),
      gender: new FormControl(
        (this.manageOfficerForm.acOfficer.gender = "M"),
        Validators.compose([Validators.required])
      ),
      title_ref: new FormControl(
        (this.manageOfficerForm.acOfficer.title_ref = "Mr"),
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


}

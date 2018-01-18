import { AcStudent } from './../../models/ac-student';
import { Severity } from './../../enum';
import { AuthenticationService } from './../../services/general/authentication.service';
import { AcUser } from './../../models/ac-user';
import { AddressService } from './../../services/utils/address.service';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from './../../services/utils/utils.service';
import { ReferenceService } from './../../services/general/reference.service';
import { LayoutService } from './../../services/utils/layout.service';
import { RftEducationLevel } from './../../models/rft-education-level';
import { Observable } from 'rxjs/Observable';
import { AcSibling } from './../../models/ac-sibling';
import { FamilyAndAddressForm } from './../../forms/family-and-address-form';
import { MenuItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { M020103FamilyAndAddressService } from '../../services/students/m020103-family-and-address.service';

@Component({
  selector: 'app-m020103-manage-family-and-address',
  templateUrl: './m020103-manage-family-and-address.component.html',
  styleUrls: ['./m020103-manage-family-and-address.component.css']
})
export class M020103ManageFamilyAndAddressComponent implements OnInit {

  manageForm: FamilyAndAddressForm = new FamilyAndAddressForm();
  sibling: AcSibling = new AcSibling();
  onLoaded = false;

  user: AcUser = new AcUser;
  student: AcStudent = new AcStudent;

  educationLevelList: RftEducationLevel[];
  items: MenuItem[];
  activeIndex: number = 0;
  constructor(private layoutService: LayoutService,
    private referenceService: ReferenceService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private familyAndAddressService: M020103FamilyAndAddressService,
    public fatherAddressService: AddressService,
    public motherAddressService: AddressService,
    public patrolAddressService: AddressService,
    public homeAddressService: AddressService,
    public currentAddressService: AddressService,
    private authService: AuthenticationService,
    private ngProgress: NgProgress) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.student = this.authService.getAccount();
    this.manageForm = new FamilyAndAddressForm();
    this.stepDisplay();
    this.layoutService.setPageHeader("ข้อมูลครอบครัวและที่อยู่");
    this.initialSetup();
    this.getEducationDropDown();
    this.fatherAddressService.initialProvince();
    this.motherAddressService.initialProvince();
    this.patrolAddressService.initialProvince();
    this.homeAddressService.initialProvince();
    this.currentAddressService.initialProvince();


    this.familyAndAddressService.doGetParent(this.student.student_ref).subscribe(
      data=>{
        console.log(data);
        this.manageForm.acParent = data;
      },err=>{
        console.log(err)
      }
    )
  }


  initialSetup(){
    console.log('initialSetup');
    if(this.manageForm.acParent.parent_ref == '' || this.manageForm.acParent.parent_ref == undefined){


    this.manageForm.acParent.parent_flag = "1";
    this.manageForm.acParent.relationship_status = "1";
    this.manageForm.acParent.father_status = "1";
    this.manageForm.acParent.mother_status = "1";
    this.manageForm.acParent.patrol_status = "1";
    this.manageForm.acParent.father_land_flag = "1";
    this.manageForm.acParent.mother_land_flag = "1";
    this.manageForm.acParent.patrol_land_flag = "1";


    this.manageForm.acParent.student_ref = this.user.account_ref;
    this.manageForm.acParent.create_user = this.user.user_ref;
    this.manageForm.acParent.update_user = this.user.user_ref;
    this.manageForm.acAddress.student_ref = this.user.account_ref;
    this.manageForm.acAddress.create_user = this.user.user_ref;
    this.manageForm.acAddress.update_user = this.user.user_ref;

    this.manageForm.siblingList = [];
    this.sibling = new AcSibling();
    this.sibling.student_ref = this.user.account_ref;
    this.sibling.create_user = this.user.user_ref;
    this.sibling.update_user = this.user.user_ref;
    this.manageForm.siblingList.push(this.sibling);
  }
  }
  stepDisplay() {
    this.items = [
      {
        label: "ข้อมูลครอบครัว", command: (event: any) => {this.activeIndex = 0;}},
      {
        label: "ข้อมูลพี่น้อง", command: (event: any) => { this.activeIndex = 1;}},
      {
        label: "ข้อมูลที่อยู่", command: (event: any) => {this.activeIndex = 2;}}
    ];
  }

  getEducationDropDown(){
    this.referenceService
    .getEducationLevel()
    .subscribe((res: RftEducationLevel[]) => {
      this.educationLevelList = [];
      this.educationLevelList.push(...res);

    });
  }

  getData(): FamilyAndAddressForm {
    console.log("getData");
    return this.manageForm;
  }

  onChangePanel(index: number, form: FamilyAndAddressForm) {
    console.log("onChangePanel");
    this.manageForm = new FamilyAndAddressForm();
    this.manageForm = form;


    this.activeIndex = index;
    console.log("activeIndex = " + this.activeIndex);

  }

  onSubmit(form: FamilyAndAddressForm){
    this.manageForm = new FamilyAndAddressForm();
    this.manageForm = form;

    this.familyAndAddressService.doInsertParent(this.manageForm.acParent).subscribe(
      data=>{
        console.log('Insert Parent Completed')
      },
      err=>{
        console.log('Insert Parent Error');
        console.log(err);
      },
      ()=>{
        this.familyAndAddressService.doInsertSibling(this.manageForm.siblingList).subscribe(
          data=>{
            console.log('Insert Siblings Completed')
          },
          err=>{
            console.log('Insert Siblings Error');
            console.log(err);
          },
          ()=>{
            this.familyAndAddressService.doInsertAddress(this.manageForm.acAddress).subscribe(
              data=>{
                console.log('Insert Address Completed');
                this.layoutService.setMsgDisplay(Severity.SUCCESS,"บันทึกข้อมูลสำเร็จ","");
              },
              err=>{
                console.log('Insert Address Error');
                console.log(err);
              },
              ()=>{

              }
            )
          }
        )
      }
    )
  }

}


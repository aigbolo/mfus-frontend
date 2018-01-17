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

  user = localStorage.getItem('user')
  usr :AcUser = JSON.parse(localStorage.getItem('user'));

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
    private ngProgress: NgProgress) {}

  ngOnInit() {
    console.log(this.usr);
    this.manageForm = new FamilyAndAddressForm();
    this.stepDisplay();
    this.layoutService.setPageHeader("ข้อมูลครอบครัวและที่อยู่");
    this.initialSetup();
    this.getEducationDropDown();
    this.fatherAddressService.initialProvince();
    this.motherAddressService.initialProvince();
    this.patrolAddressService.initialProvince();
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


    this.manageForm.acParent.student_ref = this.user;
    this.manageForm.acParent.create_user = this.user;
    this.manageForm.acParent.update_user = this.user;
    this.manageForm.acAddress.student_ref = this.user;
    this.manageForm.acAddress.create_user = this.user;
    this.manageForm.acAddress.update_user = this.user;

    this.manageForm.siblingList = [];
    this.sibling = new AcSibling();
    this.sibling.student_ref = this.user;
    this.sibling.create_user = this.user;
    this.sibling.update_user = this.user;
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
    console.log("home_address = " + form.acAddress.home_address);
    console.log("home_address = " + this.manageForm.acAddress.home_address);


    this.familyAndAddressService.doInsert(this.manageForm).subscribe();
  }

}


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

@Component({
  selector: 'app-m020103-manage-family-and-address',
  templateUrl: './m020103-manage-family-and-address.component.html',
  styleUrls: ['./m020103-manage-family-and-address.component.css']
})
export class M020103ManageFamilyAndAddressComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 0;
  manageForm: FamilyAndAddressForm = new FamilyAndAddressForm();
  sibling: AcSibling = new AcSibling();
  onLoaded = false;
  private data: Observable<number>;
  private values: Array<number> = [];
  private status: string;


  educationLevelList: RftEducationLevel[];
  constructor(private layoutService: LayoutService,
    private referenceService: ReferenceService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    public fatherAddressService: AddressService,
    public motherAddressService: AddressService,
    public patrolAddressService: AddressService,
    public homeAddressService: AddressService,
    public currentAddressService: AddressService,
    private ngProgress: NgProgress) {}

  ngOnInit() {
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


    this.manageForm.acParent.student_ref = '1';
    this.manageForm.acAddress.student_ref = '1';

    this.manageForm.siblingList = [];
    this.sibling = new AcSibling();
    this.sibling.student_ref = '1';
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

}


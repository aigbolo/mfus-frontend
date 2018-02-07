import { Subscription } from 'rxjs/Subscription';
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
  insertMode = true;
  manageForm: FamilyAndAddressForm = new FamilyAndAddressForm();
  sibling: AcSibling = new AcSibling();
  renderPage = false;

  user: AcUser =  this.authService.getUser();

  educationLevelList: RftEducationLevel[];
  items: MenuItem[];
  activeIndex: number = 0;

  myClock: any;
  myCount:number = 0;
  updateAddress: any;
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

    this.ngProgress.start();
    this.manageForm = new FamilyAndAddressForm();
    this.stepDisplay();
    this.layoutService.setPageHeader("ข้อมูลครอบครัวและที่อยู่");

    this.initialProvince();




    this.familyAndAddressService.doGetParent(this.user.account_ref).subscribe(
      data=>{
        if(data.parent_ref){
          this.insertMode = false;
          setTimeout(()=>{
            this.manageForm.acParent = data;
          },1000);
          setTimeout(()=>{
            this.convertDateBackToFront();
            this.getParentProvince();
          },1500);
          setTimeout(()=>{
            this.getParentDistrict();
            this.getParentSubDistrict();

            this.renderPage = true;
            this.ngProgress.done();
          },3000);
        }else{
          this.initialSetup();
        }
      },err=>{
        console.log(err)
      },
      ()=>{
        this.initialParentAddress();
      }
    );


    setTimeout(()=>{
      this.familyAndAddressService.doGetSiblings(this.user.account_ref).subscribe(
        data=>{
          if(data)
          this.manageForm.siblingList = data;
        },err=>{
          console.log(err)
        }
      )
      this.familyAndAddressService.doGetAddress(this.user.account_ref).subscribe(
        data=>{
          if(data){
            this.manageForm.acAddress = data;
            setTimeout(()=>{
              this.initialLivingAddress();
              this.getLivingProvince();
              this.getLivingDistrict();
              this.getLivingSubDistrict();
            },5000)

          }


        },err=>{
          console.log(err)
        },
        ()=>{

        }
      )
    },5000)


    this.getEducationDropDown();

  }



  convertDateBackToFront(){
    if(this.manageForm.acParent.father_birth_date != null)
    this.manageForm.acParent.father_birth_date = new Date(this.manageForm.acParent.father_birth_date);
    if(this.manageForm.acParent.mother_birth_date != null)
    this.manageForm.acParent.mother_birth_date = new Date(this.manageForm.acParent.mother_birth_date);
    if(this.manageForm.acParent.patrol_birth_date != null)
    this.manageForm.acParent.patrol_birth_date = new Date(this.manageForm.acParent.patrol_birth_date);
  }

  initialProvince(){
    this.fatherAddressService.initialProvince();
    this.motherAddressService.initialProvince();
    this.patrolAddressService.initialProvince();
    this.homeAddressService.initialProvince();
    this.currentAddressService.initialProvince();
  }



  initialLivingAddress(){
    if(this.manageForm.acAddress.address_ref != null){
      setTimeout(
        ()=>{
          this.homeAddressService.initialDistrict(this.manageForm.acAddress.home_province);
          this.currentAddressService.initialSubDistrict(this.manageForm.acAddress.home_district);
        },500);
        setTimeout(
          ()=>{
            this.homeAddressService.initialDistrict(this.manageForm.acAddress.current_province);
            this.currentAddressService.initialSubDistrict(this.manageForm.acAddress.current_district);
          },1000);
    }

  }

  initialParentAddress(){
    if(this.manageForm.acParent.parent_ref != null){
      if(this.manageForm.acParent.parent_flag == '1'){
        this.fatherAddressService.initialDistrict(this.manageForm.acParent.father_province);
        this.fatherAddressService.initialSubDistrict(this.manageForm.acParent.father_district);
        this.motherAddressService.initialDistrict(this.manageForm.acParent.mother_province);
        this.motherAddressService.initialSubDistrict(this.manageForm.acParent.mother_district);

      }
      if(this.manageForm.acParent.parent_flag == '2'){
        this.patrolAddressService.initialDistrict(this.manageForm.acParent.patrol_province);
        this.patrolAddressService.initialSubDistrict(this.manageForm.acParent.patrol_district);
      }
    }
  }

  getParentProvince(){
    if(this.manageForm.acParent.father_province != null || this.manageForm.acParent.father_province != undefined){
      this.fatherAddressService.getProvinceByRef(this.manageForm.acParent.father_province).subscribe(
        data=>{
          this.manageForm.dadProvince = data;
        },
        err=>{
          console.log(err);
        }
      );
    }
    if(this.manageForm.acParent.mother_province != null || this.manageForm.acParent.mother_province != undefined){
      this.fatherAddressService.getProvinceByRef(this.manageForm.acParent.mother_province).subscribe(
        data=>{
          this.manageForm.momProvince = data;
        },
        err=>{
          console.log(err);
        }
      );
    }
    if(this.manageForm.acParent.patrol_province != null || this.manageForm.acParent.patrol_province != undefined){
      this.fatherAddressService.getProvinceByRef(this.manageForm.acParent.patrol_province).subscribe(
        data=>{
          this.manageForm.patrolProvince = data;
        },
        err=>{
          console.log(err);
        }
      );
    }
  }
  getLivingProvince(){
    if(this.manageForm.acAddress.home_province != null || this.manageForm.acAddress.home_province != undefined){
      this.fatherAddressService.getProvinceByRef(this.manageForm.acAddress.home_province).subscribe(
        data=>{
          this.manageForm.homeProvince = data;
        },
        err=>{
          console.log(err);
        }
      );
    }
    if(this.manageForm.acAddress.current_province != null || this.manageForm.acAddress.current_province != undefined){
      this.fatherAddressService.getProvinceByRef(this.manageForm.acAddress.current_province).subscribe(
        data=>{
          this.manageForm.currentProvince = data;
        },
        err=>{
          console.log(err);
        }
      );
    }

  }

  getParentDistrict(){
    if(this.manageForm.acParent.father_district != null || this.manageForm.acParent.father_district != undefined){
      this.fatherAddressService.getDistrictByRef(this.manageForm.acParent.father_district).subscribe(
        data=>{
          this.manageForm.dadDistrict = data;
        },
        err=>{
          console.log(err);
        }
      );
    }
    if(this.manageForm.acParent.mother_district != null || this.manageForm.acParent.father_district != undefined){
      this.fatherAddressService.getDistrictByRef(this.manageForm.acParent.mother_district).subscribe(
        data=>{
          this.manageForm.momDistrict = data;
        },
        err=>{
          console.log(err);
        }
      );
    }
    if(this.manageForm.acParent.patrol_district != null || this.manageForm.acParent.father_district != undefined){
      this.fatherAddressService.getDistrictByRef(this.manageForm.acParent.patrol_district).subscribe(
        data=>{
          this.manageForm.patrolDistrict = data;
        },
        err=>{
          console.log(err);
        }
      );
    }
  }

  getLivingDistrict(){
    if(this.manageForm.acAddress.home_district != null || this.manageForm.acParent.father_district != undefined){
      this.fatherAddressService.getDistrictByRef(this.manageForm.acAddress.home_district).subscribe(
        data=>{
          this.manageForm.homeDistrict = data;
        },
        err=>{
          console.log(err);
        }
      );
    }
    if(this.manageForm.acAddress.current_district != null || this.manageForm.acParent.father_district != undefined){
      this.fatherAddressService.getDistrictByRef(this.manageForm.acAddress.current_district).subscribe(
        data=>{
          this.manageForm.currentDistrict = data;
        },
        err=>{
          console.log(err);
        }
      );
    }
  }

  getParentSubDistrict(){
    if(this.manageForm.acParent.father_sub_district != null || this.manageForm.acParent.father_sub_district != undefined){
      this.fatherAddressService.getSubDistrictByRef(this.manageForm.acParent.father_sub_district).subscribe(
        data=>{
          this.manageForm.dadSubDistrict = data;
        },
        err=>{
          console.log(err);
        }
      );
    }
    if(this.manageForm.acParent.mother_sub_district != null || this.manageForm.acParent.mother_sub_district != undefined){
      this.fatherAddressService.getSubDistrictByRef(this.manageForm.acParent.mother_sub_district).subscribe(
        data=>{
          this.manageForm.momSubDistrict = data;
        },
        err=>{
          console.log(err);
        }
      );
    }
    if(this.manageForm.acParent.patrol_sub_district != null || this.manageForm.acParent.patrol_sub_district != undefined){
      this.fatherAddressService.getSubDistrictByRef(this.manageForm.acParent.patrol_sub_district).subscribe(
        data=>{
          this.manageForm.patrolSubDistrict = data;
        },
        err=>{
          console.log(err);
        }
      );
    }
  }

  getLivingSubDistrict(){
    if(this.manageForm.acAddress.home_sub_district != null || this.manageForm.acAddress.home_sub_district != undefined){
      this.fatherAddressService.getSubDistrictByRef(this.manageForm.acAddress.home_sub_district).subscribe(
        data=>{
          this.manageForm.homeSubDistrict = data;
        },
        err=>{
          console.log(err);
        }
      );
    }
    if(this.manageForm.acAddress.current_sub_district != null || this.manageForm.acAddress.current_sub_district != undefined){
      this.fatherAddressService.getSubDistrictByRef(this.manageForm.acAddress.current_sub_district).subscribe(
        data=>{
          this.manageForm.currentSubDistrict = data;
        },
        err=>{
          console.log(err);
        }
      );
    }
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
    this.renderPage = true;
    this.ngProgress.done();
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
    this.referenceService.getEducationLevel().subscribe(res=> {
      this.educationLevelList = res;

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



   // Proceed Functions
    this.familyAndAddressService.doInsertSibling(this.manageForm.siblingList).subscribe(
                        data=>{
                          console.log(data);
                          this.layoutService.setMsgDisplay(Severity.SUCCESS,"บันทึกข้อมูลสำเร็จ","");
                          console.log('Insert Siblings Completed')
                        },
                        err=>{
                          console.log('Insert Siblings Error');
                          console.log(err);
                        },
                        ()=>{

                        });

      if(!this.insertMode){
        this.familyAndAddressService.doUpdateParent(this.manageForm.acParent).subscribe(
          data=>{
            this.layoutService.setMsgDisplay(Severity.SUCCESS,"บันทึกข้อมูลสำเร็จ","");
            console.log('Update Parent Completed')
          },
          err=>{
            console.log('Update Parent Error');
            console.log(err);
          },
          ()=>{

          }
        );
      }else{
        this.familyAndAddressService.doInsertParent(this.manageForm.acParent).subscribe(
          data=>{
            this.layoutService.setMsgDisplay(Severity.SUCCESS,"บันทึกข้อมูลสำเร็จ","");
            console.log('Insert Parent Completed')
          },
          err=>{
            console.log('Insert Parent Error');
            console.log(err);
          },
          ()=>{

          }
        );
      }

      if(!this.insertMode){
        this.familyAndAddressService.doUpdateAddress(this.manageForm.acAddress).subscribe(
          data=>{
            this.layoutService.setMsgDisplay(Severity.SUCCESS,"บันทึกข้อมูลสำเร็จ","");
            console.log('Update Address Completed');

          },
          err=>{
            console.log('Update Address Error');
            console.log(err);
          },
          ()=>{

          }
        )
      }else{
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
        );
      }




  }

}


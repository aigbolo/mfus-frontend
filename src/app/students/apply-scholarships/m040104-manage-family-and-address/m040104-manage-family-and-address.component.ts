import { AcAddress } from './../../../models/ac-address';
import { AcSibling } from './../../../models/ac-sibling';
import { AcParent } from './../../../models/ac-parent';
import { ApApplication } from './../../../models/ap-application';
import { UtilsService } from './../../../services/utils/utils.service';
import { MenuItem } from 'primeng/primeng';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplyScholarshipsComponent } from '../apply-scholarships.component';
import { ReferenceService } from '../../../services/general/reference.service';
import { ApplyScholarshipForm } from '../../../forms/apply-scholarship-form';

@Component({
  selector: 'app-m040104-manage-family-and-address',
  templateUrl: './m040104-manage-family-and-address.component.html',
  styleUrls: ['./m040104-manage-family-and-address.component.css']
})
export class M040104ManageFamilyAndAddressComponent implements OnInit {

  items: MenuItem[];
  activeIndex: number = 0;
  acParent: AcParent = new AcParent;
  acSiblings:AcSibling[] = [];
  acAddress:AcAddress = new AcAddress;
  @Input() childForm: ApplyScholarshipForm;
  @Output() changeIndex = new EventEmitter<any>();
  constructor(public utilsService: UtilsService,
              private referenceService: ReferenceService) { }

  ngOnInit() {
    this.stepDisplay()
    console.log(this.childForm)
    this.acParent = Object.assign(this.acParent,this.childForm.acParent);
    this.acAddress = Object.assign(this.acAddress,this.childForm.acAddress);
    this.acSiblings = [...this.childForm.acSiblings]


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

  setParentsFlag(flag: string){
    if(flag == '1'){
      return "บิดา - มารดา"
    }else{
      return "ผู้อุปการะ"
    }
  }

  setRelationShipStatus(flag: string){
      let status
      switch (flag) {
        case '1': {
          status = "สมรสและอยู่ด้วยกัน";
          break;
        }
        case '2': {
          status = "สมรสแต่ไม่ได้อยู่ด้วยกัน";
          break;
        }
        case '3': {
          status = "หย่าร้าง";
          break;
        }
      }
      return status
    }

    setStatusFlag(flag: string){
      if(flag == '1'){
        return "มีชีวิต"
      }else{
        return "เสียชีวิต"
      }
    }

    onGoBack(){
      const data = {
        currentIndex:3,newIndex:2
      }
      this.changeIndex.emit(data);
    }

    onNext(){
      const data = {
        currentIndex:3,newIndex:4
      }
      this.changeIndex.emit(data);
    }

    goToManageParent(){
      this.utilsService.goToPage('manage-family-and-address')
    }
}

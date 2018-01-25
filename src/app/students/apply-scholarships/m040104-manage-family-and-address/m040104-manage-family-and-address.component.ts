import { UtilsService } from './../../../services/utils/utils.service';
import { MenuItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { ApplyScholarshipsComponent } from '../apply-scholarships.component';
import { ReferenceService } from '../../../services/general/reference.service';

@Component({
  selector: 'app-m040104-manage-family-and-address',
  templateUrl: './m040104-manage-family-and-address.component.html',
  styleUrls: ['./m040104-manage-family-and-address.component.css']
})
export class M040104ManageFamilyAndAddressComponent implements OnInit {

  items: MenuItem[];
  activeIndex: number = 0;
  constructor(public applyApplication: ApplyScholarshipsComponent,
              public utilsService: UtilsService,
              private referenceService: ReferenceService) { }

  ngOnInit() {
    this.stepDisplay()
    this.applyApplication.pageRender = true
    console.log(this.applyApplication.applyApplicationForm.dadProvince)
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

    onPrevious(){
      this.referenceService.nextIndex(2)
      this.utilsService.activeIndex = this.referenceService.getIndex()
    }

    onNext(){
      this.referenceService.nextIndex(4)
      this.utilsService.activeIndex = this.referenceService.getIndex()
      this.applyApplication.pageRender = false
    }

    goToManageParent(){
      this.utilsService.goToPage('manage-family-and-address')
    }
}

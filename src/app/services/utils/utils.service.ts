import { Observable } from 'rxjs/Observable';
import { SelectItem, MenuItem } from 'primeng/primeng';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
@Injectable()
export class UtilsService {

  items: MenuItem[] = []
  activeIndex: number = 0;


  constructor(private router: Router) { }

  // cri is page action such as M = manage page, S = search page
  getActiveFlag(cri: string):SelectItem[]{
    let activeStatus:SelectItem[] = []

    if (cri == 'M') {
      activeStatus = [
        { label: 'ใช้งาน', value: 'Y' },
        { label: 'ไม่ใช้งาน', value: 'N' }
      ]
    }

    if (cri == 'S') {
      activeStatus = [
        { label: 'ไม่ระบุ', value: '' },
        { label: 'ใช้งาน', value: 'Y' },
        { label: 'ไม่ใช้งาน', value: 'N' }
      ]
    }
    return activeStatus;
  }

  getManageOfficerFlag(value: string){
    let flag: string
    if(value == 'true'){
      flag ='1'
    }else{
      flag = '2'
    }
    return flag
  }

  getTitleList():SelectItem[] {
    let titleList = [
      { label: 'นาย', value: 'Mr' },
      { label: 'นาง', value: 'Miss' },
      { label: 'นางสาว', value: 'Mrs' }
    ]
    return titleList;
  }

  goToPage(path: string) {
    this.router.navigate([path])
  }

  goToPageWithParam(path: string, id: string){
    this.router.navigate([path,id])
  }

  goToPageWithQueryParam(path: string, queryParam: any){
    this.router.navigate([path],{ queryParams:queryParam})
  }

  convertBlobToString(objectUrl:any):Observable<any>{
    var myBlob:any = null;
    let base64data: string = null;
    var xhr = new XMLHttpRequest();
    const reader = new FileReader();
    let data = new Observable(observer => {
      setTimeout(() => {
        xhr.open('GET', objectUrl.changingThisBreaksApplicationSecurity, true);
        xhr.responseType = 'blob';
        xhr.onload = function() {
            myBlob = xhr.response
        };
        xhr.send();

      }, 50);
      setTimeout(() => {
        reader.readAsDataURL(myBlob);
          reader.onloadend = function() {
              base64data = reader.result;
              observer.next(base64data);
          }
      }, 100);
      setTimeout(() => {
        observer.complete();
      },150);
    });
    return data;
  }

  castToObject(obj: any, queryParams: any): any {
    const paramString = JSON.stringify(queryParams)
    obj = JSON.parse(paramString);
    return new Promise(resolve => {
      console.log('castToObject')
      resolve(obj);
    });

  }

  findInvalidControls(formGroup: FormGroup) {
    const controls = formGroup.controls;
    for (const name in controls) {
      if (!controls[name].valid) {
        controls[name].markAsDirty();
      }
    }
  }

  setManageStatus(value) {
    switch (value) {
      case '1': { return true; };
      case '2': { return false; };
    }
  }

  getManageStatus(value) {
    switch (value) {
      case true: { return '1'; };
      case false: { return '2'; };
    }
  }

  convertDay(id: number){
    let day
    switch (id) {
      case 1: {
        day = "จันทร์";
        break;
      }
      case 2: {
        day = "อังคาร";
        break;
      }
      case 3: {
        day = "พุธ";
        break;
      }
      case 4: {
        day = "พฤหัสบดี";
        break;
      }
      case 5: {
        day = "ศุกร์";
        break;
      }
      case 6: {
        day = "เสาร์";
        break;
      }
      case 7: {
        day = "อาทิตย์";
        break;
      }
      default: {
        day = "";
        break;
      }
    }
    return day
  }

  convertMonth(id: number){
    let month
    switch (id) {
      case 1: {
        month = "มกราคม";
        break;
      }
      case 2: {
        month = "กุมภาพันธ์";
        break;
      }
      case 3: {
        month = "มีนาคม";
        break;
      }
      case 4: {
        month = "เมษายน";
        break;
      }
      case 5: {
        month = "พฤษภาคม";
        break;
      }
      case 6: {
        month = "มิถุนายน";
        break;
      }
      case 7: {
        month = "กรกฎาคม";
        break;
      }
      case 8: {
        month = "สิงหาคม";
        break;
      }
      case 9: {
        month = "กันยายน";
        break;
      }
      case 10: {
        month = "ตุลาคม";
        break;
      }
      case 11: {
        month = "พฤศจิกายน";
        break;
      }
      case 12: {
        month = "ธันวาคม";
        break;
      }
      default: {
        month = "";
        break;
      }
    }
    return month
  }

  getCollageYear():SelectItem[] {
    let collageYear = [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '6', value: '6' }
    ]
    return collageYear;
  }

  getApplicationStep(){
    this.items = [
      {
        label: "ข้อมูลผู้ขอทุน",
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: "ข้อมูลทุนการศึกษา",
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: "ข้อมูลสถานะทางการเงินของครอบครัว",
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
      {
        label: "ข้อมูลครอบครัวและที่อยู่",
        command: (event: any) => {
          this.activeIndex = 3;
        }
      },
      {
        label: "ข้อมูลเอกสาร/หลักฐาน",
        command: (event: any) => {
          this.activeIndex = 4;
        }
      }
    ];
  }

  getAge(data: Date) {
    let birth = new Date(data);
    let current = new Date();
    let age = current.getFullYear() - birth.getFullYear();
    if (current.getMonth() < birth.getMonth() && current.getDate() < birth.getDate()) {
      age--;
    }else if(current.getMonth() < birth.getMonth()){
      age--;
    }
    return age
  }

  getBirthDay(birth_date: Date) {
    let date = new Date(birth_date);
     let birthday =
      date.getDate() +
      " " +
      this.convertMonth(date.getMonth() + 1) +
      " " +
      date.getFullYear().toString();
      return birthday
  }

  getGender(ref: string){
    let gender = ''
    if(ref == 'M'){
      gender = "ชาย"
    }else{
      gender = "หญิง"
    }
    return gender
  }
}

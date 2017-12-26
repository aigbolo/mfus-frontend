import { Injectable } from '@angular/core';
@Injectable()
export class UtilsService {

  constructor() { }

  // cri is page action such as M = manage page, S = search page
  getActiveStatus(cri: string){
    let activeStatus = []

    if(cri == 'M'){
      activeStatus = [
        {label: 'ใช้งาน', value: 'Y'},
        {label: 'ไม่ใช้งาน', value: 'N'}
      ]
    }

    if(cri == 'S'){
      activeStatus = [
        {label: 'ไม่ระบุ', value: ''},
        {label: 'ใช้งาน', value: 'Y'},
        {label: 'ไม่ใช้งาน', value: 'N'}
      ]
    }
    return activeStatus;
  }
}

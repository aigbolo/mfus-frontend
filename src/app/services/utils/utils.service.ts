import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
@Injectable()
export class UtilsService {



  constructor(private router: Router) { }

  // cri is page action such as M = manage page, S = search page
  getActiveFlag(cri: string) {
    let activeStatus = []

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


  getTitleList() {
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

  castToObject(obj: any, queryParams: any): any {
    const paramString = JSON.stringify(queryParams)
    obj = JSON.parse(paramString);
    return obj
  }

  findInvalidControls(formGroup: FormGroup) {
    const controls = formGroup.controls;
    for (const name in controls) {
      if (!controls[name].valid) {
        controls[name].markAsDirty();
      }
    }
  }

}

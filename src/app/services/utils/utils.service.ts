import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
@Injectable()
export class UtilsService {



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

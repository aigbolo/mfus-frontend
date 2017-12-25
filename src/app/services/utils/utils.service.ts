import { ConfigurationService } from './configuration.service';

import { RftDistrict } from './../../models/rft-district';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
import { RftProvince } from '../../models/rft-province';

@Injectable()
export class UtilsService {

  statusList: any[];
  titleList: any[];

  provinceList: RftProvince[];

  constructor(private configurationService: ConfigurationService) { }

  getStatusList() {
    this.statusList = [];
    this.statusList.push({ label: 'ไม่ระบุ', value: '' });
    this.statusList.push({ label: 'ใช้งาน', value: 'Y' });
    this.statusList.push({ label: 'ไม่ใช้งาน', value: 'N' });
    return this.statusList
  }

  getTitleList() {
    this.titleList = [];
    this.titleList.push({ label: 'นาย', value: 'Mr' });
    this.titleList.push({ label: 'นาง', value: 'Miss' });
    this.titleList.push({ label: 'นางสาว', value: 'Mrs' });
    return this.titleList
  }

  // getProvincesList() {
  //   console.log("getProvinceList")
  //   return this.configurationService.requestMethodGET('autocomplete-province').asobser
  // }

  getDistrictsByProvinceRef(province_ref: string) {

  }

}

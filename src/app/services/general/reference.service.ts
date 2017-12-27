import { RftDistrict } from './../../models/rft-district';
import { RftProvince } from './../../models/rft-province';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from '../utils/configuration.service';
import { RftSubDistrict } from '../../models/rft-sub-district';

@Injectable()
export class ReferenceService {

  private rftProvinces: RftProvince[] = [];
  private rftDistrict: RftDistrict[] = [];
  private rftSubDistrict: RftSubDistrict[] = [];

  constructor(private configuration: ConfigurationService) { }



  //Set RftProvince
  initialProvince(){
    this.configuration.requestMethodGET('autocomplete-province').subscribe(
      data => {
        this.rftProvinces = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  getProvinces(): RftProvince[] {
    return this.rftProvinces
  }


  //Set RftDistrict
  initialDistrict(provinceRef: string){
    this.configuration.requestMethodGET('autocomplete-district/'+provinceRef).subscribe(
      data => {
        this.rftDistrict = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  getDistricts(): RftDistrict[] {
    return this.rftDistrict
  }

  //Set RftDistrict
  initialSubDistrict(districtRef: string){
    this.configuration.requestMethodGET('autocomplete-subdistrict/'+districtRef).subscribe(
      data => {
        this.rftSubDistrict = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  getSubDistricts(): RftSubDistrict[] {
    console.log('service.getSubDistricts')
    return this.rftSubDistrict
  }

  getReferencesAddress(provinceRef:string,districtRef:string,subDistrictRef:string):Observable<any>{
    console.log('getReferencesAddress');
    let province: RftProvince = new RftProvince;
    let district: RftDistrict = new RftDistrict;
    let subDistrict: RftSubDistrict = new RftSubDistrict;
    let data = new Observable(observer => {
      setTimeout(() => {
        this.initialProvince();
      },100);
      setTimeout(() => {
        let objList: RftProvince[];
        objList = this.rftProvinces;
        for (let obj of objList) {
          if (obj.province_ref == provinceRef) {
            province = obj;
            observer.next(province);
          }
        }
        },200);
      setTimeout(() => {
        this.initialDistrict(province.province_ref);
      },400);
      setTimeout(()=>{
        let objList: RftDistrict[];
        objList = this.rftDistrict;
        for (let obj of objList) {
          if (obj.district_ref == districtRef) {
            district = obj;
            observer.next(district);
          }
        }
      },800);
      setTimeout(() => {
        this.initialSubDistrict(district.district_ref);
      },1200);
      setTimeout(()=>{
        let objList: RftSubDistrict[];
        objList = this.rftSubDistrict;
        for (let obj of objList) {
          if (obj.sub_district_ref == subDistrictRef) {
            subDistrict = obj;
            observer.next(subDistrict);
          }
        }
      },1600);
      setTimeout(() => {
        observer.complete();
      },1700);
    });
    return data;
  }

}

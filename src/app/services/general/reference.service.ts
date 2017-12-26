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
    console.log('initialProvince')
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
    console.log('service.getprovince')
    console.log(this.rftProvinces)
    return this.rftProvinces
  }


  //Set RftDistrict
  initialDistrict(provinceRef: string){
    console.log('initialDistrict')
    this.configuration.requestMethodGET('autocomplete-district/province_ref='+provinceRef).subscribe(
      data => {
        this.rftDistrict = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  getDistricts(): RftDistrict[] {
    console.log('service.getDistricts')
    return this.rftDistrict
  }

  //Set RftDistrict
  initialSubDistrict(districtRef: string){
    console.log('initialSubDistrict')
    this.configuration.requestMethodGET('autocomplete-subdistrict/district_ref='+districtRef).subscribe(
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


}

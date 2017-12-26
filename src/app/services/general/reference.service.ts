import { RftProvince } from './../../models/rft-province';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from '../utils/configuration.service';
import { RftDistrict } from '../../models/rft-district';
import { RftSubDistrict } from '../../models/rft-sub-district';

@Injectable()
export class ReferanceService {

  private rftProvinces: RftProvince[] = [];

  constructor(private configuration: ConfigurationService) { }

  initialProvince(){
    console.log('initialProvince')
    this.configuration.requestMethodGET('autocomplete-province').subscribe(
      data => {
        this.rftProvinces = data;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log(this.rftProvinces);
      }
    )
  }

  getProvinces(): RftProvince[] {
    console.log('service.getprovince')
    console.log(this.rftProvinces)
    return this.rftProvinces
  }

  getDistrictByProviceRef(provinceRef: string): Observable<RftDistrict[]> {
    return this.configuration.requestMethodGET(`autocomplete-district/province_ref=${provinceRef}`)
  }

  getSubDistrictByDistrictRef(districtRef: string): Observable<RftSubDistrict[]> {
    return this.configuration.requestMethodGET(`autocomplete-subdistrict/district_ref=${districtRef}`)
  }

}

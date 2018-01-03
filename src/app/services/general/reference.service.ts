import { RftSchool } from "./../../models/rft-school";
import { RftDistrict } from "./../../models/rft-district";
import { RftProvince } from "./../../models/rft-province";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ConfigurationService } from "../utils/configuration.service";
import { RftSubDistrict } from "../../models/rft-sub-district";
import { SmSponsors } from "../../models/sm-sponsors";

@Injectable()
export class ReferenceService {
  private rftProvinces: RftProvince[] = [];
  private rftDistricts: RftDistrict[] = [];
  private rftSubDistricts: RftSubDistrict[] = [];
  private smSponsors: SmSponsors[] = [];
  private smSponsor: SmSponsors;
  private rftSchools: RftSchool[] = [];

  constructor(private configuration: ConfigurationService) {}

  //Set RftProvince
  initialProvince() {
    this.configuration.requestMethodGET("autocomplete-province").subscribe(
      data => {
        this.rftProvinces = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getProvinces(): RftProvince[] {
    return this.rftProvinces;
  }

  //Set RftDistrict
  initialDistrict(provinceRef: string) {
    console.log("initialDistrict");
    this.configuration
      .requestMethodGET("autocomplete-district/" + provinceRef)
      .subscribe(
        data => {
          this.rftDistricts = data;
        },
        err => {
          console.log(err);
        }
      );
  }

  getDistricts(): RftDistrict[] {
    return this.rftDistricts;
  }

  //Set RftDistrict
  initialSubDistrict(districtRef: string) {
    this.configuration
      .requestMethodGET("autocomplete-subdistrict/" + districtRef)
      .subscribe(
        data => {
          this.rftSubDistricts = data;
        },
        err => {
          console.log(err);
        }
      );
  }

  getSubDistricts(): RftSubDistrict[] {
    console.log("service.getSubDistricts");
    return this.rftSubDistricts;
  }

  getReferencesAddress(
    provinceRef: string,
    districtRef: string,
    subDistrictRef: string
  ): Observable<any> {
    console.log("getReferencesAddress");
    let province: RftProvince = new RftProvince();
    let district: RftDistrict = new RftDistrict();
    let subDistrict: RftSubDistrict = new RftSubDistrict();
    let data = new Observable(observer => {
      setTimeout(() => {
        this.initialProvince();
      }, 100);
      setTimeout(() => {
        let objList: RftProvince[];
        objList = this.rftProvinces;
        for (let obj of objList) {
          if (obj.province_ref == provinceRef) {
            province = obj;
            observer.next(province);
          }
        }
      }, 200);
      setTimeout(() => {
        this.initialDistrict(province.province_ref);
      }, 500);
      setTimeout(() => {
        let objList: RftDistrict[];
        objList = this.rftDistricts;
        for (let obj of objList) {
          if (obj.district_ref == districtRef) {
            district = obj;
            observer.next(district);
          }
        }
      }, 1000);
      setTimeout(() => {
        this.initialSubDistrict(district.district_ref);
      }, 1500);
      setTimeout(() => {
        let objList: RftSubDistrict[];
        objList = this.rftSubDistricts;
        for (let obj of objList) {
          if (obj.sub_district_ref == subDistrictRef) {
            subDistrict = obj;
            observer.next(subDistrict);
          }
        }
      }, 2000);
      setTimeout(() => {
        observer.complete();
      }, 2200);
    });
    return data;
  }

  initialSchools() {
    this.configuration.requestMethodGET("autocomplete-schools").subscribe(
      data => {
        this.rftSchools = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getSchools() {
    return this.rftSchools;
  // getSchools(){
  //  return this.configuration.requestMethodGET('autocomplete-schools')
  // }
  }


  getMajorBySchoolRef(schoolRef:string){
    return this.configuration.requestMethodGET('autocomplete-major'+schoolRef)
  }

  initialSponsors() {
    this.configuration.requestMethodGET("autocomplete-sponsors").subscribe(
      data => {
        this.smSponsors = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getSponsors() {
    return this.smSponsors;
  }

  getReferenceSponsor(ref: string){
    let jsonPk = {'sponsors_ref': ref}
    console.log(jsonPk)
    return this.configuration.requestMethodPOST('sponsors-update', jsonPk)
  }
}

import { SmSponsors } from './../../models/sm-sponsors';
import { RftMajor } from "./../../models/rft-major";
import { RftSchool } from "./../../models/rft-school";
import { RftDistrict } from "./../../models/rft-district";
import { RftProvince } from "./../../models/rft-province";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ConfigurationService } from "../utils/configuration.service";
import { RftSubDistrict } from "../../models/rft-sub-district";
import { SmScholarship } from "../../models/sm-scholarship";

@Injectable()
export class ReferenceService {
  private rftProvinces: RftProvince[] = [];
  private rftDistricts: RftDistrict[] = [];
  private rftSubDistricts: RftSubDistrict[] = [];
  private rftSchools: RftSchool[] = [];
  private rftMajors: RftMajor[] = [];
  private sponsors: SmSponsors[] = [];
  private scholarships: SmScholarship[] = [];

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

  getSchool() {
    return this.rftSchools;
  }

  getSchools() {
    return this.configuration.requestMethodGET("autocomplete-schools");
  }
  initialMajors(schoolRef: string) {
       this.configuration.requestMethodGET("autocomplete-major/" + schoolRef)
         .subscribe(data => {
           this.rftMajors = data;
          });
      }

  getMajors() {
      return this.rftMajors;
  }

  getMajorBySchoolRef(schoolRef: string) {
    return this.configuration.requestMethodGET(
      "autocomplete-major/" + schoolRef
    );
  }

  initialSponsors() {
    this.configuration.requestMethodGET("autocomplete-sponsors").subscribe(
      data=>{
        this.sponsors = data;
      },
      err=>{
        console.log(err)
      }
    )
  }

  getSponsors(){
    return this.sponsors;
  }

  getReferenceSponsor(ref: string) {
    let jsonPk = { sponsors_ref: ref };
    return this.configuration.requestMethodPOST("sponsors-update", jsonPk);
  }

  initialScholarships(ref:string){
    this.configuration.requestMethodGET('autocomplete-scholarships/'+ref).subscribe(
      data=>{
        this.scholarships = data;
      },
      err =>{
        console.log(err)
      }
    )
  }

  getScholarships(){
    return this.scholarships;
  }
}

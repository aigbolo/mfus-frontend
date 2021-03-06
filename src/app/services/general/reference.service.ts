import { SmScholarshipAnnouncement } from './../../models/sm-scholarship-announcement';
import { RftScholarshipType } from "./../../models/rft-schoalrship_type";
import { SmSponsors } from "./../../models/sm-sponsors";
import { RftMajor } from "./../../models/rft-major";
import { RftSchool } from "./../../models/rft-school";
import { RftDistrict } from "./../../models/rft-district";
import { RftProvince } from "./../../models/rft-province";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ConfigurationService } from "../utils/configuration.service";
import { RftSubDistrict } from "../../models/rft-sub-district";
import { SmScholarship } from "../../models/sm-scholarship";
import { RequestOptions } from "@angular/http";

@Injectable()
export class ReferenceService {
  private rftProvinces: RftProvince[] = [];
  private rftDistricts: RftDistrict[] = [];
  private rftSubDistricts: RftSubDistrict[] = [];
  private rftSchools: RftSchool[] = [];
  private rftMajors: RftMajor[] = [];
  private sc_type: RftScholarshipType[] = [];
  private sponsors: SmSponsors[] = [];
  private scholarships: SmScholarship[] = [];
  private scholarshipAnnouncementSearch: any[] = [];

  activeIndex: number = 0
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
    this.configuration
      .requestMethodGET("autocomplete-major/" + schoolRef)
      .subscribe(data => {
        console.log(data)
        this.rftMajors = data;
      });
  }

  getMajors() {
    return this.rftMajors;
  }

  getMajorBySchoolRef(schoolRef: string) {
    return this.configuration.requestMethodGET("autocomplete-major/" + schoolRef
    );
  }

  initialSponsors() {
    this.configuration.requestMethodGET("autocomplete-sponsors").subscribe(
      data => {
        this.sponsors = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getSponsors() {
    return this.sponsors;
  }

  getSponsor(sponsorsRef: string): SmSponsors {
    let data: SmSponsors;
    for (let obj of this.sponsors) {
      if (obj.sponsors_ref == sponsorsRef) {
        data = obj;
      }
    }
    return data;
  }

  getReferenceSponsor(ref: string) {
    let jsonPk = { sponsors_ref: ref };
    return this.configuration.requestMethodPOST("sponsors-update", jsonPk);
  }

  initialScholarshipType() {
    return this.configuration.requestMethodGET("autocomplete-sctype");
  }

  getScholarshipType() {
    return this.sc_type;
  }

  // Begin Functions for Scholarships
  initialScholarships(ref:string){
    let url = (ref != null?'autocomplete-scholarships/'+ref:'autocomplete-scholarships');
    this.configuration.requestMethodGET(url).subscribe(
      data=>{
        this.scholarships = data;
        console.log(this.scholarships);
      },
      err =>{
        console.log(err)
      }
    )
  }


  autocompleteScholarships(criteria){
    let url = 'autocomplete-scholarships';
    let promise = new Promise((resolve, reject) => {
    this.configuration.requestMethodGET(url).subscribe(
      data=>{
        console.log(data);
        this.scholarships = data;
        resolve(data);
      },
      err =>{
        console.log(err)
        reject(err);
      }
    )
  });
  return promise;
  }



  initialScholarshipAnnouncementForSearch(parameters:any){
    this.configuration.requestMethodPOST("autocomplete-scannounce", parameters).subscribe(
      data=>{
        this.scholarshipAnnouncementSearch = data;
      },
      err=>{
        console.log(err);
      }
    )
  }

  autocompleteScholarshipAnnouncementForSearch(parameters:any){
    let promise = new Promise((resolve, reject) => {
    this.configuration.requestMethodPOST("autocomplete-scannounce", parameters).subscribe(
      data=>{
        this.scholarshipAnnouncementSearch = data;
        resolve(data);
      },
      err=>{
        reject(err);
        console.log(err);
      }
    )
    });
    return promise;
  }


  getScholarshipAnnouncementsForSearch(){
    return this.scholarshipAnnouncementSearch;
  }
  getOneScholarshipAnnouncementForSearch(announcement_ref:string){
    let data = null;
    for (let obj of this.scholarshipAnnouncementSearch){
      if(announcement_ref == obj.announcement_ref){
        data = obj;
      }
    }
    return data;
  }

  getApplicationDocument() {
    return this.configuration.requestMethodPOST('appdoc', '');
  }

  getScholarships() {
    console.log('getScholarships: ',this.scholarships)
    return this.scholarships;
  }

  getEducationLevel() {
    return this.configuration.requestMethodGET('autocomplete-edlevel');
  }

  getRoundAnnouncement(year: number, scholarshipRef: string) {
    let body = { year: year, scholarship_ref: scholarshipRef };
    return this.configuration.requestMethodPOST("round", body);
  }




  getSchoolByRef(ref: string) {
    return this.configuration.requestMethodGET("get-school/"+ ref)
  }

  getMajorByRef(ref: string) {
    return this.configuration.requestMethodGET("get-major/"+ref)
  }

  getProvinceByRef(ref: string){
    return this.configuration.requestMethodGET("get-province/"+ref)
  }
  getDistrictByRef(ref: string){
    return this.configuration.requestMethodGET("get-district/"+ref)
  }
  getSubDistrictByRef(ref: string){
    return this.configuration.requestMethodGET("get-sub-district/"+ref)
  }

  getEducationLevelByRef(ref: string){
    return this.configuration.requestMethodGET("get-edlevel/"+ref)
  }

  getSponsorsByRef(ref:string){
    return this.configuration.requestMethodGET("get-sponsors/"+ref)
  }
  getScholarshipByRef(ref:string){
    return this.configuration.requestMethodGET("get-scholarships/"+ref)
  }
  getScholarshipTypeByRef(ref:string){
    return this.configuration.requestMethodGET("get-sctype/"+ref)
  }
  getAnnouncementByRef(ref:string){
    return this.configuration.requestMethodGET("get-announcement/"+ref)
  }
}

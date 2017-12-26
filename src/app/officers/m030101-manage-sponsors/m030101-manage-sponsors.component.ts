import { RftSubDistrict } from './../../models/rft-sub-district';
import { UtilsService } from './../../services/utils/utils.service';
import { RftProvince } from './../../models/rft-province';
import { Observable } from 'rxjs/Observable';
import { ReferenceService } from '../../services/general/reference.service';
import { LayoutService } from '../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';
import { RftDistrict } from '../../models/rft-district';

@Component({
  selector: 'app-m030101-manage-sponsors',
  templateUrl: './m030101-manage-sponsors.component.html',
  styleUrls: ['./m030101-manage-sponsors.component.css']
})
export class M030101ManageSponsorsComponent implements OnInit {
  image: any;
  activeStatus = [];
  provinceList: RftProvince[] = [];
  districtList: RftDistrict[] = [];
  subDistrictList: RftSubDistrict[] = [];

  province: RftProvince = new RftProvince;
  district: RftDistrict = new RftDistrict;
  subDistrict: RftSubDistrict = new RftSubDistrict;


  constructor(private layoutService: LayoutService,
              private referenceService: ReferenceService,
              private utilsService: UtilsService) { }

  ngOnInit() {
    this.layoutService.setPageHeader('บันทึกผู้ให้ทุนการศึกษา');
    this.image = '../../assets/images/empty_profile.png';
    this.referenceService.initialProvince();
    this.activeStatus = this.utilsService.getActiveFlag('M');

  }




  autocompleteProvince(event) {
    console.log("autocompleteProvince");
    let query = event.query;
    this.provinceList = [];

    let objList: RftProvince[];
    objList = this.referenceService.getProvinces();
    for (let obj of objList) {
      // Filter By string event
      if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.provinceList.push(obj);
      }
    }
  }

  handleCompleteClickProvince() {
    console.log("handleCompleteClickProvince");

     setTimeout(() => {
      this.provinceList = this.referenceService.getProvinces();
    }, 100);

  }

  seletedProvince(){
    this.referenceService.initialDistrict(this.province.province_ref);
  }

  autocompleteDistrict(event) {
    console.log("autocompleteProvince");
    let query = event.query;
    this.districtList = [];

    let objList: RftDistrict[];
    objList = this.referenceService.getDistricts();
    for (let obj of objList) {
      // Filter By string event
      if (obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.districtList.push(obj);
      }
    }
  }

  handleCompleteClickDistrict() {
    console.log("handleCompleteClickDistrict");

     setTimeout(() => {
      this.districtList = this.referenceService.getDistricts();
    }, 100);

  }

  seletedDistrict(){
    this.referenceService.initialSubDistrict(this.district.district_ref);
  }

  autocompleteSubDistrict(event) {
    console.log("autocompleteProvince");
    let query = event.query;
    this.subDistrictList = [];

    let objList: RftSubDistrict[];
    objList = this.referenceService.getSubDistricts();
    for (let obj of objList) {
      // Filter By string event
      if (obj.sub_district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.subDistrictList.push(obj);
      }
    }
  }

  handleCompleteClickSubDistrict() {
    console.log("handleCompleteClickDistrict");

     setTimeout(() => {
      this.districtList = this.referenceService.getDistricts();
    }, 100);

  }

  seletedSubDistrict(){

  }
}

import { UtilsService } from './../../services/utils/utils.service';
import { RftProvince } from './../../models/rft-province';
import { Observable } from 'rxjs/Observable';
import { ReferanceService } from '../../services/general/reference.service';
import { LayoutService } from '../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-m030101-manage-sponsors',
  templateUrl: './m030101-manage-sponsors.component.html',
  styleUrls: ['./m030101-manage-sponsors.component.css']
})
export class M030101ManageSponsorsComponent implements OnInit {
  image: any;
  activeStatus = [];
  constructor(private layoutService: LayoutService,
              private referanceService: ReferanceService,
              private utilsService: UtilsService) { }

  ngOnInit() {
    this.layoutService.setPageHeader('บันทึกผู้ให้ทุนการศึกษา');
    this.image = '../../assets/images/empty_profile.png';
    // this.listProvince = this.referanceService.getProvinces();
    this.activeStatus = this.utilsService.getActiveFlag('M');
  }




  // autocompleteProvince(event) {
  //   console.log("autocompleteProvince");
  //   let query = event.query;
  //   this.provinceList = [];
  //   // this.homeDistrict = new RftDistrict();
  //   // this.homeSubDistrict = new RftSubDistrict();
  //   let objList: RftProvince[];
  //   objList = this.listProvince;
  //   for (let obj of objList) {
  //     // Filter By string event
  //     if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
  //       this.homeProvinceList.push(obj);
  //     }
  //   }
  // }

  // handleCompleteClickProvince(index: number) {
  //   console.log("handleCompleteClickProvince");
  //   if (index == 0) {
  //     this.homeProvinceList = [];

  //     setTimeout(() => {
  //       this.homeProvinceList = this.listProvince;
  //       this.homeDistrictList = [];
  //       this.homeSubDistrictList = [];
  //     }, 100);
  //   }
  //   if (index == 1) {
  //     this.currentProvinceList = [];
  //     setTimeout(() => {
  //       this.currentProvinceList = this.listProvince;
  //       this.currentDistrictList = [];
  //       this.currentSubDistrictList = [];
  //     }, 100);
  //   }
  // }

  //  // Autocomplete Selected
  //  selectProvince(index: number) {
  //   console.log("selectProvince");
  //   if (index == 0) {
  //     // this.thisForm.homeProvince = new RftProvince();
  //     this.homeDistrict = new RftDistrict();
  //     this.homeSubDistrict = new RftSubDistrict();
  //     this.thisForm.acAddress.home_postcode = null;
  //     this.utilsService
  //       .getDistrictsByProvinceRef(this.homeProvince.province_ref)
  //       .subscribe((res: RftDistrict[]) => {
  //         this.homeListDistrict = [];
  //         this.homeListDistrict.push(...res);
  //       });
  //   }
  // }
}

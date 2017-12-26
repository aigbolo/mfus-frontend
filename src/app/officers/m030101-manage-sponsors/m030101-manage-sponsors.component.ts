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
  provinceList: RftProvince[] = [];
  constructor(private layoutService: LayoutService,
              private referanceService: ReferanceService,
              private utilsService: UtilsService) { }

  ngOnInit() {
    this.layoutService.setPageHeader('บันทึกผู้ให้ทุนการศึกษา');
    this.image = '../../assets/images/empty_profile.png';
    this.referanceService.initialProvince();
    this.activeStatus = this.utilsService.getActiveFlag('M');

  }




  autocompleteProvince(event) {
    console.log("autocompleteProvince");
    let query = event.query;
    this.provinceList = [];
    // this.homeDistrict = new RftDistrict();
    // this.homeSubDistrict = new RftSubDistrict();
    let objList: RftProvince[];
    objList = this.referanceService.getProvinces();
    for (let obj of objList) {
      // Filter By string event
      if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.provinceList.push(obj);
      }
    }
  }

  handleCompleteClickProvince(index: number) {
    console.log("handleCompleteClickProvince");

     setTimeout(() => {
      this.provinceList = this.referanceService.getProvinces();
    }, 100);


  }

}

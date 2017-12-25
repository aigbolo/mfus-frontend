import { ReferanceService } from './../../../services/general/reference.service';

import { RftSubDistrict } from './../../../models/rft-sub-district';
import { RftDistrict } from './../../../models/rft-district';
import { Component, OnInit } from '@angular/core';
import { OfficerForm } from '../../../forms/officer-form';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { RftProvince } from '../../../models/rft-province';
import { UtilsService } from '../../../services/utils/utils.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-manage-officer',
  templateUrl: './manage-officer.component.html',
  styleUrls: ['./manage-officer.component.css']
})
export class ManageOfficerComponent implements OnInit {

  manageOfficerForm: OfficerForm = new OfficerForm();
  officerFormGroup: FormGroup;

  // Autocomplete Province
  provinceList: RftProvince[] = [];
  provinceObject: RftProvince;
  listProvince: RftProvince[] = [];

  // Autocomplete District
  districtList: RftDistrict[] = [];
  districtObject: RftDistrict;
  listDistrict: RftDistrict[] = [];

  // Autocomplete SubDistrict
  subDistrictList: RftSubDistrict[] = [];
  subDistrictObject: RftSubDistrict;
  listSubDistrict: RftSubDistrict[] = [];

  statusList: any[];
  titleList: any[];

  fileList: FileList;
  binaryString: string;
  file: File;

  image: any = '';
  image_name: string;
  image_type:string;

  constructor(private utilService: UtilsService,private referenceService: ReferanceService) { }

  ngOnInit() {
    console.log('manageofficer')
    // this.image = 'https://www.clker.com/cliparts/g/l/R/7/h/u/teamstijl-person-icon-blue-md.png'
    this.statusList = this.utilService.getStatusList();
    this.titleList = this.utilService.getTitleList();
    this.getProvince();
  }

  getProvince() {
    console.log('getprovince')
    this.listProvince = [];
    // this.listProvince = ;
    console.log(this.referenceService.getProvinces().subscribe((res: RftProvince[])=>{
      return res;
    }))
  }

  autocompleteProvince(event) {
    let query = event.query;
    this.provinceList = [];
    this.manageOfficerForm.rftDistrict = new RftDistrict();
    this.manageOfficerForm.rftSubDistrict = new RftSubDistrict();
    let objList: RftProvince[];
    objList = this.listProvince;
    for (let obj of objList) {
      if (obj.province_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.provinceList.push(obj);
      }
    }
  }

  handleCompleteClickProvince() {
    this.provinceList = [];

    setTimeout(() => {
      this.provinceList = this.listProvince;
      this.districtList = [];
      this.subDistrictList = [];
    }, 100)
  }

  selectProvince(event: SelectItem) {
    this.districtList = [];
    this.subDistrictList = [];
    this.manageOfficerForm.rftDistrict = new RftDistrict();
    this.manageOfficerForm.rftSubDistrict = new RftSubDistrict();
    // this.utilService.getDistrictsByProvinceRef(this.manageOfficerForm.rftProvince.province_ref)
    //   .subscribe((res: RftDistrict[]) => {
    //     this.listDistrict = [];
    //     this.listDistrict.push(...res);
    //   }
    //   );
  }

  autocompleteDistrict(event) {
    let query = event.query;
    this.districtList = [];
    this.manageOfficerForm.rftSubDistrict = new RftSubDistrict();
    let objList: RftDistrict[];
    objList = this.listDistrict;
    for (let obj of objList) {
      if (this.manageOfficerForm.rftProvince.province_ref === obj.province_ref) {
        if (obj.district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          this.districtList.push(obj);
        }
      }
    }
  }

  handleCompleteClickDistrict() {
    this.districtList = [];
    setTimeout(() => {
      this.districtList = this.listDistrict;
      this.subDistrictList = [];
    }, 100)
  }

  selectDistrict(event: SelectItem) {
    this.listSubDistrict = [];
    this.manageOfficerForm.rftSubDistrict = new RftSubDistrict();
    // this.utilService.getSubDistrictsByDistrictRef(this.officerEditForm.rftDistrict.district_ref)
    //   .subscribe((res: RftSubDistrict[]) => {
    //     this.listSubDistrict.push(...res);
    //   }
    //   );
  }

  autocompleteSubDistrict(event) {
    let query = event.query;
    this.subDistrictList = [];
    let objList: RftSubDistrict[] = this.listSubDistrict;
    for (let obj of objList) {
      if (obj.province_ref == this.manageOfficerForm.rftProvince.province_ref) {
        if (obj.district_ref == this.manageOfficerForm.rftDistrict.district_ref) {
          if (obj.sub_district_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            this.listSubDistrict.push(obj);
          }
        }
      }
    }
  }

  handleCompleteClickSubDistrict() {
    this.subDistrictList = [];
    setTimeout(() => {
      this.subDistrictList = this.listSubDistrict;
    }, 100)
  }

  selectSubDistrict(event: SelectItem) {
    this.manageOfficerForm.acOfficer.postcode = this.manageOfficerForm.rftSubDistrict.postcode;
  }

  onUpload(event) {
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      this.file = this.fileList[0];
      // 10 MB
      if (this.file.size < 10000000) {
        let reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.file);
      }
    }
  }

  handleReaderLoaded(readerEvent) {
    this.binaryString = readerEvent.target.result;
    this.image = 'data:' + this.file.type + ';base64,' + btoa(this.binaryString);
    console.log(this.file.name);
    console.log(this.file.size);
    console.log(this.file.type);
  }

  onSubmit() {
    console.log("officerForm: ", this.manageOfficerForm)
  }

  onResetClick(){
    this.manageOfficerForm = new OfficerForm();
    this.image = ''
    this.image_name = ''
    this.image_type = ''
  }
  onPageSearch() {

  }
}

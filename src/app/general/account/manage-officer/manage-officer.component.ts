
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

  image: any;
  image_name: string;
  image_type:string;

  constructor(private utilService: UtilsService) { }

  ngOnInit() {
    this.statusList = this.utilService.getStatusList();
    this.titleList = this.utilService.getTitleList();
  }

  getProvince() {
    this.listProvince = [];
    this.listProvince = this.utilService.provinceList;
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

  onPageSearch() {

  }
}

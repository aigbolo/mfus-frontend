import { M010102OfficerService } from './../../../services/officers/m010102-officer.service';
import { LayoutService } from './../../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';
import { OfficerForm } from '../../../forms/officer-form';
import { UtilsService } from '../../../services/utils/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-officer',
  templateUrl: './s010102-search-officer.component.html',
  styleUrls: ['./s010102-search-officer.component.css']
})
export class S010102SearchOfficerComponent implements OnInit {

  searchForm: OfficerForm = new OfficerForm();
  statusList: any[];

  listOfficerForm: OfficerForm[];

  constructor(private utilService: UtilsService,
    private layoutService: LayoutService,
    private officerService: M010102OfficerService) { }

  ngOnInit() {
    this.layoutService.setPageHeader('ค้นหาข้อมูลเจ้าหน้าที่')
  }

  onSearchClick() {
    console.log(this.searchForm.searchCriteria)
    this.officerService.searchOfficer(this.searchForm).subscribe(res=>{

      this.listOfficerForm = res
      console.log(this.listOfficerForm)
      for(let obj of this.listOfficerForm){
        obj.fullname = obj.acOfficer.first_name + ' ' + obj.acOfficer.last_name
      }
      console.log(this.listOfficerForm)
      return this.listOfficerForm
    })
  }

  onResetClick() {
    this.searchForm = new OfficerForm();
  }

  onInsertPageClick() {
    this.utilService.goToPage('manage-officer')
  }

}

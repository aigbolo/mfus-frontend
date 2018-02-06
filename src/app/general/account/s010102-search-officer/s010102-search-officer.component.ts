import { AcOfficer } from './../../../models/ac-officer';
import { JqueryScriptService } from './../../../services/utils/jquery-script.service';
import { M010102OfficerService } from './../../../services/officers/m010102-officer.service';
import { LayoutService } from './../../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';
import { OfficerForm } from '../../../forms/officer-form';
import { UtilsService } from '../../../services/utils/utils.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-officer',
  templateUrl: './s010102-search-officer.component.html',
  styleUrls: ['./s010102-search-officer.component.css']
})
export class S010102SearchOfficerComponent implements OnInit {

  searchForm: OfficerForm = new OfficerForm();
  statusList: any[];

  selectofficer: AcOfficer

  listOfficer: AcOfficer[];
  activeFlag: any[] = []
  constructor(public utilsService: UtilsService,
    private layoutService: LayoutService,
    private officerService: M010102OfficerService,
    private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.layoutService.setPageHeader('ค้นหาข้อมูลเจ้าหน้าที่')
    this.activeFlag = this.utilsService.getActiveFlag('S')
  }

  onSearchClick() {
    this.utilsService.goToPageWithQueryParam('search-officer',this.searchForm.searchCriteria);
    this.doSearch();
  }

  doSearch(){
    console.log(this.searchForm.searchCriteria)
    this.officerService.searchOfficer(this.searchForm).subscribe(res => {
      console.log(res)
      this.listOfficer = res
      for (let obj of this.listOfficer) {
        obj.first_name = obj.first_name + ' ' + obj.last_name
      }
    }, error => {
      console.log('error: ' + error)
    }, () => {
      return this.listOfficer
    });

  }

  onResetClick() {
    this.searchForm = new OfficerForm();
    this.listOfficer = [];
  }

  onInsertPageClick() {
    this.utilsService.goToPage('manage-officer')
  }

  onRowSelect(event) {
    this.selectofficer = event.data
    this.utilsService.goToPageWithParam('manage-officer/', this.selectofficer.officer_ref)
  }
}

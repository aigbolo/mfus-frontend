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
              private router:Router) { }

  ngOnInit() {
    this.layoutService.setPageHeader('ค้นหาข้อมูลเจ้าหน้าที่')
  }

  onSearchClick(){
    console.log(this.searchForm)
  }

  onResetClick(){
    this.searchForm = new OfficerForm();
  }

  onInsertClick(){
    this.utilService.goToPage('/manage-officer')
  }
}

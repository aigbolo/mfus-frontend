import { Component, OnInit } from '@angular/core';
import { OfficerForm } from '../../../forms/officer-form';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-search-officer',
  templateUrl: './search-officer.component.html',
  styleUrls: ['./search-officer.component.css']
})
export class SearchOfficerComponent implements OnInit {

  searchForm: OfficerForm = new OfficerForm();
  statusList: any[];

  constructor(private utilService: UtilsService) { }

  ngOnInit() {
    this.getStatusList();
  }

  getStatusList(){

    this.statusList = this.utilService.getStatusList();
  }
  onSearchClick(){
    console.log(this.searchForm)
  }

  onResetClick(){
    this.searchForm = new OfficerForm();
  }
}

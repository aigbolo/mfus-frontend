import { UtilsService } from './../../services/utils/utils.service';
import { Component, OnInit } from '@angular/core';
import { SmScholarship } from '../../models/sm-scholarship';
import { ScholarshipForm } from '../../forms/scholarship-form';

@Component({
  selector: 'app-s030102-search-scolarship',
  templateUrl: './s030102-search-scolarship.component.html',
  styleUrls: ['./s030102-search-scolarship.component.css']
})
export class S030102SearchScolarshipComponent implements OnInit {

  scholarshipFormList: ScholarshipForm[]

  searchForm: ScholarshipForm = new ScholarshipForm();

  activeFlag: any[]
  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
    this.activeFlag = this.utilsService.getActiveFlag('S')
  }


  onRowSelect(event){

  }

  onSearchClick(){

  }

  onResetClick(){

  }

  onInsertPageClick(){

  }
}

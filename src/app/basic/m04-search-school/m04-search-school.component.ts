import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils/utils.service';
import { SchoolService } from '../../services/references/school.service';
import { LayoutService } from '../../services/utils/layout.service';
import { ActivatedRoute } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { RftSchool } from '../../models/rft-school';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-m04-search-school',
  templateUrl: './m04-search-school.component.html',
  styleUrls: ['./m04-search-school.component.css']
})
export class M04SearchSchoolComponent implements OnInit {

  schoolCriteria:RftSchool = new RftSchool;
  school:RftSchool;
  schoolList:RftSchool[];
  activeStatus = [];
  onLoad = false;
  constructor(
    private utilsService:UtilsService,
    private schoolService:SchoolService,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    public ngProgress: NgProgress) { }

  ngOnInit() {
    this.layoutService.setPageHeader('ค้นหาข้อมูลสำนักวิชา');
    this.activeStatus = this.utilsService.getActiveFlag('S');
    if(JSON.stringify(this.route.snapshot.queryParams) != '{}'){
      this.school = this.utilsService.castToObject(this.schoolCriteria,this.route.snapshot.queryParams);
      if(this.schoolCriteria.school_code){
        this.doSearch();
      }
    }
  }


  onSearch(){
    this.utilsService.goToPageWithQueryParam('search-school',this.schoolCriteria);
    this.doSearch();
  }

  doSearch(){
    this.onLoad = true;
    this.schoolService.onSearch(this.schoolCriteria).subscribe(data=>{
      this.schoolList = data;
    },
    error =>{
      console.log('error..............');
    },
    ()=>{
      this.onLoad = false;
    });

  }

  onRowSelect(event){
    console.log('onRowSelect..............');
    this.utilsService.goToPage('manage-school/'+this.school.school_ref)
  }

  onReset(){
    this.schoolCriteria = new RftSchool;
    this.school = new RftSchool;
    this.schoolList = [];
    this.utilsService.goToPage('search-school');
  }
  onPageInsert(){
    this.utilsService.goToPage('manage-school');
  }

}

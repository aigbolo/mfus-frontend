import { Component, OnInit } from '@angular/core';
import { RftMajor } from '../../models/rft-major';
import { UtilsService } from '../../services/utils/utils.service';
import { LayoutService } from '../../services/utils/layout.service';
import { ActivatedRoute } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { MajorService } from '../../services/references/major.service';
import { RftSchool } from '../../models/rft-school';
import { ReferenceService } from '../../services/general/reference.service';

@Component({
  selector: 'app-m05-search-major',
  templateUrl: './m05-search-major.component.html',
  styleUrls: ['./m05-search-major.component.css']
})
export class M05SearchMajorComponent implements OnInit {

  majorCriteria:RftMajor = new RftMajor;
  major:RftMajor;
  majorList:RftMajor[];

  schoolList: RftSchool[];
  school:RftSchool;
  
  activeStatus = [];
  onLoad = false;
  constructor(
    private utilsService:UtilsService,
    private majorService: MajorService,
    private layoutService: LayoutService,
    private referenceService:ReferenceService,
    private route: ActivatedRoute,
    public ngProgress: NgProgress) { }

  ngOnInit() {
    this.layoutService.setPageHeader('ค้นหาข้อมูลสาขาวิชา');
    this.referenceService.initialSchools();
    this.activeStatus = this.utilsService.getActiveFlag('S');
    if(JSON.stringify(this.route.snapshot.queryParams) != '{}'){
      this.major = this.utilsService.castToObject(this.majorCriteria,this.route.snapshot.queryParams);
      if(this.majorCriteria.major_code){
        this.doSearch();
      }
    }
  }


  onSearch(){
    this.utilsService.goToPageWithQueryParam('search-major',this.majorCriteria);
    this.doSearch();
  }

  doSearch(){
    this.onLoad = true;
    this.majorService.onSearch(this.majorCriteria).subscribe(data=>{
      console.log(data)
      this.majorList = data;
    },
    error =>{
      console.log(error);
    },
    ()=>{
      this.onLoad = false;
    });

  }

  onRowSelect(event){
    this.utilsService.goToPage('manage-major/'+this.major.major_ref)
  }

  onReset(){
    this.majorCriteria = new RftMajor;
    this.major = new RftMajor;
    this.majorList = [];
    this.utilsService.goToPage('search-major');
  }
  onPageInsert(){
    this.utilsService.goToPage('manage-major');
  }

  autoCompleteSchools(event) {
    let query = event.query;
    let e = event.originalEvent;
    this.schoolList = [];
    if(e.type=='input'){
      this.major.school_ref = null;
    }
    let objList: RftSchool[];
    objList = this.referenceService.getSchool();
    for (let obj of objList) {
      if (obj.school_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.schoolList.push(obj);
      }
    }
  }

  handleCompleteClickSchools() {
    setTimeout(() => {
      this.schoolList = this.referenceService.getSchool();
    }, 100);
  }

  selectSchool(){
    this.majorCriteria.school_ref = this.school.school_ref;
  }

}

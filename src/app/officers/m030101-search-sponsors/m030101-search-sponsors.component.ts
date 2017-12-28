import { JqueryScriptService } from './../../services/utils/jquery-script.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { M030101SponsorsForm } from './../../forms/sponsors-form';
import { UtilsService } from './../../services/utils/utils.service';
import { LayoutService } from './../../services/utils/layout.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { M030101SponsorsService } from '../../services/officers/m030101-sponsors.service';
import { SmSponsors } from '../../models/sm-sponsors';

@Component({
  selector: 'app-m030101-search-sponsors',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m030101-search-sponsors.component.html',
  styleUrls: ['./m030101-search-sponsors.component.css']
})
export class M030101SearchSponsorsComponent implements OnInit {
  searchForm:M030101SponsorsForm = new M030101SponsorsForm();
  sponsorsList: SmSponsors[] = [];
  sponsor: SmSponsors = new SmSponsors;
  activeStatus = [];
  onLoad = false;
  sub:any;
  page: any;
  constructor(private layoutService: LayoutService,
              private utilsService: UtilsService,
              private sponsorsService: M030101SponsorsService,
              private activateRoute: ActivatedRoute) {
                this.searchForm.search_criteria = this.utilsService.castToObject(this.searchForm.search_criteria,this.activateRoute.snapshot.queryParams);
                if(this.searchForm.search_criteria.sponsors_name != null || this.searchForm.search_criteria.active_flag != null){
                  this.doSearch();
                }
            }

  ngOnInit() {
    this.layoutService.setPageHeader('ค้นหาข้อมูลผู้ให้ทุนการศึกษา');
    this.activeStatus = this.utilsService.getActiveFlag('S');
     }

  onSearch(){
    this.utilsService.goToPageWithQueryParam('search-sponsors',this.searchForm.search_criteria);
    this.doSearch();
  }

  doSearch(){
    this.onLoad = true;
    this.sponsorsService.doSearch(this.searchForm).subscribe(data=>{
      this.sponsorsList = data;
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
    this.utilsService.goToPage('manage-sponsors/'+this.sponsor.sponsors_ref)
  }

  onReset(){
    this.searchForm = new M030101SponsorsForm;
    this.sponsorsList = [];
    this.utilsService.goToPage('search-sponsors');
  }
  onPageInsert(){
    this.utilsService.goToPage('manage-sponsors');
  }

}

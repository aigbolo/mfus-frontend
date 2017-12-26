import { JqueryScriptService } from './../../services/utils/jquery-script.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { M030101SponsorsForm } from './../../forms/sponsors-form';
import { UtilsService } from './../../services/utils/utils.service';
import { LayoutService } from './../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { M030101SponsorsService } from '../../services/officers/m030101-sponsors.service';
import { SmSponsors } from '../../models/sm-sponsors';

@Component({
  selector: 'app-m030101-search-sponsors',
  templateUrl: './m030101-search-sponsors.component.html',
  styleUrls: ['./m030101-search-sponsors.component.css']
})
export class M030101SearchSponsorsComponent implements OnInit {
  criteriaForm:M030101SponsorsForm = new M030101SponsorsForm();

  dataTable: SmSponsors[] = [];
  activeStatus = [];
  constructor(private layoutService: LayoutService,
              private utilsService: UtilsService,
              private sponsorsService: M030101SponsorsService,
              private js: JqueryScriptService) { }

  ngOnInit() {
    this.layoutService.setPageHeader('ค้นหาผู้ให้ทุนการศึกษา');
    this.activeStatus = this.utilsService.getActiveFlag('S');
  }

  onSearch(){
    console.log('onSearch..............');
    console.log(this.criteriaForm.search_criteria);
    this.sponsorsService.doSearch(this.criteriaForm).subscribe(data=>{
      this.dataTable = data;
    },
    error =>{
      console.log('error..............');
    },
  ()=>{
    console.log('done..............');

    this.js.updateActiveFlagScript();

  });

  }

}

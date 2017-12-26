import { FormGroup, FormControl, Validators } from '@angular/forms';
import { M030101SponsorsForm } from './../../forms/sponsors-form';
import { UtilsService } from './../../services/utils/utils.service';
import { LayoutService } from './../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { M030101SponsorsService } from '../../services/officers/m030101-sponsors.service';

@Component({
  selector: 'app-m030101-search-sponsors',
  templateUrl: './m030101-search-sponsors.component.html',
  styleUrls: ['./m030101-search-sponsors.component.css']
})
export class M030101SearchSponsorsComponent implements OnInit {
  criteriaForm:M030101SponsorsForm = new M030101SponsorsForm();
  criteriaFormGroup: FormGroup;

  dataTable: any[] = [];
  activeStatus = [];
  constructor(private layoutService: LayoutService,
              private utilsService: UtilsService,
              private sponsorsService: M030101SponsorsService) { }

  ngOnInit() {
    this.layoutService.setPageHeader('ค้นหาผู้ให้ทุนการศึกษา');
    this.activeStatus = this.utilsService.getActiveFlag('S');
    this.validatorForm();
  }

  validatorForm() {
    this.criteriaFormGroup = new FormGroup({
      sponsors_name: new FormControl(this.criteriaForm.search_criteria.sponsors_name),
      active_flag: new FormControl(this.criteriaForm.search_criteria.active_flag),
    })
  }

  onSearch(){
    console.log('onSearch..............');
    console.log(this.criteriaForm.search_criteria);
    this.sponsorsService.doSearch(this.criteriaForm).subscribe(data=>{
      this.dataTable = data;
    });

  }

}

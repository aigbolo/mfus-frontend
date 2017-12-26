import { FormGroup, FormControl, Validators } from '@angular/forms';
import { M030101SponsorsForm } from './../../forms/sponsors-form';
import { UtilsService } from './../../services/utils/utils.service';
import { LayoutService } from './../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-m030101-search-sponsors',
  templateUrl: './m030101-search-sponsors.component.html',
  styleUrls: ['./m030101-search-sponsors.component.css']
})
export class M030101SearchSponsorsComponent implements OnInit {
  criteriaForm:M030101SponsorsForm = new M030101SponsorsForm();\
  criteriaFormGroup: FormGroup;
  activeStatus = [];
  constructor(private layoutService: LayoutService,
              private utilsService: UtilsService,) { }

  ngOnInit() {
    this.layoutService.setPageHeader('ค้นหาผู้ให้ทุนการศึกษา');
    this.activeStatus = this.utilsService.getActiveFlag('S');
  }

  validatorForm() {
    this.criteriaFormGroup = new FormGroup({
      home_address: new FormControl(this.criteriaForm.search_criteria),
    })
  }

  onSearch(){
    console.log('onSearch..............');
    console.log(this.criteriaForm.search_criteria);


  }

}

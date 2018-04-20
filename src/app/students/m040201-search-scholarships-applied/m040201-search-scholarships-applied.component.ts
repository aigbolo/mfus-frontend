import { AuthenticationService } from './../../services/general/authentication.service';
import { AcUser } from './../../models/ac-user';
import { SelectItem } from 'primeng/primeng';
import { ReferenceService } from './../../services/general/reference.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from './../../services/utils/utils.service';
import { LayoutService } from './../../services/utils/layout.service';
import { SmScholarship } from './../../models/sm-scholarship';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApplyScholarshipForm } from '../../forms/apply-scholarship-form';
import { M040101ApplyScholarshipService } from '../../services/students/m040101-apply-scholarship.service';
import { ApApplication } from '../../models/ap-application';
import { M030102ScholarshipService } from '../../services/officers/m030102-scholarship.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-m040201-search-scholarships-applied',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m040201-search-scholarships-applied.component.html',
  styleUrls: ['./m040201-search-scholarships-applied.component.css']
})
export class M040201SearchScholarshipsAppliedComponent implements OnInit {
  renderPage = false;
  searchForm:ApplyScholarshipForm = new ApplyScholarshipForm;
  searchFormGroup: FormGroup;
  applySholarshipsList: any[] = [];
  application: ApApplication = new ApApplication;

  scholarshipList :SmScholarship[] = [];
  scholarship :SmScholarship = new SmScholarship;

  processStatusList:SelectItem[] = [];
  onLoad = false;

  user: AcUser =  this.authService.getUser();
  constructor(private layoutService: LayoutService,
    private utilsService: UtilsService,
    private activateRoute: ActivatedRoute,
    private scholarshipService: M030102ScholarshipService,
    private applyScholarshipService: M040101ApplyScholarshipService,
    private authService: AuthenticationService,
    private referenceService: ReferenceService) {

     }

  ngOnInit() {
    this.layoutService.setPageHeader('ตรวจสอบสถานะทุนการศึกษาที่สมัคร');


    this.referenceService.initialScholarships(null);
    if(JSON.stringify(this.activateRoute.snapshot.queryParams) != '{}'){
    this.searchForm.search_criteria = this.utilsService.castToObject(this.searchForm.search_criteria,this.activateRoute.snapshot.queryParams);
      if(this.searchForm.search_criteria.year != null
        || this.searchForm.search_criteria.application_code != null
        || this.searchForm.search_criteria.process_status != null
        || this.searchForm.search_criteria.scholarship_ref != null){
        this.doSearch();

        if(this.searchForm.search_criteria.scholarship_ref != null){
          let scholarship = new SmScholarship;
          scholarship.scholarship_ref = this.searchForm.search_criteria.scholarship_ref;
          this.scholarshipService.selectScholarship(scholarship).subscribe(
            data=>{
              this.scholarship = data;
            },err=>{
              console.log(err);
            }
          );
        }
      }
    }

    this.processStatusList = [
      {label: 'ไม่ระบุ',value:null},
      {label: 'เปิดรับสมัคร',value:'1'},
      {label: 'คัดเลือกผู้สัมภาษณ์',value:'2'},
      {label: 'คัดเลือกผู้ได้รับทุน',value:'3'},
      {label: 'ประกาศผล',value:'4'}
    ];
    if(!this.searchForm.search_criteria.year)
    this.searchForm.search_criteria.year = new Date().getFullYear();
    this.validatorForm();
    this.renderPage = true;
  }

  validatorForm() {
    this.searchFormGroup = new FormGroup({

      year: new FormControl(this.searchForm.search_criteria.year, Validators.compose([Validators.required])),
      application_code: new FormControl(this.searchForm.search_criteria.application_code),
      process_status: new FormControl(this.searchForm.search_criteria.process_status),
      scholarship_name: new FormControl(this.searchForm.search_criteria.scholarship_ref),


    });

  }

  onSearch(){
    this.utilsService.goToPageWithQueryParam('search-sholarships-applied',this.searchForm.search_criteria);
    this.doSearch();
  }

  doSearch(){
    if (this.searchFormGroup.invalid) {
      this.utilsService.findInvalidControls(this.searchFormGroup);
    }else{
      this.onLoad = true;
      this.searchForm.search_criteria.student_ref = this.user.account_ref;
      this.applyScholarshipService.doSearch(this.searchForm).subscribe(data=>{
        console.log(data);
        this.applySholarshipsList = data;
      },
      error =>{
        console.log(error);
      },
      ()=>{
        this.onLoad = false;
      });
    }


  }

  onRowSelect(event){
    this.utilsService.goToPage('manage-application/'+this.application.application_ref)
  }

  onReset(){

    this.searchForm = new ApplyScholarshipForm;
    this.searchForm.search_criteria.year = new Date().getFullYear();
    this.applySholarshipsList = [];
    this.scholarship = new SmScholarship;
    this.utilsService.goToPage('search-sholarships-applied');


  }

  autocompleteScholarships(event) {
    console.log("autocompleteSponsors");
    let query = event.query;
    let e = event.originalEvent;
    this.scholarshipList = [];

    if(e.type == 'input')
    this.searchForm.search_criteria.scholarship_ref = null;

    let objList: SmScholarship[];
    objList = this.referenceService.getScholarships();
    for (let obj of objList) {
      // Filter By string event
      if (
        obj.scholarship_name.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        this.scholarshipList.push(obj);
      }
    }
  }

  handleCompleteClickScholarships() {
    console.log("handleCompleteClickSponsors");

    setTimeout(() => {
      this.scholarshipList = this.referenceService.getScholarships();
    }, 100);
  }

  onSelectScholarship(){
    this.searchForm.search_criteria.scholarship_ref = this.scholarship.scholarship_ref;
  }

}

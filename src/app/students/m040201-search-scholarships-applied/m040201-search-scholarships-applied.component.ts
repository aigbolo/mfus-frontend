import { SelectItem } from 'primeng/primeng';
import { ReferenceService } from './../../services/general/reference.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from './../../services/utils/utils.service';
import { LayoutService } from './../../services/utils/layout.service';
import { SmScholarship } from './../../models/sm-scholarship';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApplyScholarshipForm } from '../../forms/apply-scholarship-form';
import { M040101ApplyScholarshipService } from '../../services/students/m040101-apply-scholarship.service';
import { ApApplication } from '../../models/ap-application';

@Component({
  selector: 'app-m040201-search-scholarships-applied',
  templateUrl: './m040201-search-scholarships-applied.component.html',
  styleUrls: ['./m040201-search-scholarships-applied.component.css']
})
export class M040201SearchScholarshipsAppliedComponent implements OnInit {

  searchForm:ApplyScholarshipForm = new ApplyScholarshipForm;
  searchFormGroup: FormGroup;
  applySholarshipsList: any[] = [];
  application: ApApplication = new ApApplication;

  scholarshipList :SmScholarship[] = [];
  scholarship :SmScholarship = new SmScholarship;

  processStatusList:SelectItem[] = [];
  onLoad = false;


  constructor(private layoutService: LayoutService,
    private utilsService: UtilsService,
    private activateRoute: ActivatedRoute,
    private applyScholarshipService: M040101ApplyScholarshipService,
    private referenceService: ReferenceService) { }

  ngOnInit() {
    this.layoutService.setPageHeader('ตรวจสอบสถานะทุนการศึกษา');
    this.searchForm.search_criteria.year = new Date().getFullYear();
    // this.validatorForm();

    this.processStatusList = [
      {label: 'ไม่ระบุ',value:null},
      {label: 'เปิดรับสมัคร',value:'1'},
      {label: 'คัดเลือกผู้สัมภาษณ์',value:'2'},
      {label: 'คัดเลือกผู้ได้รับทุน',value:'3'},
      {label: 'ประกาศผล',value:'4'}
    ];
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

      this.applyScholarshipService.doSearch(this.searchForm).subscribe(data=>{
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
    this.utilsService.goToPage('manage-scholarship-announcement/'+this.application.application_ref)
  }

  onReset(){
    this.searchForm = new ApplyScholarshipForm;
    this.applySholarshipsList = [];
    this.utilsService.goToPage('search-scholarship-announcement');
  }
  onPageInsert(){
    this.utilsService.goToPage('manage-scholarship-announcement');
  }





  autocompleteScholarships(event) {
    console.log("autocompleteSponsors");
    let query = event.query;
    this.scholarshipList = [];

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

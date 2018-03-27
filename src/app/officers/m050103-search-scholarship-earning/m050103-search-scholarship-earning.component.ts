import { ScholarshipEarningForm } from './../../forms/scholarship-earning-form';
import { M050103ScholarshipEarningService } from './../../services/officers/m050103-scholarship-earning.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgProgress } from 'ngx-progressbar';
import { M050101ScholarshipsScreeningService } from './../../services/officers/m050101-scholarships-screening.service';
import { ReferenceService } from './../../services/general/reference.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from './../../services/utils/utils.service';
import { LayoutService } from './../../services/utils/layout.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-m050103-search-scholarship-earning',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m050103-search-scholarship-earning.component.html',
  styleUrls: ['./m050103-search-scholarship-earning.component.css']
})
export class M050103SearchScholarshipEarningComponent implements OnInit {
  pageRender = false;
  searchForm:ScholarshipEarningForm = new ScholarshipEarningForm;
  searchFormGroup:FormGroup;
  scholarshipAnnouncementList: any[] = [];
  scholarshipAnnouncement: any;

  scholarshipEarningList: any[] = [];
  scholarshipEarning: any = null;
  onLoad:boolean = false;
  constructor(private layoutService: LayoutService,
    private utilsService: UtilsService,
    private activateRoute: ActivatedRoute,
    private referenceService: ReferenceService,
    private scholarshipEarningService: M050103ScholarshipEarningService,
    public ngProgress: NgProgress) { }

  ngOnInit() {
    this.layoutService.setPageHeader("บันทึกผู้ได้รับทุนการศึกษา");
    this.ngProgress.start();
    this.validatorForm();

    this.searchForm.search_criteria = this.utilsService.castToObject(this.searchForm.search_criteria,this.activateRoute.snapshot.queryParams);
    setTimeout(()=>{
    if(this.searchForm.search_criteria.year != null){
          this.referenceService.initialScholarshipAnnouncementForSearch(this.searchForm.search_criteria.year);
          if(this.searchForm.search_criteria.announcement_ref != null){
            setTimeout(
              ()=>{
                this.scholarshipAnnouncement = this.referenceService.getOneScholarshipAnnouncementForSearch(this.searchForm.search_criteria.announcement_ref);
            },1000);
          }
          setTimeout(
            ()=>{
              this.ngProgress.done();
              this.pageRender = true;
              this.doSearch();
          },1100);

        }else{
          this.ngProgress.done();
          this.pageRender = true;
          this.searchForm = new ScholarshipEarningForm;
          this.searchForm.search_criteria.year = new Date().getFullYear();
          this.referenceService.initialScholarshipAnnouncementForSearch(this.searchForm.search_criteria.year);
        }
      },1100);

  }


  validatorForm() {
    this.searchFormGroup = new FormGroup({
      year: new FormControl(this.searchForm.search_criteria.year, Validators.compose([Validators.required])),
      announcement_ref: new FormControl(this.searchForm.search_criteria.announcement_ref),
      });
  }

  onSearch(){
    localStorage.setItem('currentSearchParam', JSON.stringify(this.searchForm.search_criteria));
    this.utilsService.goToPageWithQueryParam('search-scholarship-earning',this.searchForm.search_criteria);
    this.doSearch();
  }

  doSearch(){

    if (this.searchFormGroup.invalid) {
      this.utilsService.findInvalidControls(this.searchFormGroup);
    }else{
      this.onLoad = true;
      console.log('search form', this.searchForm)
      this.scholarshipEarningService.doSearch(this.searchForm).subscribe(data=>{
        this.scholarshipEarningList = data;
        console.log('do search', this.scholarshipEarningList)
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
    this.utilsService.goToPage('manage-scholarship-earning/'+this.scholarshipEarning.announcement_ref);
  }

  onReset(){
    this.searchForm = new ScholarshipEarningForm;
    this.scholarshipEarningList = [];
    this.scholarshipEarning = null;

    this.scholarshipAnnouncementList = [];
    this.scholarshipAnnouncement = null;
    this.searchForm.search_criteria.year = null;

    this.utilsService.goToPage('search-scholarship-earning');
  }



  autocompleteScholarshipAnnouncement(event) {
    console.log("autocompleteScholarshipAnnouncement");
    let e = event.originalEvent;
    let query = event.query;
    this.scholarshipAnnouncementList = [];

    if(e.type == 'input'){
      this.searchForm.search_criteria.announcement_ref = null;
    }
    let objList = [];
    objList = this.referenceService.getScholarshipAnnouncementsForSearch();
    for (let obj of objList) {
      // Filter By string event
      if (
        obj.name.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        this.scholarshipAnnouncementList.push(obj);
      }
    }
  }

  handleCompleteClickScholarshipAnnouncement() {
    console.log("handleCompleteClickScholarshipAnnouncement");

    setTimeout(() => {
      this.scholarshipAnnouncementList = this.referenceService.getScholarshipAnnouncementsForSearch();
    }, 100);
  }

  onSelectScholarshipAnnouncement(){
    this.searchForm.search_criteria.announcement_ref = this.scholarshipAnnouncement.announcement_ref;
  }


}

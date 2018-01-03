import { ReferenceService } from './../../services/general/reference.service';
import { UtilsService } from './../../services/utils/utils.service';
import { Component, OnInit } from '@angular/core';
import { SmScholarship } from '../../models/sm-scholarship';
import { ScholarshipForm } from '../../forms/scholarship-form';
import { SmSponsors } from '../../models/sm-sponsors';
import { M030102ScholarshipService } from '../../services/officers/m030102-scholarship.service';

@Component({
  selector: 'app-s030102-search-scolarship',
  templateUrl: './s030102-search-scolarship.component.html',
  styleUrls: ['./s030102-search-scolarship.component.css']
})
export class S030102SearchScolarshipComponent implements OnInit {

  scholarshipFormList: any[]

  sponsorsList: SmSponsors[]
  searchForm: ScholarshipForm = new ScholarshipForm();
  selectedScholarship: SmScholarship
  activeFlag: any[]
  constructor(private utilsService: UtilsService,
              private referenceService: ReferenceService,
              private scholarshipService: M030102ScholarshipService) { }

  ngOnInit() {
    this.activeFlag = this.utilsService.getActiveFlag('S')
    this.referenceService.initialSponsors();
  }

  autocompleteSponsors(event){
    console.log("autocompleteSponsors");
    let query = event.query;
    this.sponsorsList = [];
    let objList: SmSponsors[];
    objList = this.referenceService.getSponsors();
    for (let obj of objList) {
      // Filter By string event
      if (obj.sponsors_name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.sponsorsList.push(obj);
      }
    }
  }

  handleCompleteClickSponsosrs(){
    setTimeout(() => {
      this.sponsorsList = this.referenceService.getSponsors();
    }, 100);
  }

  onRowSelect(event){
    console.log('onRowSelect')
    console.log(event.data)
    this.selectedScholarship = event.data;
    this.utilsService.goToPageWithParam('manage-scholarship/', this.selectedScholarship.scholarship_ref)
  }

  onSearchClick(){
    this.searchForm.searchCriteria.sponsors_ref = this.searchForm.smSponsors.sponsors_ref
    this.utilsService.goToPageWithQueryParam('search-scholarship',this.searchForm.searchCriteria);
    this.doSearch();
  }

  doSearch(){
    console.log('doSearch')
    this.scholarshipService.searchScholarship(this.searchForm).subscribe(res => {
      console.log(res)
      this.scholarshipFormList = res
    }, error => {
      console.log('error: ' + error)
    }, () => {
      console.log(this.scholarshipFormList)
      return this.scholarshipFormList
    });

  }

  onResetClick(){
    this.searchForm = new ScholarshipForm()
  }

  onInsertPage(){
    this.utilsService.goToPage('manage-scholarship')
  }
}

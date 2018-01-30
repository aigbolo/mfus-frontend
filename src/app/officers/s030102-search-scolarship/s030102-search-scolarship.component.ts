import { LayoutService } from './../../services/utils/layout.service';
import { RftScholarshipType } from "./../../models/rft-schoalrship_type";
import { ReferenceService } from "./../../services/general/reference.service";
import { UtilsService } from "./../../services/utils/utils.service";
import { Component, OnInit } from "@angular/core";
import { SmScholarship } from "../../models/sm-scholarship";
import { ScholarshipForm } from "../../forms/scholarship-form";
import { SmSponsors } from "../../models/sm-sponsors";
import { M030102ScholarshipService } from "../../services/officers/m030102-scholarship.service";

@Component({
  selector: "app-s030102-search-scolarship",
  templateUrl: "./s030102-search-scolarship.component.html",
  styleUrls: ["./s030102-search-scolarship.component.css"]
})
export class S030102SearchScolarshipComponent implements OnInit {

  scholarshipFormList: any[];

  sponsorsList: SmSponsors[];
  searchForm: ScholarshipForm = new ScholarshipForm();
  selectedScholarship: SmScholarship;
  activeFlag: any[];
  sctype_type: RftScholarshipType[] = [];
  defaultobj: RftScholarshipType = {
    sctype_ref: "",
    sctype_no: null,
    sctype_name: "ไม่ระบุ"
  };
  constructor(
    private utilsService: UtilsService,
    private referenceService: ReferenceService,
    private scholarshipService: M030102ScholarshipService,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.getScholarshipType();
    this.activeFlag = this.utilsService.getActiveFlag("S");
    this.referenceService.initialSponsors();
  }

  getScholarshipType() {
    this.referenceService.initialScholarshipType().subscribe(data => {
      data.unshift(this.defaultobj);
      this.sctype_type = data;
      console.log(this.sctype_type);
      return this.sctype_type;
    });
  }

  autocompleteSponsors(event) {
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

  handleCompleteClickSponsosrs() {
    setTimeout(() => {
      this.sponsorsList = this.referenceService.getSponsors();
    }, 100);
  }

  onRowSelect(event) {
    this.selectedScholarship = event.data;
    this.utilsService.goToPageWithParam(
      "manage-scholarship/",
      this.selectedScholarship.scholarship_ref
    );
  }

  onSearchClick() {
    if (this.searchForm.rftScholarshipType != undefined) {
      this.searchForm.searchCriteria.scholarship_type = this.searchForm.rftScholarshipType.sctype_ref;
    }
    this.searchForm.searchCriteria.sponsors_ref = this.searchForm.smSponsors.sponsors_ref;
    this.utilsService.goToPageWithQueryParam(
      "search-scholarship",
      this.searchForm.searchCriteria
    );
    this.doSearch();
  }

  doSearch() {
    this.scholarshipService.searchScholarship(this.searchForm).subscribe(
      res => {
        this.scholarshipFormList = res;
      },
      error => {
        console.log("error: " + error);
      },
      () => {
        console.log(this.scholarshipFormList);
        return this.scholarshipFormList;
      }
    );
  }

  onResetClick() {
    this.searchForm = new ScholarshipForm();
  }

  onInsertPage() {
    this.utilsService.goToPage("manage-scholarship");
  }
}

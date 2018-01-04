import { Severity } from "./../../enum";
import { NgProgress } from "ngx-progressbar";
import { M030101SponsorsService } from "./../../services/officers/m030101-sponsors.service";
import { M030102ScholarshipService } from "./../../services/officers/m030102-scholarship.service";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { UtilsService } from "./../../services/utils/utils.service";
import { ScholarshipForm } from "./../../forms/scholarship-form";
import { Component, OnInit } from "@angular/core";
import { SmSponsors } from "../../models/sm-sponsors";
import { ReferenceService } from "../../services/general/reference.service";
import { ActivatedRoute } from "@angular/router";
import { LayoutService } from "../../services/utils/layout.service";

@Component({
  selector: "app-m030102-manage-scholarship",
  templateUrl: "./m030102-manage-scholarship.component.html",
  styleUrls: ["./m030102-manage-scholarship.component.css"]
})
export class M030102ManageScholarshipComponent implements OnInit {
  user = localStorage.getItem("username");
  scholarshipFormGroup: FormGroup;
  pageRender: boolean = false;
  manageScholarship: ScholarshipForm = new ScholarshipForm();
  btnLabel: string;
  activeFlag: any[];
  sponsorsList: SmSponsors[];

  constructor(
    private utilsService: UtilsService,
    private referenceService: ReferenceService,
    private scholarshipService: M030102ScholarshipService,
    private route: ActivatedRoute,
    private layoutService: LayoutService,
    private sponsorsService: M030101SponsorsService,
    public ngProgress: NgProgress
  ) {}

  ngOnInit() {
    this.ngProgress.start();
    this.referenceService.initialSponsors();
    this.validateForm();
    this.activeFlag = this.utilsService.getActiveFlag("M");
    this.manageScholarship.smScholarship.scholarship_ref = this.route.snapshot.params[
      "id"
    ];
    if (this.manageScholarship.smScholarship.scholarship_ref != null) {
      this.btnLabel = "แก้ไขข้อมูล";
      this.layoutService.setPageHeader("แก้ไขข้อมูลทุนการศึกษา");
      this.onRowSelected();
    } else {
      this.layoutService.setPageHeader("บันทึกข้อมูลทุนการศึกษา");
      this.btnLabel = "บันทึก";
      this.pageRender = true;
      this.ngProgress.done();
    }
  }

  validateForm() {
    this.scholarshipFormGroup = new FormGroup({
      sponsor_name: new FormControl(
        this.manageScholarship.smSponsors.sponsors_name,
        Validators.compose([Validators.required])
      ),
      active_flag: new FormControl(
        (this.manageScholarship.smScholarship.active_flag = "Y")
      ),
      scholarship_name: new FormControl(
        this.manageScholarship.smScholarship.scholarship_name,
        Validators.compose([Validators.required])
      ),
      scholarship_type: new FormControl(
        (this.manageScholarship.smScholarship.scholarship_type = "1")
      ),
      detail: new FormControl(
        this.manageScholarship.smScholarship.detail,
        Validators.compose([Validators.required])
      ),
      unit: new FormControl(
        this.manageScholarship.smScholarship.unit,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ])
      ),
      financial_aid: new FormControl(
        this.manageScholarship.smScholarship.financial_aid,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ])
      )
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

  onRowSelected() {
    this.scholarshipService
      .selectScholarship(this.manageScholarship.smScholarship)
      .subscribe(
        res => {
          this.referenceService
            .getReferenceSponsor(res.sponsors_ref)
            .subscribe(res => {
              this.manageScholarship.smSponsors = res;
            });
          console.log(res);
          this.manageScholarship.smScholarship = res;
          this.manageScholarship.smScholarship.active_flag = res.active_flag;
        },
        error => {
          console.log(error);
        },
        () => {
          this.pageRender = true;
          this.ngProgress.done();
        }
      );
  }

  onSearchPage() {
    this.utilsService.goToPage("search-scholarship");
  }

  onSubmit() {
    if (this.btnLabel == "เพิ่มข้อมูล") {
      this.doInsert();
    } else {
      this.doUpdate();
    }
  }

  doInsert() {
    if (this.scholarshipFormGroup.invalid) {
      this.utilsService.findInvalidControls(this.scholarshipFormGroup);
      return;
    }
    this.manageScholarship.smScholarship.sponsors_ref = this.manageScholarship.smSponsors.sponsors_ref;
    this.scholarshipService
      .insertScholarship(this.manageScholarship, this.user)
      .subscribe(
        res => {
          this.layoutService.setMsgDisplay(
            Severity.SUCCESS,
            "บันทึกข้อมูลสำเร็จ",
            ""
          );
        },
        error => {
          console.log(error);
          this.layoutService.setMsgDisplay(
            Severity.ERROR,
            "เกิดข้อผิดพลาาด",
            ""
          );
        },
        () => {
          this.manageScholarship = new ScholarshipForm();
          this.validateForm();
        }
      );
  }

  doUpdate() {
    this.scholarshipService
      .updateScholarship(this.manageScholarship.smScholarship)
      .subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
          this.layoutService.setMsgDisplay(
            Severity.ERROR,
            "เกิดข้อผิดพลาาด",
            error
          );
        },
        () => {
          console.log("update success");
          this.utilsService.goToPage("search-scholarship");
          this.layoutService.setMsgDisplay(
            Severity.SUCCESS,
            "แก้ไขข้อมูลสำเร็จ",
            ""
          );
        }
      );
  }
}

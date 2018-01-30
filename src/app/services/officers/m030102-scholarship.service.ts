import { SmScholarship } from "./../../models/sm-scholarship";
import { Router } from "@angular/router";
import { LayoutService } from "./../utils/layout.service";
import { UtilsService } from "./../utils/utils.service";
import { ConfigurationService } from "./../utils/configuration.service";
import { Injectable } from "@angular/core";
import { ScholarshipForm } from "../../forms/scholarship-form";

@Injectable()
export class M030102ScholarshipService {
  constructor(
    private configurationService: ConfigurationService,
    private utilService: UtilsService,
    private layout: LayoutService,
    private router: Router
  ) {}

  searchScholarship(form: ScholarshipForm) {
    this.router.navigate(["/search-scholarship"], {
      queryParams: form.searchCriteria
    });
    return this.configurationService.requestMethodPOST(
      "scholarships",
      form.searchCriteria
    );
  }

  insertScholarship(form: ScholarshipForm, user: string) {
    console.log(form);
    form.smScholarship.create_user = user;
    form.smScholarship.update_user = user;
    return this.configurationService.requestMethodPOST(
      "scholarships-insert",
      form.smScholarship
    );
  }

  selectScholarship(ref: SmScholarship) {
    return this.configurationService.requestMethodPOST(
      "scholarships-update",
      ref
    );
  }

  updateScholarship(form: SmScholarship){
    return this.configurationService.requestMethodPUT('scholarships', form)
  }
  autoCompleteScholarship(){
    return this.configurationService.requestMethodGET('autocomplete-scholarships')
  }
}

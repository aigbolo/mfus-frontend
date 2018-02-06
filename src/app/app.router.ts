import { M050101ManageScholarshipsScreeningComponent } from './officers/m050101-manage-scholarships-screening/m050101-manage-scholarships-screening.component';
import { ManageStudentProfileComponent } from './general/account/manage-student-profile/manage-student-profile.component';
import { M040201SearchScholarshipsAppliedComponent } from './students/m040201-search-scholarships-applied/m040201-search-scholarships-applied.component';
import { ManageOfficerProfileComponent } from './general/account/manage-officer-profile/manage-officer-profile.component';
import { AddressComponent } from './students/m020103-manage-family-and-address/address/address.component';
import { M020103ManageFamilyAndAddressComponent } from './students/m020103-manage-family-and-address/m020103-manage-family-and-address.component';
import { M040102ManageScholarshipInfoComponent } from "./students/apply-scholarships/m040102-manage-scholarship-info/m040102-manage-scholarship-info.component";
import { ApplyScholarshipsComponent } from "./students/apply-scholarships/apply-scholarships.component";
import { RegisterComponent } from "./general/account/register/register.component";
import { S030102SearchScolarshipComponent } from "./officers/s030102-search-scolarship/s030102-search-scolarship.component";
import { M030103ManageSholarshipAnnouncementComponent } from "./officers/m030103-manage-sholarship-announcement/m030103-manage-sholarship-announcement.component";
import { M030101SearchSponsorsComponent } from "./officers/m030101-search-sponsors/m030101-search-sponsors.component";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { M040101ManageApplicantInfoComponent } from "./students/apply-scholarships/m040101-manage-applicant-info/m040101-manage-applicant-info.component";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./general/authentication/login/login.component";
import { ChangePasswordComponent } from "./general/authentication/change-password/change-password.component";
import { M010102ManageOfficerComponent } from "./general/account/M010102Manage-officer/m010102-manage-officer.component";
import { S010102SearchOfficerComponent } from "./general/account/s010102-search-officer/s010102-search-officer.component";
import { EnsureIsAuth } from "./services/general/ensure-is-auth.service";
import { EnsureIsNotAuth } from "./services/general/ensure-is-not-auth.service";
import { M030102ManageScholarshipComponent } from "./officers/m030102-manage-scholarship/m030102-manage-scholarship.component";
import { M030101ManageSponsorsComponent } from "./officers/m030101-manage-sponsors/m030101-manage-sponsors.component";
import { IndexComponent } from "./general/info/index/index.component";
import { ForgotPasswordComponent } from "./general/authentication/forgot-password/forgot-password.component";
import { M060101ManageNewsComponent } from "./officers/m060101-manage-news/m060101-manage-news.component";
import { S060101SearchNewsComponent } from "./officers/s060101-search-news/s060101-search-news.component";
import { M030103SearchScholarshipAnnouncementComponent } from "./officers/m030103-search-scholarship-announcement/m030103-search-scholarship-announcement.component";
import { FamilyComponent } from './students/m020103-manage-family-and-address/family/family.component';
import { SiblingComponent } from './students/m020103-manage-family-and-address/sibling/sibling.component';
import { M040103ManageFamilyFinancialComponent } from './students/apply-scholarships/m040103-manage-family-financial/m040103-manage-family-financial.component';
import { M040105ManageDocumentUploadComponent } from './students/apply-scholarships/m040105-manage-document-upload/m040105-manage-document-upload.component';
import { M040104ManageFamilyAndAddressComponent } from './students/apply-scholarships/m040104-manage-family-and-address/m040104-manage-family-and-address.component';
import { M050101SearchScholarshipsScreeningComponent } from './officers/m050101-search-scholarships-screening/m050101-search-scholarships-screening.component';
import { M050102SearchOfficerInterviewSelectingComponent } from './officers/m050102-search-officer-interview-selecting/m050102-search-officer-interview-selecting.component';
import { ViewStudentApplicationComponent } from './officers/view-student-application/view-student-application.component';
// import { M040201SearchScholarshipsAppliedComponent } from './students/m040201-search-scholarships-applied/m040201-search-scholarships-applied.component';

const appRoutes: Routes = [

  // General Paths
  { path: "", component: IndexComponent },
  { path: "register", component: RegisterComponent },

  // Authorization Paths
  { path: "forgot", component: ForgotPasswordComponent },
  { path: "login", component: LoginComponent, canActivate: [EnsureIsNotAuth] },
  {
    path: "change-password",
    component: ChangePasswordComponent,
    canActivate: [EnsureIsAuth]
  },

  // Officers Paths
  { path: "manage-officer", component: M010102ManageOfficerComponent, canActivate: [EnsureIsAuth] },
  { path: "search-officer", component: S010102SearchOfficerComponent, canActivate: [EnsureIsAuth] },
  { path: "manage-officer/:id", component: M010102ManageOfficerComponent, canActivate: [EnsureIsAuth] },
  { path: "manage-scholarship", component: M030102ManageScholarshipComponent },
  { path: "manage-scholarship/:id", component: M030102ManageScholarshipComponent },
  { path: "search-scholarship", component: S030102SearchScolarshipComponent },
  { path: "manage-officer-profile", component: ManageOfficerProfileComponent, canActivate: [EnsureIsAuth] },
  { path: "manage-sponsors", component: M030101ManageSponsorsComponent, canActivate: [EnsureIsAuth] },
  { path: "manage-sponsors/:id", component: M030101ManageSponsorsComponent, canActivate: [EnsureIsAuth] },
  { path: "search-sponsors", component: M030101SearchSponsorsComponent, canActivate: [EnsureIsAuth] },
  { path: "manage-scholarship-announcement", component: M030103ManageSholarshipAnnouncementComponent, canActivate: [EnsureIsAuth] },
  { path: "manage-scholarship-announcement/:id", component: M030103ManageSholarshipAnnouncementComponent, canActivate: [EnsureIsAuth] },
  { path: "manage-sponsors", component: M030101ManageSponsorsComponent, canActivate: [EnsureIsAuth] },
  { path: "manage-sponsors/:id", component: M030101ManageSponsorsComponent, canActivate: [EnsureIsAuth] },
  { path: "search-sponsors", component: M030101SearchSponsorsComponent, canActivate: [EnsureIsAuth] },
  { path: "manage-scholarship-announcement", component: M030103ManageSholarshipAnnouncementComponent, canActivate: [EnsureIsAuth] },
  { path: "manage-scholarship-announcement/:id", component: M030103ManageSholarshipAnnouncementComponent, canActivate: [EnsureIsAuth] },
  { path: "search-scholarship-announcement", component: M030103SearchScholarshipAnnouncementComponent, canActivate: [EnsureIsAuth] },
  { path: "search-scholarship-screening", component: M050101SearchScholarshipsScreeningComponent, canActivate: [EnsureIsAuth] },
  { path: "manage-scholarship-screening", component: M050101ManageScholarshipsScreeningComponent, canActivate: [EnsureIsAuth] },
  { path: "manage-scholarship-screening/:id", component: M050101ManageScholarshipsScreeningComponent, canActivate: [EnsureIsAuth] },
  { path: "manage-news", component: M060101ManageNewsComponent , canActivate: [EnsureIsAuth] },
  { path: "manage-news/:id", component: M060101ManageNewsComponent , canActivate: [EnsureIsAuth] },
  { path: "search-news", component: S060101SearchNewsComponent , canActivate: [EnsureIsAuth] },
  { path: "interview-selecting", component: M050102SearchOfficerInterviewSelectingComponent, canActivate: [EnsureIsAuth]},

  { path: "manage-news", component: M060101ManageNewsComponent , canActivate: [EnsureIsAuth]},
  { path: "manage-news/:id", component: M060101ManageNewsComponent , canActivate: [EnsureIsAuth]},
  { path: "search-news", component: S060101SearchNewsComponent , canActivate: [EnsureIsAuth]},
  { path: "search-interview-selecting", component: M050102SearchOfficerInterviewSelectingComponent, canActivate: [EnsureIsAuth]},




  { path: "application-view/:id", component: ViewStudentApplicationComponent , canActivate: [EnsureIsAuth]},
  // Students Paths
  {
    path: "manage-application", component: ApplyScholarshipsComponent, canActivate: [EnsureIsAuth], children: [
      {
        path: "manage-applicant-info",
        component: M040101ManageApplicantInfoComponent
      },
      {
        path: "manage-scholarship-info",
        component: M040102ManageScholarshipInfoComponent
      },
      {
        path: "manage-family-financial",
        component: M040103ManageFamilyFinancialComponent
      },
      {
        path: "view-family-and-address",
        component: M040104ManageFamilyAndAddressComponent
      },
      {
        path: "manage-document-upload",
        component: M040105ManageDocumentUploadComponent
      }
    ]
  },
  { path: "manage-application/:id", component: ApplyScholarshipsComponent, canActivate: [EnsureIsAuth] },
  { path: "manage-family-and-address", component: M020103ManageFamilyAndAddressComponent, canActivate: [EnsureIsAuth] },
  { path: "search-sholarships-applied", component: M040201SearchScholarshipsAppliedComponent , canActivate: [EnsureIsAuth] },
  { path: "manage-student-profile", component: ManageStudentProfileComponent , canActivate: [EnsureIsAuth] },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RoutersModule { }

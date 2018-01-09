import { M010101ManageStudentComponent } from './general/account/m010101-manage-student/m010101-manage-student.component';
import { S030102SearchScolarshipComponent } from './officers/s030102-search-scolarship/s030102-search-scolarship.component';
import { M030103ManageSholarshipAnnouncementComponent } from './officers/m030103-manage-sholarship-announcement/m030103-manage-sholarship-announcement.component';
import { M030101SearchSponsorsComponent } from './officers/m030101-search-sponsors/m030101-search-sponsors.component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { NgModule } from '@angular/core';
import { LoginComponent } from './general/authentication/login/login.component';
import { ChangePasswordComponent } from './general/authentication/change-password/change-password.component';
import { M010102ManageOfficerComponent } from './general/account/M010102Manage-officer/m010102-manage-officer.component';
import { S010102SearchOfficerComponent } from './general/account/s010102-search-officer/s010102-search-officer.component';
import { EnsureIsAuth } from './services/general/ensure-is-auth.service';
import { EnsureIsNotAuth } from './services/general/ensure-is-not-auth.service';
import { M030102ManageScholarshipComponent } from './officers/m030102-manage-scholarship/m030102-manage-scholarship.component';
import { M030101ManageSponsorsComponent } from './officers/m030101-manage-sponsors/m030101-manage-sponsors.component';
import { IndexComponent } from './general/info/index/index.component';
import { ForgotPasswordComponent } from './general/authentication/forgot-password/forgot-password.component';
import { M060101ManageNewsComponent } from './officers/m060101-manage-news/m060101-manage-news.component';
import { S060101SearchNewsComponent } from './officers/s060101-search-news/s060101-search-news.component';

const appRoutes: Routes = [
  { path: "", component: IndexComponent },
  { path: "forgot", component: ForgotPasswordComponent },
  { path: "login", component: LoginComponent, canActivate: [EnsureIsNotAuth] },
  { path: "change-password", component: ChangePasswordComponent, canActivate: [EnsureIsAuth] },
  { path: "manage-officer", component: M010102ManageOfficerComponent },
  { path: "search-officer", component: S010102SearchOfficerComponent },
  { path: "manage-officer/:id", component: M010102ManageOfficerComponent },
  { path: "manage-scholarship", component: M030102ManageScholarshipComponent },
  { path: "manage-scholarship/:id", component: M030102ManageScholarshipComponent },
  { path: "search-scholarship", component: S030102SearchScolarshipComponent },
  { path: "manage-student", component: M010101ManageStudentComponent },
  { path: "manage-sponsors", component: M030101ManageSponsorsComponent, canActivate: [] },
  { path: "manage-sponsors/:ref", component: M030101ManageSponsorsComponent, canActivate: [] },
  { path: "search-sponsors", component: M030101SearchSponsorsComponent, canActivate: [] },
  { path: "manage-scholarship-announcement", component: M030103ManageSholarshipAnnouncementComponent, canActivate: [] },
  { path: "manage-news", component: M060101ManageNewsComponent },
  { path: "manage-news/:id", component: M060101ManageNewsComponent },
  { path: "search-news", component: S060101SearchNewsComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class RoutersModule { }

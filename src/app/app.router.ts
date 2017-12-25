import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { NgModule } from '@angular/core';
import { LoginComponent } from './general/authentication/login/login.component';
import { ChangePasswordComponent } from './general/authentication/change-password/change-password.component';
import { ManageOfficerComponent } from './general/account/manage-officer/manage-officer.component';
import { SearchOfficerComponent } from './general/account/search-officer/search-officer.component';
import { M030101ManageSponsorComponent } from './officers/manage-scholarships/m030101-manage-sponsor/m030101-manage-sponsor.component';

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: ChangePasswordComponent },
  { path: "manage-officer", component: ManageOfficerComponent },
  { path: "search-officer", component: SearchOfficerComponent },
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class RoutersModule { }

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { NgModule } from '@angular/core';
import { LoginComponent } from './general/authentication/login/login.component';
import { ChangePasswordComponent } from './general/authentication/change-password/change-password.component';
import { M010102ManageOfficerComponent } from './general/account/M010102Manage-officer/m010102-manage-officer.component';
import { SearchOfficerComponent } from './general/account/search-officer/search-officer.component';
import { M030101ManageSponsorComponent } from './officers/manage-scholarships/m030101-manage-sponsor/m030101-manage-sponsor.component';
import { EnsureIsAuthService } from './services/general/ensure-is-auth.service';

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: ChangePasswordComponent },
  { path: "manage-officer", component: M010102ManageOfficerComponent },
  { path: "search-officer", component: SearchOfficerComponent },
    { path: "", component: LoginComponent, canDeactivate: [EnsureIsAuthService] },
    { path: "", component: LoginComponent },
    { path: "change-password", component: ChangePasswordComponent, canActivate: [EnsureIsAuthService] },
    { path: "manage-sponsors", component: M030101ManageSponsorComponent, canActivate: [EnsureIsAuthService] },
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class RoutersModule { }

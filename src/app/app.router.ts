import { M030101SearchSponsorsComponent } from './officers/m030101-search-sponsors/m030101-search-sponsors.component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { NgModule } from '@angular/core';
import { LoginComponent } from './general/authentication/login/login.component';
import { ChangePasswordComponent } from './general/authentication/change-password/change-password.component';
import { M030101ManageSponsorsComponent } from './officers/m030101-manage-sponsors/m030101-manage-sponsors.component';
import { EnsureIsAuth } from './services/general/ensure-is-auth.service';
import { EnsureIsNotAuth } from './services/general/ensure-is-not-auth.service';
import { IndexComponent } from './general/info/index/index.component';

const appRoutes: Routes = [
  { path: "", component: IndexComponent },
  { path: "login", component: LoginComponent, canActivate: [EnsureIsNotAuth] },
  { path: "change-password", component: ChangePasswordComponent, canActivate: [EnsureIsAuth] },
  { path: "manage-sponsors", component: M030101ManageSponsorsComponent, canActivate: [EnsureIsAuth] },
  { path: "search-sponsors", component: M030101SearchSponsorsComponent, canActivate: [EnsureIsAuth] },
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class RoutersModule { }

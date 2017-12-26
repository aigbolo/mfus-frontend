import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { NgModule } from '@angular/core';
import { LoginComponent } from './general/authentication/login/login.component';
import { ChangePasswordComponent } from './general/authentication/change-password/change-password.component';
import { M030101ManageSponsorComponent } from './officers/m030101-manage-sponsor/m030101-manage-sponsor.component';
import { EnsureIsAuth } from './services/general/ensure-is-auth.service';
import { EnsureIsNotAuth } from './services/general/ensure-is-not-auth.service';

const appRoutes: Routes = [
    { path: "login", component: LoginComponent, canActivate: [EnsureIsNotAuth] },
    { path: "change-password", component: ChangePasswordComponent, canActivate: [EnsureIsAuth] },
    { path: "manage-sponsors", component: M030101ManageSponsorComponent, canActivate: [EnsureIsAuth] },
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class RoutersModule { }

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { NgModule } from '@angular/core';
import { LoginComponent } from './general/authentication/login/login.component';
import { ChangePasswordComponent } from './general/authentication/change-password/change-password.component';
import { M030101ManageSponsorComponent } from './officers/m030101-manage-sponsor/m030101-manage-sponsor.component';
import { EnsureIsAuthService } from './services/general/ensure-is-auth.service';
import { M030101SearchSponsorsComponent } from './officers/m030101-search-sponsors/m030101-search-sponsors.component';

const appRoutes: Routes = [
    { path: "", component: LoginComponent },
    { path: "change-password", component: ChangePasswordComponent, canActivate: [EnsureIsAuthService] },
    { path: "manage-sponsors", component: M030101ManageSponsorComponent, canActivate: [EnsureIsAuthService] },
    { path: "search-sponsors", component: M030101SearchSponsorsComponent, canActivate: [EnsureIsAuthService] },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class RoutersModule { }

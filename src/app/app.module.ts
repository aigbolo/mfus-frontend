import { M010102OfficerService } from './services/officers/m010102-officer.service';
import { M030101SponsorsService } from './services/officers/m030101-sponsors.service';
import { S010102SearchOfficerComponent } from './general/account/s010102-search-officer/s010102-search-officer.component';

// @Angular
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutersModule } from './app.router';
import { NgProgressModule } from 'ngx-progressbar';
import { AuthInterceptor } from './auth.interceptor';

// PrimeNG
import {
        CheckboxModule,
        PanelMenuModule,
        DropdownModule,
        AutoCompleteModule,
        InputTextModule,
        ButtonModule,
        FileUploadModule,
        RadioButtonModule,
        DataTableModule,
        SharedModule} from 'primeng/primeng';

// Companent
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { PageHeaderComponent } from './layout/page-header/page-header.component';
import { M030101ManageSponsorsComponent } from './officers/m030101-manage-sponsors/m030101-manage-sponsors.component';
import { M030101SearchSponsorsComponent } from './officers/m030101-search-sponsors/m030101-search-sponsors.component';
import { M010102ManageOfficerComponent } from './general/account/M010102Manage-officer/m010102-manage-officer.component';
import { LoginComponent } from './general/authentication/login/login.component';
import { ChangePasswordComponent } from './general/authentication/change-password/change-password.component';
import { IndexComponent } from './general/info/index/index.component';

// Service
import { LayoutService } from './services/utils/layout.service';
import { AuthenticationService } from './services/general/authentication.service';
import { ConfigurationService } from './services/utils/configuration.service';
import { UtilsService } from './services/utils/utils.service';
import { EnsureIsAuth } from './services/general/ensure-is-auth.service';
import { ReferanceService } from './services/general/reference.service';
import { EnsureIsNotAuth } from './services/general/ensure-is-not-auth.service';
import { M030102ManageScholarshipComponent } from './officers/m030102-manage-scholarship/m030102-manage-scholarship.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    PageHeaderComponent,
    LoginComponent,
    ChangePasswordComponent,
    M010102ManageOfficerComponent,
    S010102SearchOfficerComponent,
    M030102ManageScholarshipComponent,
    M030101ManageSponsorsComponent,
    M030101SearchSponsorsComponent,
    M010102ManageOfficerComponent,
    S010102SearchOfficerComponent,
    IndexComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    RoutersModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgProgressModule,

    // Primeng
    PanelMenuModule,
    DropdownModule,
    AutoCompleteModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    DataTableModule,
    SharedModule,
    RadioButtonModule,
    CheckboxModule,
    FormsModule,
    DataTableModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ReferanceService,
    ConfigurationService,
    LayoutService,
    AuthenticationService,
    UtilsService,
    M010102OfficerService,
    // EnsureIsAuthService,
    EnsureIsAuth,
    EnsureIsNotAuth,
    M030101SponsorsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

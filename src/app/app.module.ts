

import { SearchOfficerComponent } from './general/account/search-officer/search-officer.component';


// @Angular
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutersModule } from './app.router';
import { NgProgressModule } from 'ngx-progressbar';

// PrimeNG
import {CheckboxModule, PanelMenuModule,  DropdownModule, AutoCompleteModule, InputTextModule,  ButtonModule,  FileUploadModule, RadioButtonModule} from 'primeng/primeng';

// Companent
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { PageHeaderComponent } from './layout/page-header/page-header.component';
import { ManageOfficerComponent } from './general/account/manage-officer/manage-officer.component';

// Service
import { LayoutService } from './services/utils/layout.service';
import { LoginComponent } from './general/authentication/login/login.component';
import { ChangePasswordComponent } from './general/authentication/change-password/change-password.component';
import { AuthenticationService } from './services/general/authentication.service';
import { ConfigurationService } from './services/utils/configuration.service';
import { UtilsService } from './services/utils/utils.service';
import { M030101ManageSponsorComponent } from './officers/manage-scholarships/m030101-manage-sponsor/m030101-manage-sponsor.component';


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
    M030101ManageSponsorComponent,
    ManageOfficerComponent,
    SearchOfficerComponent
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
    RadioButtonModule,
    CheckboxModule,
    FormsModule
  ],
  providers: [
    ConfigurationService,
    LayoutService,
    AuthenticationService,
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

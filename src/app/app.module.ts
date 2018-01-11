import { M030103ScholarshipAnnouncementService } from './services/officers/m030103-scholarship-announcement.service';
import { M010101StudentService } from './services/students/m010101-student.service';
import { M030102ScholarshipService } from './services/officers/m030102-scholarship.service';
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
import { CurrencyMaskModule } from "ng2-currency-mask";

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
  SharedModule,
  GrowlModule,
  CalendarModule,
  SliderModule,
  EditorModule,
} from 'primeng/primeng';

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
import { ReferenceService } from './services/general/reference.service';
import { EnsureIsNotAuth } from './services/general/ensure-is-not-auth.service';
import { M030102ManageScholarshipComponent } from './officers/m030102-manage-scholarship/m030102-manage-scholarship.component';
import { JqueryScriptService } from './services/utils/jquery-script.service';
import { ForgotPasswordComponent } from './general/authentication/forgot-password/forgot-password.component';
import { S030102SearchScolarshipComponent } from './officers/s030102-search-scolarship/s030102-search-scolarship.component';
import { M030103ManageSholarshipAnnouncementComponent } from './officers/m030103-manage-sholarship-announcement/m030103-manage-sholarship-announcement.component';
import { M010101ManageStudentComponent } from './general/account/m010101-manage-student/m010101-manage-student.component';
import { M060101ManageNewsComponent } from './officers/m060101-manage-news/m060101-manage-news.component';
import { S060101SearchNewsComponent } from './officers/s060101-search-news/s060101-search-news.component';
import { M060101NewsService } from './services/officers/m060101-news.service';
import { M030103SearchScholarshipAnnouncementComponent } from './officers/m030103-search-scholarship-announcement/m030103-search-scholarship-announcement.component';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  allowZero: true,
  decimal: ".",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ","
};

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
    IndexComponent,
    ForgotPasswordComponent,
    S030102SearchScolarshipComponent,
    M030103ManageSholarshipAnnouncementComponent,
    M010101ManageStudentComponent,
    M060101ManageNewsComponent,
    S060101SearchNewsComponent,
    M030103SearchScholarshipAnnouncementComponent,
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
    SharedModule,
    GrowlModule,
    CalendarModule,
    SliderModule,
    EditorModule,
    CurrencyMaskModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    ReferenceService,
    ConfigurationService,
    LayoutService,
    AuthenticationService,
    UtilsService,
    M010102OfficerService,
    // EnsureIsAuthService,
    EnsureIsAuth,
    EnsureIsNotAuth,
    M030101SponsorsService,
    JqueryScriptService,
    M030102ScholarshipService,
    M010101StudentService,
    M030103ScholarshipAnnouncementService,
    M060101NewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



import { M020103FamilyAndAddressService } from './services/students/m020103-family-and-address.service';
import {DataListModule} from 'primeng/primeng';
import { AddressService } from './services/utils/address.service';
import { M040101ApplyScholarshipService } from './services/students/m040101-apply-scholarship.service';
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
  StepsModule,
  DialogModule
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
import { M040101ManageApplicantInfoComponent } from './students/apply-scholarships/m040101-manage-applicant-info/m040101-manage-applicant-info.component';
import { ApplyScholarshipsComponent } from './students/apply-scholarships/apply-scholarships.component';
import { M040102ManageScholarshipInfoComponent } from './students/apply-scholarships/m040102-manage-scholarship-info/m040102-manage-scholarship-info.component';
import { M030103SearchScholarshipAnnouncementComponent } from './officers/m030103-search-scholarship-announcement/m030103-search-scholarship-announcement.component';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { M020103ManageFamilyAndAddressComponent } from './students/m020103-manage-family-and-address/m020103-manage-family-and-address.component';
import { FamilyComponent } from './students/m020103-manage-family-and-address/family/family.component';
import { SiblingComponent } from './students/m020103-manage-family-and-address/sibling/sibling.component';
import { AddressComponent } from './students/m020103-manage-family-and-address/address/address.component';
import { M040103ManageFamilyFinancialComponent } from './students/apply-scholarships/m040103-manage-family-financial/m040103-manage-family-financial.component';
import { M040105ManageDocumentUploadComponent } from './students/apply-scholarships/m040105-manage-document-upload/m040105-manage-document-upload.component';
import { M040201SearchScholarshipsAppliedComponent } from './students/m040201-search-scholarships-applied/m040201-search-scholarships-applied.component';

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
    M040101ManageApplicantInfoComponent,
    ApplyScholarshipsComponent,
    M040102ManageScholarshipInfoComponent,
    M040102ManageScholarshipInfoComponent,
    M030103SearchScholarshipAnnouncementComponent,
    M020103ManageFamilyAndAddressComponent,
    FamilyComponent,
    SiblingComponent,
    AddressComponent,
    M040103ManageFamilyFinancialComponent,
    M040105ManageDocumentUploadComponent,
    M040201SearchScholarshipsAppliedComponent,
  ],
  imports: [
    // Angular
    BrowserModule,
    RoutersModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgProgressModule,
    CurrencyMaskModule,

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
    StepsModule,
    CurrencyMaskModule,
    DataListModule,
    DialogModule

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
    AddressService,
    // EnsureIsAuthService,
    EnsureIsAuth,
    EnsureIsNotAuth,
    M030101SponsorsService,
    JqueryScriptService,
    M030102ScholarshipService,
    M010101StudentService,
    M030103ScholarshipAnnouncementService,
    M060101NewsService,
    M040101ApplyScholarshipService,
    M020103FamilyAndAddressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



import { UtilsService } from './services/utils/utils.service';
// @Angular
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutersModule } from './app.router';
import { NgProgressModule } from 'ngx-progressbar';
import { AuthInterceptor } from './auth.interceptor';

// PrimeNG
import { PanelMenuModule, DropdownModule, AutoCompleteModule, InputTextModule, ButtonModule, FileUploadModule,DataTableModule,SharedModule } from 'primeng/primeng';

// Companent
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { PageHeaderComponent } from './layout/page-header/page-header.component';
import { M030101ManageSponsorComponent } from './officers/m030101-manage-sponsor/m030101-manage-sponsor.component';
import { LoginComponent } from './general/authentication/login/login.component';
import { ChangePasswordComponent } from './general/authentication/change-password/change-password.component';

// Service
import { ConfigurationService } from './services/utils/configuration.service';
import { LayoutService } from './services/utils/layout.service';
import { AuthenticationService } from './services/general/authentication.service';
import { EnsureIsAuthService } from './services/general/ensure-is-auth.service';
import { ReferanceService } from './services/general/reference.service';
import { M030101SearchSponsorsComponent } from './officers/m030101-search-sponsors/m030101-search-sponsors.component';


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
    M030101SearchSponsorsComponent,
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
    EnsureIsAuthService,
    UtilsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

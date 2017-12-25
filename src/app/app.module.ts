

// @Angular
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutersModule } from './app.router';
import { NgProgressModule } from 'ngx-progressbar';

// PrimeNG
import { PanelMenuModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {MessageModule} from 'primeng/primeng';

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
import { ConfigurationService } from './services/utils/configuration.service';
import { SearchOfficerComponent } from './general/account/search-officer/search-officer.component';




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
    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    FormsModule

  ],
  providers: [
    ConfigurationService,
    LayoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

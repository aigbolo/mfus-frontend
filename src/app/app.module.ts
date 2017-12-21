;
import { 010102SearchOfficerComponent } from './general/account/010102-search-officer/010102-search-officer.component'import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { PageHeaderComponent } from './layout/page-header/page-header.component';
import { 010102ManageOfficerComponent } from './general/account/010102-manage-officer/010102-manage-officer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    PageHeaderComponent,
    010102ManageOfficerComponent, 010102SearchOfficerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

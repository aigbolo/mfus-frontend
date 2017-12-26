import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { LayoutService } from '../../services/utils/layout.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../../services/general/authentication.service';

@Component({
  selector: 'navbar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {

  displayName: any;
  status: any;
  private subscriptionDisplay: Subscription;
  private subscriptionStatus: Subscription;

  constructor(
    private layout: LayoutService,
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.subscriptionStatus = this.auth.getLoggedinStage().subscribe(status => { this.status = status })
    this.subscriptionDisplay = this.layout.getDisplayName().subscribe(name => { this.displayName = name })
  }

  onClickLogout(){
    this.auth.logout();
    this.router.navigateByUrl('/login')
  }

  ngOnDestroy() {
    this.subscriptionDisplay.unsubscribe();
    this.subscriptionStatus.unsubscribe();
  }

}

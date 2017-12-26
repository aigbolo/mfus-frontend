import { Component, OnDestroy } from '@angular/core';
import { ReferanceService } from './services/general/reference.service';
import { AuthenticationService } from './services/general/authentication.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  status: any;
  private subscription: Subscription;

  constructor(private authentication: AuthenticationService) {
    this.subscription = this.authentication.getLoggedinStage().subscribe(stage => { this.status = stage })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

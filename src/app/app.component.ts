import { Component, OnDestroy } from '@angular/core';
import { ReferenceService } from './services/general/reference.service';
import { AuthenticationService } from './services/general/authentication.service';
import { Subscription } from 'rxjs/Subscription';
import { LayoutService } from './services/utils/layout.service';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {

  status: any;
  msgs: any;
  private subscription: Subscription;
  private subscriptionMsg: Subscription;

  constructor(private authentication: AuthenticationService, private layout: LayoutService,private ngProgress: NgProgress) {
    this.subscription = this.authentication.getLoggedinStage().subscribe(stage => { this.status = stage })
    this.subscriptionMsg = this.layout.getMsgDisplay().subscribe(msg => { this.msgs = msg })
  }

  ngOnDestroy() {
    this.ngProgress.done();
    this.subscription.unsubscribe();
    this.subscriptionMsg.unsubscribe();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReferenceService } from './services/general/reference.service';
import { AuthenticationService } from './services/general/authentication.service';
import { Subscription } from 'rxjs/Subscription';
import { LayoutService } from './services/utils/layout.service';
import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from './services/utils/utils.service';
import { AcUser } from './models/ac-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit,OnDestroy {

  status: any;
  msgs: any;
  private user:AcUser; 
  private subscription: Subscription;
  private subscriptionMsg: Subscription;
  private tokenCheckClock:any;
  constructor(private authService: AuthenticationService, 
    private layout: LayoutService,
    private ngProgress: NgProgress,
    private utilsService: UtilsService) {
    this.subscription = this.authService.getLoggedinStage().subscribe(stage => { this.status = stage })
    this.subscriptionMsg = this.layout.getMsgDisplay().subscribe(msg => { this.msgs = msg })
  }
  ngOnInit() {
    const user = localStorage.getItem('user')

    if(user){
      this.authService.user = JSON.parse(localStorage.getItem('user'))
      this.onRecheckToken();
    }
 
    
  
  }

  ngOnDestroy() {
    this.ngProgress.done();
    this.subscription.unsubscribe();
    this.subscriptionMsg.unsubscribe();

  }

  onRecheckToken(){
    
    if(this.authService.user){
      
      this.authService.isTokenAliveCheck(this.authService.user).subscribe(
        data=>{
          if(data.alive == 'true'){
            // Do nothing.
          }else{
            this.authService.logout();
            this.utilsService.goToPage("/");
            clearInterval(this.tokenCheckClock);
          }
        }
      )
    }else{
      this.utilsService.goToPage("/");
      clearInterval(this.tokenCheckClock);
    }

  }

}

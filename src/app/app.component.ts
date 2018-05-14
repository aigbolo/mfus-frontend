import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReferenceService } from './services/general/reference.service';
import { AuthenticationService } from './services/general/authentication.service';
import { Subscription } from 'rxjs/Subscription';
import { LayoutService } from './services/utils/layout.service';
import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from './services/utils/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit,OnDestroy {

  status: any;
  msgs: any;
  private subscription: Subscription;
  private subscriptionMsg: Subscription;
  private tokenCheckClock:any;
  constructor(private authentication: AuthenticationService, 
    private layout: LayoutService,
    private ngProgress: NgProgress,
    private utilsService: UtilsService) {
    this.subscription = this.authentication.getLoggedinStage().subscribe(stage => { this.status = stage })
    this.subscriptionMsg = this.layout.getMsgDisplay().subscribe(msg => { this.msgs = msg })
  }
  ngOnInit() {
    this.onRecheckToken();
   
    this.tokenCheckClock = setInterval(()=>{
    this.onRecheckToken();
   },5000)
  
  }

  ngOnDestroy() {
    this.ngProgress.done();
    this.subscription.unsubscribe();
    this.subscriptionMsg.unsubscribe();

  }

  async onRecheckToken(){
    let user = localStorage.getItem('user')
    console.log('default user: ',user)
    if(user){
      
      this.authentication.isTokenAliveCheck(JSON.parse(user)).subscribe(
        data=>{
          console.log(data)
          if(data.alive == 'true'){
            // Do nothing.
          }else{
            this.authentication.logout();
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

import { EarnedHistoryService } from './../../services/students/m050202-earned-history.service';
import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../services/utils/utils.service';
import { DocumentsRequestedService } from '../../services/students/m040301-documents-requested.service';
import { AuthenticationService } from '../../services/general/authentication.service';
import { LayoutService } from '../../services/utils/layout.service';
import { AcUser } from '../../models/ac-user';

@Component({
  selector: 'app-m050202-search-earned-history',
  templateUrl: './m050202-search-earned-history.component.html',
  styleUrls: ['./m050202-search-earned-history.component.css']
})
export class M050202SearchEarnedHistoryComponent implements OnInit {
  earnedList: any[] = [];
  user: AcUser =  this.authService.getUser();
  constructor( private layoutService: LayoutService,
    private authService: AuthenticationService,
    private utilsService: UtilsService,
    public ngProgress: NgProgress,
    private earnedHistoryService:EarnedHistoryService
  ) { }

  ngOnInit() {
    this.layoutService.setPageHeader('ประวัติการได้รับทุนการศึกษา');
    this.earnedHistoryService.findEarnedHistory(this.user.account_ref).subscribe(
      data=>{
        console.log(data);
        this.earnedList = data;
      },
      err=>{
        console.log(err);
      }
    )
  }

  ngOnDestroy() {
    this.ngProgress.done();
  }
}

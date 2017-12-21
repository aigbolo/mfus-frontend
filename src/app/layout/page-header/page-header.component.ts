import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { LayoutService } from '../../services/utils/layout.service';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnDestroy {
  pageHeaderName: any;
  private subscription: Subscription;

  constructor(private layout: LayoutService) {
    this.subscription = this.layout.getHeader().subscribe(name => { this.pageHeaderName = name })
   }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/utils/layout.service';
import { M060101NewsService } from '../../../services/officers/m060101-news.service';
import { SmNews } from '../../../models/sm-news';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  newsList:SmNews[] = [];
  constructor(private layout: LayoutService,
  private newsService:M060101NewsService) {
    this.layout.clearPageHeader();
   }

  ngOnInit() {
this.displayNews();
  }

  displayNews(){
    this.newsService.displayNews().subscribe(
      res=>{
        console.log(res);
        this.newsList = [...this.newsList,...res.data]
      }
    )
  }

}

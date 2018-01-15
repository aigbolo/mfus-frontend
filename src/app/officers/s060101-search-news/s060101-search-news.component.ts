import { LayoutService } from './../../services/utils/layout.service';
import { M060101NewsService } from './../../services/officers/m060101-news.service';
import { UtilsService } from "./../../services/utils/utils.service";
import { Component, OnInit } from "@angular/core";
import { CalendarModel } from "../../models/calendar-model";
import { NewsForm } from '../../forms/news-form';
import { SmNews } from '../../models/sm-news';

@Component({
  selector: "app-s060101-search-news",
  templateUrl: "./s060101-search-news.component.html",
  styleUrls: ["./s060101-search-news.component.css"]
})
export class S060101SearchNewsComponent extends CalendarModel
  implements OnInit {

  selectNews: SmNews
  searchForm: NewsForm = new NewsForm();
  activeFlag: any[] = [];
  newsFormList: SmNews[];

  constructor(private utilsService: UtilsService,
              private newsService: M060101NewsService,
              private layoutService: LayoutService) {
    super();
  }

  ngOnInit() {
    this.layoutService.setPageHeader("ค้นหาข้อมูลข่าวสาร");
    this.activeFlag = this.utilsService.getActiveFlag("S");
  }

  onSearchClick() {
    this.utilsService.goToPageWithQueryParam(
      "search-news",
      this.searchForm.searchCriteria
    );
    this.newsService.searchNews(this.searchForm).subscribe(res=>{
      console.log(res)
      this.newsFormList = res
    })
  }

  onResetClick() {
    this.searchForm = new NewsForm
    this.newsFormList = []
  }

  onInsertPage() {
    this.utilsService.goToPage('manage-news')
  }

  onRowSelect(event){
    console.log(event.data)
    this.selectNews = event.data
    this.utilsService.goToPageWithParam('manage-news/', this.selectNews.news_ref)
  }
}

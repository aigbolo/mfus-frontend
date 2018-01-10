import { Injectable } from '@angular/core';
import { NewsForm } from '../../forms/news-form';
import { Router } from '@angular/router';
import { ConfigurationService } from '../utils/configuration.service';
import { SmNews } from '../../models/sm-news';

@Injectable()
export class M060101NewsService {

  constructor(
    private router: Router,
    private configurationService: ConfigurationService
  ) { }

  searchNews(form: NewsForm){
    this.router.navigate(["/search-news"], {
      queryParams: form.searchCriteria
    });
    console.log(form.searchCriteria)
    return this.configurationService.requestMethodPOST(
      "news",
      form.searchCriteria
    );
  }

  selectedNew(ref: SmNews) {
    return this.configurationService.requestMethodPOST('news-update', ref)
  }

  insertNews(form: SmNews){
    return this.configurationService.requestMethodPOST('news-insert', form)
  }

  updateNews(form: SmNews){
    return this.configurationService.requestMethodPUT('news', form)
  }
}

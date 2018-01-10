import { SmNews } from '../models/sm-news';

export class NewsForm{
  public smNews: SmNews
  public searchCriteria: SearchCriteria
  constructor(){
    this.smNews = new SmNews
    this.searchCriteria = new SearchCriteria
  }
}

class SearchCriteria{
  news_topic: string = ''
  publish_start_date: Date = null
  publish_end_date: Date = null
  active_flag: string = ''
}

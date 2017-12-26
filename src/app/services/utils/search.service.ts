import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
@Injectable()
class SearchService {
  apiRoot: string = '';
  results: any;

  constructor(private jsonp: Jsonp) {
    this.results = [];
  }

  search(term: string) {
    return new Promise((resolve, reject) => {
      this.results = [];
      let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK`;
      this.jsonp.request(apiURL)
          .toPromise()
          .then(
              res => { // Success
                this.results = res.json().results.map(item => {
                  // return new SearchItem(
                  //     item.trackName,
                  //     item.artistName,
                  //     item.trackViewUrl,
                  //     item.artworkUrl30,
                  //     item.artistId
                  // );
                });
                resolve();
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
  }
}

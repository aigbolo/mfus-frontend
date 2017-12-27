import { Injectable } from '@angular/core';
import { URL } from '../../enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigurationService {

  private url = URL

  constructor(private http: HttpClient) { }

  requestMethodGET(path: string): Observable<any> {
    return this.http.get(this.url + path);
  }

  requestMethodPOST(path: string, param: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
    const body = JSON.stringify(param);
    return this.http.post(this.url + path, body, { responseType: 'json', headers: headers })
  }

  requestMethodPUT(path: string, param: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
    const body = JSON.stringify(param);
    console.log(body)
    return this.http.put(this.url + path, body, { responseType: 'json', headers: headers })
  }


  requestMethodPOSTWithHeader(path: string, param: any, headers: HttpHeaders): Observable<any> {
    const body = JSON.stringify(param);
    return this.http.post(this.url + path, body, { headers: headers })
  }
}

import { Injectable } from '@angular/core';
import { URL } from '../../enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConfigurationService {

  private url = URL

  constructor(private http: HttpClient) { }

  requestMethodGET(path: string) {
    return this.http.get(this.url + path);
  }

  requestMethodPOST(path: string, param: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    const body = JSON.stringify(param);
    return this.http.post(this.url + path, body, { responseType: 'json', headers: headers })
  }
}

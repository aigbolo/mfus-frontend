import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LayoutService {

  private pageHeaderSubject = new BehaviorSubject<string>('');

  constructor() { }

  // Set Page Header Name
  setPageHeader(name: string) {
    this.pageHeaderSubject.next(name);
  }

  clearPageHeader() {
    this.pageHeaderSubject.next('');
  }

  getHeader(): Observable<any> {
    return this.pageHeaderSubject.asObservable();
  }
  // End
}
